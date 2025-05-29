import * as bcrypt from 'bcrypt';

export class AuthUtils {
  static verifyPassword(
    password: string,
    storedHash: string,
    pepper?: string,
  ): Promise<boolean> {
    return bcrypt.compare(pepper ? password + pepper : password, storedHash);
  }

  static async hashPassword(
    password: string,
    rounds: number,
    pepper?: string,
  ): Promise<string> {
    return bcrypt.hash(pepper ? password + pepper : password, rounds);
  }
}
