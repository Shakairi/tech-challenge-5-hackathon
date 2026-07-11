import { User, UserPreferences } from '../../domain/entities/User'
import { IUserRepository } from '../../domain/repositories/IUserRepository'

const DEFAULT_PREFS: UserPreferences = {
  fontSize: 'medium',
  contrast: 'default',
  navigationMode: 'simplified',
  spacing: 'normal',
  extraConfirmation: true,
  visualFeedback: true,
  smoothAnimations: false,
  remindersEnabled: true,
}

export class LocalStorageUserRepository implements IUserRepository {
  private readonly key = 'seniorease:user'

  async findById(id: string): Promise<User | null> {
    if (typeof window === 'undefined') return null
    const raw = localStorage.getItem(this.key)
    if (!raw) return { id, name: 'Maria José', email: 'mariajose@email.com', preferences: DEFAULT_PREFS }
    return JSON.parse(raw)
  }

  async savePreferences(userId: string, prefs: UserPreferences): Promise<void> {
    const user = await this.findById(userId)
    if (!user) return
    localStorage.setItem(this.key, JSON.stringify({ ...user, preferences: prefs }))
  }
}
