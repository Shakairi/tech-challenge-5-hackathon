import {
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore'
import { db } from '../config/firebase'
import { User, UserPreferences } from '../../domain/entities/User'
import { IUserRepository } from '../../domain/repositories/IUserRepository'

const DEFAULT_PREFS: UserPreferences = {
  fontSize:          'medium',
  contrast:          'default',
  navigationMode:    'simplified',
  spacing:           'normal',
  extraConfirmation: true,
  visualFeedback:    true,
  smoothAnimations:  false,
  remindersEnabled:  true,
}

export class FirebaseUserRepository implements IUserRepository {
  private col = 'users'

  async findById(id: string): Promise<User | null> {
    const ref  = doc(db, this.col, id)
    const snap = await getDoc(ref)

    if (!snap.exists()) {
      // Cria o documento com dados padrão na primeira vez
      const newUser: User = {
        id,
        name:        'Maria Silva',
        email:       'maria@seniorease.com',
        preferences: DEFAULT_PREFS,
      }
      await setDoc(ref, newUser)
      return newUser
    }

    return snap.data() as User
  }

  async savePreferences(userId: string, prefs: UserPreferences): Promise<void> {
    const ref = doc(db, this.col, userId)
    await setDoc(ref, { preferences: prefs }, { merge: true })
  }
}
