import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createGoalRoute } from './routes/create-goals'
import { createCompletionRoute } from './routes/create-completions'
import { getPendingGoalsRoute } from './routes/get-pending-goals'
import { getWeekSummaryRoute } from './routes/get-week-summary'
import { deleteGoalRoute } from './routes/delete-goal'
import fastifyCors from '@fastify/cors'

import { pool }  from "..//db/db"

async function testarConexao() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Conectado com sucesso:", res.rows[0]);
  } catch (err) {
    console.error("Erro ao conectar:", err);
  }
}

testarConexao();

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createGoalRoute)
app.register(createCompletionRoute)
app.register(getPendingGoalsRoute)
app.register(getWeekSummaryRoute)
app.register(deleteGoalRoute)



app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server running!')
  })
