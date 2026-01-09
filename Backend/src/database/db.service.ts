import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Pool, PoolClient } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;

  async onModuleInit() {
    try {
      // Railway provides DATABASE_URL, use it if available
      if (process.env.DATABASE_URL) {
        console.log('Connecting to database using DATABASE_URL...');
        this.pool = new Pool({
          connectionString: process.env.DATABASE_URL,
          max: 20,
          idleTimeoutMillis: 30000,
          connectionTimeoutMillis: 10000,
          ssl: {
            rejectUnauthorized: false, // Required for Railway PostgreSQL
          },
        });
      } else {
        // Fallback to individual env variables for local development
        console.log('Connecting to database using individual env variables...');
        this.pool = new Pool({
          host: process.env.DB_HOST || 'localhost',
          port: parseInt(process.env.DB_PORT || '5432'),
          database: process.env.DB_NAME || 'payroll_db',
          user: process.env.DB_USER || 'postgres',
          password: process.env.DB_PASSWORD || 'postgres',
          max: 20,
          idleTimeoutMillis: 30000,
          connectionTimeoutMillis: 10000,
        });
      }

      // Test the connection
      const client = await this.pool.connect();
      console.log('Database connection successful!');
      client.release();
    } catch (error) {
      console.error('Database connection failed:', error.message);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.pool.end();
  }

  async query(text: string, params?: any[]) {
    const start = Date.now();
    const result = await this.pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: result.rowCount });
    return result;
  }

  async getClient(): Promise<PoolClient> {
    return this.pool.connect();
  }
}
