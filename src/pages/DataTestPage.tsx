import { useState, useEffect } from 'react';
import { DataCollector } from '../components/DataCollector';
import { getCollectedData } from '../services/dataService';

export function DataTestPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { getCollectedData(10).then(setItems).finally(()=>setLoading(false)); }, []);
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📊 Data Collection Test</h1>
      <DataCollector dataType="test_submission" />
      <div className="mt-6">
        <h2 className="font-semibold">Recent ({items.length})</h2>
        {loading ? <p>Loading...</p> : items.length===0 ? <p className="text-gray-500">No data yet.</p> : (
          <ul className="space-y-2 mt-2">{items.map(i=>(<li key={i.id} className="p-2 border rounded text-sm"><pre>{JSON.stringify(i.payload,null,2)}</pre></li>))}</ul>
        )}
      </div>
    </div>
  );
}
