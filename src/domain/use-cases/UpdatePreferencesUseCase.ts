import { UserPreferences } from '../entities/User'
import { IUserRepository } from '../repositories/IUserRepository'

export class UpdatePreferencesUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(userId: string, prefs: Partial<UserPreferences>): Promise<void> {
    const user = await this.userRepo.findById(userId)
    if (!user) throw new Error('Usuário não encontrado')
    const updated: UserPreferences = { ...user.preferences, ...prefs }
    await this.userRepo.savePreferences(userId, updated)
  }
}
