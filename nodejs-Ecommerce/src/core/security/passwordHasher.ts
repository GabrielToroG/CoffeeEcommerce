import { compare, hash } from "bcryptjs";

const bcryptHashPattern = /^\$2[aby]\$\d{2}\$.+/;
const passwordSaltRounds = 12;

export function isHashedPassword(password: string) {
  return bcryptHashPattern.test(password);
}

export async function hashPassword(plainPassword: string) {
  return hash(plainPassword, passwordSaltRounds);
}

export async function verifyPassword(plainPassword: string, storedPassword: string) {
  if (isHashedPassword(storedPassword)) {
    return {
      isValid: await compare(plainPassword, storedPassword),
      shouldUpgradeHash: false,
    };
  }

  return {
    isValid: plainPassword === storedPassword,
    shouldUpgradeHash: true,
  };
}
