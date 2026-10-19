"use client";

import { useEffect, useState } from 'react';
import { Loader2, Save } from 'lucide-react';
import { apiGet, apiSend } from '@/lib/api';
import { PAGE_SLUGS, PAGE_FIELDS } from './schemas';
import { FieldList } from './FieldRenderer';

export default function PagesEditor() {
  const [slug, setSlug] = useState(PAGE_SLUGS[0].slug);
  const [data, setData] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  useEffect(() => {
    setData(null);
    apiGet(`/pages/${slug}`).then(setData).catch(() => setData({}));
  }, [slug]);

  const set = (name: string, v: any) => setData((p: any) => ({ ...p, [name]: v }));

  const save = async () => {
    setSaving(true); setMsg(null);
    try {
      const updated = await apiSend(`/pages/${slug}`, 'PUT', data);
      setData(updated);
      setMsg({ type: 'ok', text: 'Saved!' });
      setTimeout(() => setMsg(null), 2500);
    } catch (e: any) {
      setMsg({ type: 'err', text: e.message || 'Failed' });
    } finally { setSaving(false); }
  };

  return (
    <div>
      <div className="res-head">
        <h2>Page Content</h2>
        <button className="btn btn-primary" onClick={save} disabled={saving || !data} style={{ padding: '11px 24px' }}>
          {saving ? <><Loader2 size={16} className="spin" /> Saving...</> : <><Save size={16} /> Save</>}
        </button>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '1.4rem' }}>
        {PAGE_SLUGS.map((p) => (
          <button key={p.slug} onClick={() => setSlug(p.slug)} className="pill" style={{ cursor: 'pointer', border: 'none', padding: '8px 16px', background: slug === p.slug ? 'var(--primary)' : '#fff', color: slug === p.slug ? '#fff' : 'var(--ink)', boxShadow: '0 2px 8px rgba(15,27,45,0.06)' }}>
            {p.name}
          </button>
        ))}
      </div>

      {msg && <div className={`admin-alert ${msg.type === 'ok' ? 'ok' : 'err'}`}>{msg.text}</div>}

      {data ? (
        <div style={{ background: '#fff', borderRadius: 16, padding: '1.8rem', display: 'grid', gap: '1.1rem', boxShadow: '0 4px 16px rgba(15,27,45,0.06)' }}>
          <FieldList fields={PAGE_FIELDS} data={data} set={set} />
        </div>
      ) : (
        <div style={{ padding: '3rem', textAlign: 'center', color: '#64788f' }}><Loader2 className="spin" /> Loading...</div>
      )}
      <style>{`.spin{animation:spinSlow 1s linear infinite}`}</style>
    </div>
  );
}
