import { Activity } from '../entities/Activity'
import { IActivityRepository } from '../repositories/IActivityRepository'

export class GetActivitiesUseCase {
  constructor(private readonly activityRepo: IActivityRepository) {}

  async execute(userId: string): Promise<Activity[]> {
    return this.activityRepo.findByUserId(userId)
  }
}
