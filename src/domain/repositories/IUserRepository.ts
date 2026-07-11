import { User, UserPreferences } from '../entities/User'

export interface IUserRepository {
  findById(id: string): Promise<User | null>
  savePreferences(userId: string, prefs: UserPreferences): Promise<void>
}
