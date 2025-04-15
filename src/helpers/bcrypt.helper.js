import { compareSync, hashSync } from "bcryptjs";

export class BcryptAdapter {
  static hash(password) {
    return hashSync(password);
  }

  static compare(password, hashed) {
    return compareSync(password, hashed);
  }
}
