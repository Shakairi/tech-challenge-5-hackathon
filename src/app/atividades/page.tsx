'use client'
import { useState } from 'react'
import { useActivities } from '../../presentation/hooks/useActivities'
import { ActivityItem } from '../../presentation/components/atividades/ActivityItem'
import { FeedbackBanner } from '../../presentation/components/ui/FeedbackBanner'
import { Activity } from '../../domain/entities/Activity'

export default function AtividadesPage() {
  const { activities, toggle } = useActivities('u1')
  const [showFeedback, setShowFeedback] = useState(false)

  const handleToggle = async (id: string, status: Activity['status']) => {
    await toggle(id, status)
    if (status !== 'done') setShowFeedback(true)
  }

  return (
    <div className="px-4 py-8">
      <h1 className="text-2xl font-medium text-gray-900 mb-1">Minhas atividades</h1>
      <p className="text-base text-gray-500 mb-6">Veja e organize suas tarefas do dia.</p>
      <FeedbackBanner
        message="Muito bem! Atividade concluída."
        show={showFeedback}
        onHide={() => setShowFeedback(false)}
      />
      <ul className="flex flex-col gap-3" aria-label="Lista de atividades">
        {activities.map((a) => (
          <ActivityItem key={a.id} activity={a} onToggle={handleToggle} />
        ))}
      </ul>
    </div>
  )
}
