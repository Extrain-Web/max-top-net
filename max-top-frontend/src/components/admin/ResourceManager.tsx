"use client";

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Loader2, ImageIcon } from 'lucide-react';
import { apiGet, apiSend, imgUrl } from '@/lib/api';
import type { ResourceConfig } from './schemas';
import { FieldList } from './FieldRenderer';

export default function ResourceManager({ config }: { config: ResourceConfig }) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const data = await apiGet<any[]>(`${config.endpoint}?all=1`);
      setItems(data);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [config.endpoint]);

  const openNew = () => { setErr(''); setEditing({ ...JSON.parse(JSON.stringify(config.defaultItem)), __new: true }); };
  const openEdit = (item: any) => { setErr(''); setEditing(JSON.parse(JSON.stringify(item))); };

  const set = (name: string, v: any) => setEditing((p: any) => ({ ...p, [name]: v }));

  const save = async () => {
    setSaving(true);
    setErr('');
    try {
      const body = { ...editing };
      const isNew = body.__new;
      delete body.__new;
      if (isNew) {
        delete body._id;
        await apiSend(config.endpoint, 'POST', body);
      } else {
        await apiSend(`${config.endpoint}/${body._id}`, 'PUT', body);
      }
      setEditing(null);
      await load();
    } catch (e: any) {
      setErr(e.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (item: any) => {
    if (!confirm(`"${item[config.titleKey] || 'this item'}" — delete?`)) return;
    await apiSend(`${config.endpoint}/${item._id}`, 'DELETE');
    await load();
  };

  return (
    <div>
      <div className="res-head">
        <div>
          <h2>{config.title}</h2>
          <p style={{ color: '#64788f', fontSize: '0.9rem' }}>{items.length} items</p>
        </div>
        <button className="btn btn-primary" onClick={openNew} style={{ padding: '11px 22px' }}>
          <Plus size={18} /> New {config.singular}
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#64788f' }}><Loader2 className="spin" /> Loading...</div>
      ) : (
        <div className="res-list">
          {items.map((item) => (
            <div className="res-item" key={item._id}>
              {config.imageKey && (
                item[config.imageKey] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="thumb" src={imgUrl(item[config.imageKey])} alt="" />
                ) : (
                  <div className="thumb" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}><ImageIcon size={22} /></div>
                )
              )}
              <div className="info">
                <h4>{item[config.titleKey] || '(untitled)'} {item.active === false && <span className="badge-off">Hidden</span>}</h4>
                {config.subKey && <p>{String(item[config.subKey] ?? '')}</p>}
              </div>
              <div className="res-actions">
                <button className="icon-btn edit" onClick={() => openEdit(item)}><Pencil size={16} /></button>
                <button className="icon-btn del" onClick={() => remove(item)}><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
          {!items.length && <p style={{ color: '#64788f', textAlign: 'center', padding: '2rem' }}>No items yet. Add a new one.</p>}
        </div>
      )}

      {editing && (
        <div className="admin-modal-backdrop" onClick={() => !saving && setEditing(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-head">
              <h3>{editing.__new ? `New ${config.singular}` : `${config.singular} — Edit`}</h3>
              <button className="icon-btn" onClick={() => setEditing(null)} style={{ background: '#f1f5f9' }}><X size={18} /></button>
            </div>
            <div className="admin-modal-body">
              {err && <div className="admin-alert err">{err}</div>}
              <FieldList fields={config.fields} data={editing} set={set} />
            </div>
            <div className="admin-modal-foot">
              <button className="btn btn-ghost" onClick={() => setEditing(null)} style={{ padding: '10px 20px' }}>Cancel</button>
              <button className="btn btn-primary" onClick={save} disabled={saving} style={{ padding: '10px 24px' }}>
                {saving ? <><Loader2 size={16} className="spin" /> Saving...</> : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
      <style>{`.spin{animation:spinSlow 1s linear infinite}`}</style>
    </div>
  );
}
