import { DatabaseService } from '@/modules/database/database.service';

export interface Model {
  id: number;
}

export abstract class BaseRepository<T extends Model> {
  constructor(
    protected readonly db: DatabaseService,
    private readonly table: string,
  ) {}

  async create(data: Omit<T, 'id'>): Promise<T> {
    const keys = Object.keys(data) as (keyof T)[];
    const cols = keys.join(', ');
    const values = keys.map((_, i) => `$${i + 1}`).join(', ');
    const args = keys.map((k) => (data as unknown)[k]);

    const sql = `INSERT INTO ${this.table} (${cols}) VALUES (${values}) RETURNING *`;
    return (await this.db.query<T>(sql, args)).rows[0];
  }

  /** SELECT * FROM table WHERE id = $1 */
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
      .map((k, i) => `${String(k)} = $${i + 1}`)
      .join(' AND ');
    const args = keys.map((k) => (where as unknown)[k]);

    const sql = `SELECT * FROM ${this.table} WHERE ${clauses}`;
    return (await this.db.query<T>(sql, args)).rows;
  }

  async update(id: number, patch: Partial<Omit<T, 'id'>>): Promise<T> {
    const keys = Object.keys(patch) as (keyof T)[];

    if (keys.length === 0) throw new Error('Empty patch given');

    const set = keys.map((k, i) => `${String(k)} = $${i + 1}`).join(', ');

    const args = keys.map((k) => (patch as unknown)[k]);

    args.push(id);

    const sql = `UPDATE ${this.table} SET ${set} WHERE id = $${args.length} RETURNING *`;

    return (await this.db.query<T>(sql, args)).rows[0];
  }

  async delete(id: number): Promise<void> {
    await this.db.query(`DELETE FROM ${this.table} WHERE id = $1`, [id]);
  }
}
