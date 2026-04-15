import { db } from '../firebase';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp, Timestamp } from 'firebase/firestore';

export interface CollectedData {
  id?: string;
  type: string;
  payload: any;
  timestamp?: Timestamp;
  metadata?: Record<string, any>;
}

export const collectData = async ( Omit<CollectedData, 'id' | 'timestamp'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'collected_data'), { ...data, timestamp: serverTimestamp() });
    console.log('✅ Data collected:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Collection error:', error);
    throw error;
  }
};

export const getCollectedData = async (limit: number = 50): Promise<CollectedData[]> => {
  try {
    const q = query(collection(db, 'collected_data'), orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as CollectedData[];
  } catch (error) {
    console.error('❌ Fetch error:', error);
    throw error;
  }
};
