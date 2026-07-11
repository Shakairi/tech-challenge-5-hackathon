'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { UserPreferences } from '../../domain/entities/User'
import { userRepository } from '../../infrastructure/container'
import { UpdatePreferencesUseCase } from '../../domain/use-cases/UpdatePreferencesUseCase'

const USER_ID = 'u1'
const updatePrefsUC = new UpdatePreferencesUseCase(userRepository)

interface PreferencesContextValue {
  prefs: UserPreferences
  update: (partial: Partial<UserPreferences>) => Promise<void>
}

const PreferencesContext = createContext<PreferencesContextValue | null>(null)

const DEFAULTS: UserPreferences = {
  fontSize:          'medium',
  contrast:          'default',
  navigationMode:    'simplified',
  spacing:           'normal',
  extraConfirmation: true,
  visualFeedback:    true,
  smoothAnimations:  false,
  remindersEnabled:  true,
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<UserPreferences>(DEFAULTS)

  useEffect(() => {
    userRepository.findById(USER_ID).then(u => {
      if (u) setPrefs(u.preferences)
    })
  }, [])

  const update = async (partial: Partial<UserPreferences>) => {
    const next = { ...prefs, ...partial }
    setPrefs(next)
    await updatePrefsUC.execute(USER_ID, partial)
  }

  return (
    <PreferencesContext.Provider value={{ prefs, update }}>
      {children}
    </PreferencesContext.Provider>
  )
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext)
  if (!ctx) throw new Error('usePreferences must be used inside PreferencesProvider')
  return ctx
}
