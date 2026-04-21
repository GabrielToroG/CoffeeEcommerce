import { existsSync, readFileSync } from "fs";
import path from "path";
import dotenv from "dotenv";
import { Client } from "pg";

type BootstrapEnvironment = "development" | "production";

type BootstrapConfig = {
  databaseName: string;
  environmentName: BootstrapEnvironment;
  connectionString: string;
};

function readEnvironmentFile(environmentName: BootstrapEnvironment) {
  const environmentFilePath = path.resolve(process.cwd(), `.env.${environmentName}`);

  if (!existsSync(environmentFilePath)) {
    throw new Error(`No existe el archivo ${environmentFilePath}`);
  }

  const parsedEnvironment = dotenv.parse(readFileSync(environmentFilePath, "utf8"));
  const connectionString = parsedEnvironment.DATABASE_URL;

  if (!connectionString) {
    throw new Error(`DATABASE_URL no esta definido en ${environmentFilePath}`);
  }

  const parsedUrl = new URL(connectionString);
  const databaseName = parsedUrl.pathname.replace(/^\//, "");

  if (!databaseName) {
    throw new Error(`No fue posible obtener el nombre de la base desde ${environmentFilePath}`);
  }

  return {
    environmentName,
    connectionString,
    databaseName,
  } satisfies BootstrapConfig;
}

function buildAdminConnectionString(connectionString: string) {
  const connectionUrl = new URL(connectionString);
  connectionUrl.pathname = "/postgres";
  return connectionUrl.toString();
}

async function ensureDatabaseExists(config: BootstrapConfig) {
  const adminClient = new Client({
    connectionString: buildAdminConnectionString(config.connectionString),
  });

  await adminClient.connect();

  try {
    const existingDatabaseResult = await adminClient.query<{ datname: string }>(
      `
        SELECT datname
        FROM pg_database
        WHERE datname = $1
      `,
      [config.databaseName],
    );

    if (existingDatabaseResult.rowCount && existingDatabaseResult.rowCount > 0) {
      console.log(
        `[db:bootstrap] ${config.environmentName}: la base "${config.databaseName}" ya existe.`,
      );
      return;
    }

    await adminClient.query(`CREATE DATABASE "${config.databaseName}"`);
    console.log(
      `[db:bootstrap] ${config.environmentName}: se creo la base "${config.databaseName}".`,
    );
  } finally {
    await adminClient.end();
  }
}

async function runBootstrap() {
  const environments: BootstrapEnvironment[] = ["development", "production"];

  for (const environmentName of environments) {
    const config = readEnvironmentFile(environmentName);
    await ensureDatabaseExists(config);
  }

  console.log("[db:bootstrap] Bootstrap completado.");
}

void runBootstrap().catch((error) => {
  console.error("[db:bootstrap] Error al crear las bases:", error);
  process.exitCode = 1;
});
