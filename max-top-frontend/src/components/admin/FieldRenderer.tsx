"use client";

import { Text, Area, Select, Toggle, ColorInput, ImageInput, StringArray, ObjectArray } from './fields';
import type { FieldDef } from './schemas';

export function renderField(f: FieldDef, value: any, onChange: (v: any) => void) {
  switch (f.type) {
    case 'textarea':
      return <Area label={f.label} value={value} onChange={onChange} placeholder={f.placeholder} />;
    case 'number':
      return <Text label={f.label} type="number" value={value} onChange={(v: string) => onChange(v === '' ? '' : Number(v))} />;
    case 'toggle':
      return <Toggle label={f.label} value={!!value} onChange={onChange} />;
    case 'image':
      return <ImageInput label={f.label} value={value} onChange={onChange} />;
    case 'select':
      return <Select label={f.label} value={value} onChange={onChange} options={f.options || []} />;
    case 'color':
      return <ColorInput label={f.label} value={value} onChange={onChange} />;
    case 'stringArray':
      return <StringArray label={f.label} value={value} onChange={onChange} placeholder={f.placeholder} />;
    case 'objectArray':
      return <ObjectArray label={f.label} value={value} onChange={onChange} fields={f.itemFields || []} />;
    default:
      return <Text label={f.label} value={value} onChange={onChange} placeholder={f.placeholder} />;
  }
}

/** Render a list of fields, grouping consecutive half-width ones into rows. */
export function FieldList({ fields, data, set }: { fields: FieldDef[]; data: any; set: (name: string, v: any) => void }) {
  const out: React.ReactNode[] = [];
  for (let i = 0; i < fields.length; i++) {
    const f = fields[i];
    const next = fields[i + 1];
    if (f.half && next && next.half) {
      out.push(
        <div className="form-row" key={f.name}>
          {renderField(f, data[f.name], (v) => set(f.name, v))}
          {renderField(next, data[next.name], (v) => set(next.name, v))}
        </div>
      );
      i++;
    } else {
      out.push(<div key={f.name}>{renderField(f, data[f.name], (v) => set(f.name, v))}</div>);
    }
  }
  return <>{out}</>;
}
