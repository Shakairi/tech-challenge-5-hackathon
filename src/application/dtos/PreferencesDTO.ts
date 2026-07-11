import { UserPreferences } from '../../domain/entities/User'

export type FontSize = UserPreferences['fontSize']
export type Contrast = UserPreferences['contrast']
export type NavigationMode = UserPreferences['navigationMode']

export interface UpdatePreferencesDTO {
  fontSize?: FontSize
  contrast?: Contrast
  navigationMode?: NavigationMode
  spacing?: UserPreferences['spacing']
  extraConfirmation?: boolean
  visualFeedback?: boolean
  smoothAnimations?: boolean
  remindersEnabled?: boolean
}
