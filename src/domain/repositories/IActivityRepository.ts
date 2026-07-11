import { Activity } from '../entities/Activity'

export interface IActivityRepository {
  findByUserId(userId: string): Promise<Activity[]>
  create(activity: Omit<Activity, 'id'>): Promise<Activity>
  updateStatus(id: string, status: Activity['status']): Promise<void>
}
