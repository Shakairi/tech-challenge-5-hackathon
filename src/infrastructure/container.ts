import { IUserRepository }     from '../domain/repositories/IUserRepository'
import { IActivityRepository } from '../domain/repositories/IActivityRepository'

// Alterne aqui para trocar a implementação sem mexer em mais nada
const USE_FIREBASE = process.env.NEXT_PUBLIC_USE_FIREBASE === 'true'

function makeUserRepository(): IUserRepository {
  if (USE_FIREBASE) {
    const { FirebaseUserRepository } = require('./firebase/FirebaseUserRepository')
    return new FirebaseUserRepository()
  }
  const { LocalStorageUserRepository } = require('./storage/LocalStorageUserRepository')
  return new LocalStorageUserRepository()
}

function makeActivityRepository(): IActivityRepository {
  if (USE_FIREBASE) {
    const { FirebaseActivityRepository } = require('./firebase/FirebaseActivityRepository')
    return new FirebaseActivityRepository()
  }
  const { LocalStorageActivityRepository } = require('./storage/LocalStorageActivityRepository')
  return new LocalStorageActivityRepository()
}

export const userRepository:     IUserRepository     = makeUserRepository()
export const activityRepository: IActivityRepository = makeActivityRepository()
