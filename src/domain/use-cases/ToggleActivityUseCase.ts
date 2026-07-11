import { Activity } from '../entities/Activity'
import { IActivityRepository } from '../repositories/IActivityRepository'

export class ToggleActivityUseCase {
  constructor(private readonly activityRepo: IActivityRepository) {}

  async execute(activityId: string, currentStatus: Activity['status']): Promise<void> {
    const next = currentStatus === 'done' ? 'pending' : 'done'
    await this.activityRepo.updateStatus(activityId, next)
  }
}
