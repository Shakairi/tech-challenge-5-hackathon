'use client'
import { Activity } from '../../../domain/entities/Activity'

interface ActivityItemProps {
  activity: Activity
  onToggle: (id: string, status: Activity['status']) => void
}

const BADGE_STYLES: Record<Activity['status'], { label: string; cls: string }> = {
  done: { label: 'Feito', cls: 'bg-green-100 text-green-800' },
  pending: { label: 'Hoje', cls: 'bg-blue-100 text-blue-800' },
  overdue: { label: 'Atrasado', cls: 'bg-red-100 text-red-800' },
}

export function ActivityItem({ activity, onToggle }: ActivityItemProps) {
  const badge = BADGE_STYLES[activity.status]
  const isDone = activity.status === 'done'

  return (
    <li
      className={`flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 cursor-pointer hover:border-gray-300 transition-colors ${
        isDone ? 'opacity-60' : ''
      }`}
      onClick={() => onToggle(activity.id, activity.status)}
      role="checkbox"
      aria-checked={isDone}
      aria-label={`${activity.title} — ${badge.label}`}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onToggle(activity.id, activity.status)}
    >
      <div
        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
          isDone ? 'bg-green-500 border-green-500' : 'border-gray-300'
        }`}
        aria-hidden="true"
      >
        {isDone && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <path d="m5 12 5 5L20 7" />
          </svg>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-base font-medium text-gray-800 truncate">{activity.title}</p>
        <p className="text-sm text-gray-500 mt-0.5">
          {new Date(activity.scheduledAt).toLocaleString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit',
          })}
        </p>
      </div>
      <span className={`text-xs font-medium px-2.5 py-1 rounded-lg shrink-0 ${badge.cls}`}>
        {badge.label}
      </span>
    </li>
  )
}
