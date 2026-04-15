import { useState, FormEvent } from 'react';
import { collectData } from '../services/dataService';

export function DataCollector({ dataType, placeholder = 'Type to collect...', buttonText = 'Submit' }: {
  dataType: string; placeholder?: string; buttonText?: string;
}) {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    setLoading(true); setStatus('idle');
    try {
      await collectData({ type: dataType, payload: { content: value.trim() }, metadata: { path: window.location.pathname } });
      setValue(''); setStatus('success');
    } catch { setStatus('error'); }
    finally { setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
      <input value={value} onChange={(e)=>setValue(e.target.value)} placeholder={placeholder} disabled={loading} className="flex-1 px-3 py-2 border rounded" />
      <button type="submit" disabled={loading||!value.trim()} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">{loading ? 'Sending...' : buttonText}</button>
    </form>
    {status==='success' && <p className="text-green-600 mt-2">✅ Collected!</p>}
    {status==='error' && <p className="text-red-600 mt-2">❌ Failed. Check console.</p>}
  );
}
