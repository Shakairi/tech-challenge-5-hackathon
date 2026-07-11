import { Activity } from '../../domain/entities/Activity'
import { IActivityRepository } from '../../domain/repositories/IActivityRepository'

const SEED: Activity[] = [
  { id: '1', userId: 'u1', title: 'Consulta médica', scheduledAt: new Date(), status: 'pending' },
  { id: '2', userId: 'u1', title: 'Tomar remédio', scheduledAt: new Date(), status: 'pending' },
  { id: '3', userId: 'u1', title: 'Exercício físico', scheduledAt: new Date(), status: 'done' },
  { id: '4', userId: 'u1', title: 'Enviar documento', scheduledAt: new Date(), status: 'overdue' },
]

export class LocalStorageActivityRepository implements IActivityRepository {
  private readonly key = 'seniorease:activities'

  private load(): Activity[] {
    if (typeof window === 'undefined') return SEED
    const raw = localStorage.getItem(this.key)
    return raw ? JSON.parse(raw) : SEED
  }

  private save(items: Activity[]): void {
    localStorage.setItem(this.key, JSON.stringify(items))
  }

  async findByUserId(userId: string): Promise<Activity[]> {
    return this.load().filter((a) => a.userId === userId)
  }

  async create(activity: Omit<Activity, 'id'>): Promise<Activity> {
    const items = this.load()
    const newItem: Activity = { ...activity, id: crypto.randomUUID() }
    this.save([...items, newItem])
    return newItem
  }

  async updateStatus(id: string, status: Activity['status']): Promise<void> {
    const items = this.load().map((a) => (a.id === id ? { ...a, status } : a))
    this.save(items)
  }
}
