import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { deleteGoal } from '../../functions/delete-goal'

export const deleteGoalRoute: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/delete/goals/:id',
    {
      schema: {
        params: z.object({
          id: z.string().min(10), // cuid tem pelo menos 10 caracteres
        }),
      },
    },
    async request => {
      const { id } = request.params

      await deleteGoal({ id })
    }
  )
}
