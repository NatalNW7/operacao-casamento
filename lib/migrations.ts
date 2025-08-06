import { join } from "node:path";
import { Client } from "pg";

export default async function migrate(client: Client, isDryRun: boolean) {
    const { runner } = await import("node-pg-migrate");
    return await runner({
        dbClient: client,
        dryRun: isDryRun,
        dir: join(process.cwd(), "config", "database", "migrations"),
        direction: "up",
        verbose: true,
        migrationsTable: "pgmigrations"
    });
}