// installa npm i drizzle-seed
// installa npm i pg
// drizzle-seed e' un pacchetto che ti aiuta a popolare il database con dati di test (seed data) in modo facile.
// pg serve a far comunicare il tuo progetto Node/Next.js con un database Postgres.

import "dotenv/config";
import { reset, seed } from "drizzle-seed";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/node-postgres"

// questa funzione crea dei dati random allo scopo di popolare velocemente le tabelle del db, senza fare insert
// manuali che impiegerebbero tanto tempo. Ora eseguiamo npm run db:seed. Come descritto in package.json script

async function main() {
    const db = drizzle(process.env.DATABASE_URL!);
    await reset(db, schema); // dont do it in production
    await seed(db, schema).refine((f) => ({
        users: {
            count: 100,
            columns: {
                name: f.fullName(),
                email: f.email(),
            },
        },
        posts: {
            count: 20,
            columns: {
                title: f.loremIpsum({ sentencesCount: 1 }),
                content: f.loremIpsum({
                    sentencesCount: 5,
                }),
            },
        },
        postLikes: {
            count: 20,
        },
        comments: {
            count: 100,
            columns: {
                content: f.loremIpsum({
                    sentencesCount: 3,
                }),
            },
        },
    }));
}

main();