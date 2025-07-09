module.exports = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'teddy_user',
    password: process.env.DB_PASSWORD || 'teddy_password',
    database: process.env.DB_NAME || 'teddy_finance',
    entities: ['src/domain/entities/*.entity.ts'],
    migrations: ['src/infrastructure/database/migrations/*.ts'],
    cli: {
      migrationsDir: 'src/infrastructure/database/migrations',
    },
  };