import { runner } from "node-pg-migrate"
import database from "@/config/database/database-connection";
import { join } from "node:path";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    let dbClient;
    try {
        dbClient = await database.getNewClient();

        const pendingMigrations = await migrate(dbClient, true);        
        return NextResponse.json({pendingMigrations}, { status: 200});
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    } finally {
        dbClient?.end();
    }
}

export async function POST(request: Request) {
    let dbClient;
    try {
        dbClient = await database.getNewClient();

        const migratedMigrations = await migrate(dbClient, false);
        if(migratedMigrations.length > 0) {
            return NextResponse.json({migratedMigrations}, { status: 201});
        }
        
        return NextResponse.json({migratedMigrations}, { status: 200});
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    } finally {
        dbClient?.end();
    }
}

async function migrate(client: any, isDryRun: boolean) {
    return await runner({
        dbClient: client,
        dryRun: isDryRun,
        dir: join(process.cwd(), "config", "database", "migrations"),
        direction: "up",
        verbose: true,
        migrationsTable: "pgmigrations"
    });
}