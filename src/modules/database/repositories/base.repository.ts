import { DatabaseService } from '@/modules/database/database.service';
import { DatabaseTables } from '@/modules/database/database.enums';
export interface Model {
  id: number;
}

export abstract class BaseRepository<T extends Model> {
  constructor(
    protected readonly db: DatabaseService,
    private readonly table: DatabaseTables,
  ) {}

  async create(data: Omit<T, 'id' | 'createdAt'>): Promise<T> {
    const keys = Object.keys(data) as (keyof T)[];
    const cols = keys.map((k) => `"${String(k)}"`).join(', ');
    const values = keys.map((_, i) => `$${i + 1}`).join(', ');
    const args = keys.map((k) => (data as unknown)[k]);

    const sql = `INSERT INTO ${this.table} (${cols}) VALUES (${values}) RETURNING *`;
    return (await this.db.query<T>(sql, args)).rows[0];
  }

  async findById(id: number): Promise<T | null> {
    const { rows } = await this.db.query<T>(
      `SELECT * FROM ${this.table} WHERE id = $1`,
      [id],
    );
    return rows[0] ?? null;
  }

  async findAll(where: Partial<T> = {}): Promise<T[]> {
    const keys = Object.keys(where) as (keyof T)[];
    if (keys.length === 0)
      return (await this.db.query<T>(`SELECT * FROM ${this.table}`)).rows;

    const clauses = keys
      .map((k, i) => `"${String(k)}" = $${i + 1}`)
      .join(' AND ');
    const args = keys.map((k) => (where as unknown)[k]);

    const sql = `SELECT * FROM ${this.table} WHERE ${clauses}`;
    return (await this.db.query<T>(sql, args)).rows;
  }

  async update(id: number, patch: Partial<Omit<T, 'id'>>): Promise<T> {
    const keys = Object.keys(patch) as (keyof T)[];

    if (keys.length === 0) throw new Error('Empty patch given');

    const set = keys.map((k, i) => `"${String(k)}" = $${i + 1}`).join(', ');

    const args = keys.map((k) => (patch as unknown)[k]);

    args.push(id);

    const sql = `UPDATE ${this.table} SET ${set} WHERE id = $${args.length} RETURNING *`;

    return (await this.db.query<T>(sql, args)).rows[0];
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.db.query(
      `DELETE FROM ${this.table} WHERE id = $1 RETURNING id`,
      [id],
    );
    return result.rows.length > 0;
  }

  async deleteWhere(where: Partial<T>): Promise<number> {
    const keys = Object.keys(where) as (keyof T)[];
    if (keys.length === 0) return 0;

    const clauses = keys
      .map((k, i) => `"${String(k)}" = $${i + 1}`)
      .join(' AND ');
    const args = keys.map((k) => (where as unknown)[k]);

    const sql = `DELETE FROM ${this.table} WHERE ${clauses} RETURNING id`;
    const result = await this.db.query(sql, args);
    return result.rows.length;
  }
}
