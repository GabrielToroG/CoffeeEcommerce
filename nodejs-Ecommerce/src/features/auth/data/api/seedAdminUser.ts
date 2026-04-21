import { environment } from "../../../../core/config/environment";
import { queryDatabase, withDatabaseTransaction } from "../../../../core/database/postgresPool";
import { hashPassword } from "../../../../core/security/passwordHasher";

export async function seedAdminUser() {
  const adminPasswordHash = await hashPassword(environment.adminPassword);

  const existingAdminResult = await queryDatabase<{ id: string }>(
    `
      SELECT id
      FROM users
      WHERE email = $1
    `,
    [environment.adminEmail.trim().toLowerCase()],
  );
  const existingAdminRow = existingAdminResult.rows[0];

  if (existingAdminRow) {
    await queryDatabase(
      `
        UPDATE users
        SET role = 'admin',
            full_name = $1,
            password = $2,
            updated_at = NOW()
        WHERE id = $3
      `,
      [
        environment.adminFullName.trim(),
        adminPasswordHash,
        existingAdminRow.id,
      ],
    );

    return;
  }

  const timestamp = Date.now();
  const userId = `admin-${timestamp}`;
  const address = "Panel administrativo";

  await withDatabaseTransaction(async (client) => {
    await client.query(
      `
        INSERT INTO users (id, full_name, email, role, address, password)
        VALUES ($1, $2, $3, 'admin', $4, $5)
      `,
      [
        userId,
        environment.adminFullName.trim(),
        environment.adminEmail.trim().toLowerCase(),
        address,
        adminPasswordHash,
      ],
    );

    await client.query(
      `
        INSERT INTO addresses (id, label, full_address, user_id)
        VALUES ($1, $2, $3, $4)
      `,
      [
        `address-${timestamp}`,
        "Administracion",
        address,
        userId,
      ],
    );
  });
}
