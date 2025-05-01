import dayjs from 'dayjs'
import { client, db } from '.'
import { sql } from 'drizzle-orm'
import { goalCompletions, goals } from './schema'

async function seed() {
  // Apenas como segurança: garante que as tabelas existam (caso não use migrações ainda)
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS goals (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      desired_weekly_frequency INTEGER NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS goal_completions (
      id TEXT PRIMARY KEY,
      goal_id TEXT NOT NULL REFERENCES goals(id) ON DELETE CASCADE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `)

  // Limpa os dados anteriores
  await db.delete(goalCompletions)
  await db.delete(goals)

  // Cria metas
  const result = await db
    .insert(goals)
    .values([
      { title: 'Acordar cedo', desiredWeeklyFrequency: 5 },
      { title: 'Exercitar', desiredWeeklyFrequency: 3 },
      { title: 'Meditar', desiredWeeklyFrequency: 1 },
    ])
    .returning()

  const startOfWeek = dayjs().startOf('week')

  // Cria registros de conclusão
  await db.insert(goalCompletions).values([
    {
      goalId: result[0].id,
      createdAt: startOfWeek.toDate(),
    },
    {
      goalId: result[1].id,
      createdAt: startOfWeek.add(1, 'day').toDate(),
    },
  ])
}

seed().finally(() => {
  client.end()
})
