import { db } from '../db'
import { goals } from '../db/schema'
import { eq } from 'drizzle-orm'

interface DeleteGoalRequest {
  id: string
}

export async function deleteGoal({ id }: DeleteGoalRequest) {
  const result = await db
    .delete(goals)
    .where(eq(goals.id, id))
    .returning()

  const deleted = result[0]

  return {
    deleted,
  }
}
