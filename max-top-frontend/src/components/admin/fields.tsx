"use client";

import { useRef, useState } from 'react';
import { Upload, Plus, Trash2, Loader2, ImageIcon } from 'lucide-react';
import { uploadImage, imgUrl } from '@/lib/api';

export function Text({ label, value, onChange, placeholder, type = 'text', required }: any) {
  return (
    <div>
      <label className="label">{label}</label>
      <input className="field" type={type} value={value ?? ''} placeholder={placeholder} required={required} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

export function Area({ label, value, onChange, placeholder }: any) {
  return (
    <div>
      <label className="label">{label}</label>
      <textarea className="field" value={value ?? ''} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

export function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div>
      <label className="label">{label}</label>
      <select className="field" value={value ?? ''} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

export function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', padding: '6px 0' }}>
      <span
        onClick={() => onChange(!value)}
        style={{ width: 46, height: 26, borderRadius: 20, background: value ? 'var(--primary)' : '#cbd5e1', position: 'relative', transition: 'all 0.2s', flexShrink: 0 }}
      >
        <span style={{ position: 'absolute', top: 3, left: value ? 23 : 3, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'all 0.2s' }} />
      </span>
      <span className="label" style={{ marginBottom: 0 }}>{label}</span>
    </label>
  );
}

export function ColorInput({ label, value, onChange }: any) {
  return (
    <div>
      <label className="label">{label}</label>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <input type="color" value={value || '#8bbe1f'} onChange={(e) => onChange(e.target.value)} style={{ width: 48, height: 44, border: '1px solid var(--border)', borderRadius: 8, cursor: 'pointer', background: '#fff' }} />
        <input className="field" value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
      </div>
    </div>
  );
}

export function ImageInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const pick = async (file?: File) => {
    if (!file) return;
    setBusy(true);
    setErr('');
    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch (e: any) {
      setErr(e.message || 'Upload failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <label className="label">{label}</label>
      <div className="img-input">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imgUrl(value)} alt="preview" className="img-preview" />
        ) : (
          <div className="img-preview"><ImageIcon size={26} /></div>
        )}
        <div style={{ flex: 1, display: 'grid', gap: 8 }}>
          <input ref={ref} type="file" accept="image/*" hidden onChange={(e) => pick(e.target.files?.[0])} />
          <button type="button" className="upload-btn" onClick={() => ref.current?.click()} disabled={busy}>
            {busy ? <Loader2 size={16} className="spin" /> : <Upload size={16} />} {busy ? 'Uploading...' : 'Upload Image'}
          </button>
          <input className="field" placeholder="Or paste image URL" value={value ?? ''} onChange={(e) => onChange(e.target.value)} style={{ fontSize: '0.85rem' }} />
          {err && <span style={{ color: 'var(--danger)', fontSize: '0.8rem' }}>{err}</span>}
        </div>
      </div>
      <style>{`.spin{animation:spinSlow 1s linear infinite}`}</style>
    </div>
  );
}

/** Editor for a list of plain strings (e.g. package features, about points). */
export function StringArray({ label, value, onChange, placeholder }: { label: string; value: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  const list = value || [];
  const set = (i: number, v: string) => onChange(list.map((x, idx) => (idx === i ? v : x)));
  const add = () => onChange([...list, '']);
  const del = (i: number) => onChange(list.filter((_, idx) => idx !== i));
  return (
    <div>
      <label className="label">{label}</label>
      {list.map((item, i) => (
        <div className="array-item" key={i}>
          <input className="field" value={item} placeholder={placeholder} onChange={(e) => set(i, e.target.value)} />
          <button type="button" className="icon-btn del" onClick={() => del(i)}><Trash2 size={16} /></button>
        </div>
      ))}
      <button type="button" className="upload-btn" onClick={add}><Plus size={16} /> Add</button>
    </div>
  );
}

/** Editor for a list of objects with defined sub-fields (e.g. socials, quick links). */
export function ObjectArray({
  label, value, onChange, fields,
}: {
  label: string;
  value: any[];
  onChange: (v: any[]) => void;
  fields: { name: string; placeholder: string }[];
}) {
  const list = value || [];
  const set = (i: number, key: string, v: string) => onChange(list.map((x, idx) => (idx === i ? { ...x, [key]: v } : x)));
  const add = () => onChange([...list, Object.fromEntries(fields.map((f) => [f.name, '']))]);
  const del = (i: number) => onChange(list.filter((_, idx) => idx !== i));
  return (
    <div>
      <label className="label">{label}</label>
      {list.map((item, i) => (
        <div className="array-item" key={i}>
          {fields.map((f) => (
            <input key={f.name} className="field" placeholder={f.placeholder} value={item[f.name] ?? ''} onChange={(e) => set(i, f.name, e.target.value)} />
          ))}
          <button type="button" className="icon-btn del" onClick={() => del(i)}><Trash2 size={16} /></button>
        </div>
      ))}
      <button type="button" className="upload-btn" onClick={add}><Plus size={16} /> Add</button>
    </div>
  );
}
