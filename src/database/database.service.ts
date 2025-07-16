import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService {
  private readonly pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'nest',
      password: 'mypost2',
      port: 5433,
    });
  }

  async query(text: string, params?: any[]) {
    const client = await this.pool.connect();
    try {
      await client.query(`SET client_encoding TO 'LATIN9'`);
      const res = await client.query(text, params);
      return res.rows;
    } finally {
      client.release();
    }
  }
}
