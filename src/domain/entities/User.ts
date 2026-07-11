export interface User {
  id: string
  name: string
  email: string
  preferences: UserPreferences
}

export interface UserPreferences {
  fontSize: 'small' | 'medium' | 'large'
  contrast: 'default' | 'high' | 'maximum'
  navigationMode: 'simplified' | 'advanced'
  spacing: 'compact' | 'normal' | 'wide'
  extraConfirmation: boolean
  visualFeedback: boolean
  smoothAnimations: boolean
  remindersEnabled: boolean
}
