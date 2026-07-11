export type ActivityStatus = 'pending' | 'done' | 'overdue'

export interface Activity {
  id: string
  userId: string
  title: string
  scheduledAt: Date
  status: ActivityStatus
  steps?: ActivityStep[]
}

export interface ActivityStep {
  order: number
  description: string
  isDone: boolean
}
