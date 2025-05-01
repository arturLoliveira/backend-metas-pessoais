import { Pool } from "pg";


export const pool = new Pool({
  user: "postgres",         // seu usuário do PostgreSQL
  host: "localhost",        // ou 127.0.0.1
  database: "goals",     // nome do banco criado
  password: "postgres",    // senha que você definiu
  port: 5432,               // porta padrão
});

