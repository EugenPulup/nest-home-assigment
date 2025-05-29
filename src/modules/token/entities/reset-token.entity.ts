import { Exclude } from 'class-transformer';

export class ResetTokenEntity {
  id: number;
  token: string;
  createdAt: Date;

  @Exclude()
  userId: number;

  constructor(partial: Partial<ResetTokenEntity>) {
    Object.assign(this, partial);
  }
}
