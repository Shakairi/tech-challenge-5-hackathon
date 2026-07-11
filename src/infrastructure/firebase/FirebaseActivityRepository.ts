import {
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  query,
  where,
  Timestamp,
} from 'firebase/firestore'
import { db } from '../config/firebase'
import { Activity } from '../../domain/entities/Activity'
import { IActivityRepository } from '../../domain/repositories/IActivityRepository'

// Firestore armazena datas como Timestamp — convertemos de/para Date
function toActivity(id: string, data: Record<string, unknown>): Activity {
  return {
    ...(data as Omit<Activity, 'id' | 'scheduledAt'>),
    id,
    scheduledAt: (data.scheduledAt as Timestamp).toDate(),
  }
}

export class FirebaseActivityRepository implements IActivityRepository {
  private col = 'activities'

  async findByUserId(userId: string): Promise<Activity[]> {
    const q    = query(collection(db, this.col), where('userId', '==', userId))
    const snap = await getDocs(q)
    return snap.docs.map(d => toActivity(d.id, d.data() as Record<string, unknown>))
  }

  async create(activity: Omit<Activity, 'id'>): Promise<Activity> {
    const ref = await addDoc(collection(db, this.col), {
      ...activity,
      scheduledAt: Timestamp.fromDate(new Date(activity.scheduledAt)),
    })
    return { ...activity, id: ref.id }
  }

  async updateStatus(id: string, status: Activity['status']): Promise<void> {
    const ref = doc(db, this.col, id)
    await updateDoc(ref, { status })
  }
}
