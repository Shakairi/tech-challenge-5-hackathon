import { useCallback, useEffect, useState } from 'react'
import { Activity } from '../../domain/entities/Activity'
import { activityRepository } from '../../infrastructure/container'
import { GetActivitiesUseCase } from '../../domain/use-cases/GetActivitiesUseCase'
import { ToggleActivityUseCase } from '../../domain/use-cases/ToggleActivityUseCase'

const getActivitiesUC = new GetActivitiesUseCase(activityRepository)
const toggleActivityUC = new ToggleActivityUseCase(activityRepository)

export function useActivities(userId: string) {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    const data = await getActivitiesUC.execute(userId)
    setActivities(data)
    setLoading(false)
  }, [userId])

  useEffect(() => { load() }, [load])

  const toggle = async (id: string, current: Activity['status']) => {
    await toggleActivityUC.execute(id, current)
    await load()
  }

  return { activities, loading, toggle, reload: load }
}
