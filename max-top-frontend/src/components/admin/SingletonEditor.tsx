"use client";

import { useEffect, useState } from 'react';
import { Loader2, Save } from 'lucide-react';
import { apiGet, apiSend } from '@/lib/api';
import type { FieldDef } from './schemas';
import { FieldList } from './FieldRenderer';

export default function SingletonEditor({
  title, endpoint, fields, method = 'PUT',
}: {
  title: string;
  endpoint: string;
  fields: FieldDef[];
  method?: 'PUT';
}) {
  const [data, setData] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  useEffect(() => {
    apiGet(endpoint).then(setData).catch(() => setData({}));
  }, [endpoint]);

  const set = (name: string, v: any) => setData((p: any) => ({ ...p, [name]: v }));

  const save = async () => {
    setSaving(true);
    setMsg(null);
    try {
      const updated = await apiSend(endpoint, method, data);
      setData(updated);
      setMsg({ type: 'ok', text: 'Saved successfully!' });
      setTimeout(() => setMsg(null), 2500);
    } catch (e: any) {
      setMsg({ type: 'err', text: e.message || 'Save failed' });
    } finally {
      setSaving(false);
    }
  };

  if (!data) return <div style={{ padding: '3rem', textAlign: 'center', color: '#64788f' }}><Loader2 className="spin" /> Loading...</div>;

  return (
    <div>
      <div className="res-head">
        <h2>{title}</h2>
        <button className="btn btn-primary" onClick={save} disabled={saving} style={{ padding: '11px 24px' }}>
          {saving ? <><Loader2 size={16} className="spin" /> Saving...</> : <><Save size={16} /> Save</>}
        </button>
      </div>
      {msg && <div className={`admin-alert ${msg.type === 'ok' ? 'ok' : 'err'}`}>{msg.text}</div>}
      <div style={{ background: '#fff', borderRadius: 16, padding: '1.8rem', display: 'grid', gap: '1.1rem', boxShadow: '0 4px 16px rgba(15,27,45,0.06)' }}>
        <FieldList fields={fields} data={data} set={set} />
      </div>
      <style>{`.spin{animation:spinSlow 1s linear infinite}`}</style>
    </div>
  );
}
