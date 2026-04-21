import { environment } from "./core/config/environment";
import { initializeDatabase } from "./core/database/initializeDatabase";
import { createApp } from "./core/server/createApp";
import { seedAdminUser } from "./features/auth/data/api/seedAdminUser";
import { seedStorefrontCatalog } from "./features/storefront/data/api/seedStorefrontCatalog";

async function bootstrap() {
  await initializeDatabase();
  await seedAdminUser();
  await seedStorefrontCatalog();

  const app = createApp();

  app.listen(environment.port, () => {
    console.log(`Backend running on port ${environment.port} in ${environment.nodeEnv}`);
  });
}

void bootstrap();
