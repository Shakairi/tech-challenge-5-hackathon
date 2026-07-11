'use client'
import { usePreferences } from '../../contexts/PreferencesContext'
import { Toggle } from '../ui/Toggle'

export function SafetyCard() {
  const { prefs, update } = usePreferences()

  return (
    <section className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
      <h2 className="text-base font-medium text-gray-800 mb-2">Segurança e feedback</h2>
      <Toggle
        label="Confirmar antes de ações importantes"
        checked={prefs.extraConfirmation}
        onChange={(v) => update({ extraConfirmation: v })}
      />
      <Toggle
        label="Feedback visual reforçado"
        checked={prefs.visualFeedback}
        onChange={(v) => update({ visualFeedback: v })}
      />
      <Toggle
        label="Animações suaves"
        checked={prefs.smoothAnimations}
        onChange={(v) => update({ smoothAnimations: v })}
      />
    </section>
  )
}
