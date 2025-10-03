// in questo file definiamo le migrazioni del db auando cambiamo gli schemi-tabelle sul file schema.ts(./src/db/schema.ts)
// quindi quando cambiamo qualcosa in uno degli schemi nel file  schema.ts , ricordiamoci di eseguire "npx drizzle-kit generate", cosi aggiorniamo effettivamente gli schemi cambiati

import { config } from "dotenv"; // Serve per caricare le variabili d’ambiente dal file .env (tipo DATABASE_URL=...).
import { defineConfig } from "drizzle-kit" // serve per generare migrations SQL dalle modifiche al tuo schema TypeScript (schema.ts),

config({ path: ".env" }); // Qui dici a dotenv: “caricami le variabili d’ambiente dal file .env nella root del progetto”.

// defineConfig =  "drizzle-kit"
export default defineConfig({ // quando aggiungiamo o cambiamo una colonna nel file ./src/db/schema.ts, eseguiamo npx drizzle-kit generate sul terminal per completare effettivamente il cambiamento del db
    schema: "./src/db/schema.ts", //  percorso al file dove definisci le tue tabelle con Drizzle (in TS).
    out: "./migrations", // cartella dove Drizzle salverà le migrations SQL generate. (sotto spiego meglio)
    dialect: "postgresql", // il tipo di database (può essere postgresql, mysql, sqlite, ecc.).
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
})

// cosa sono le MIGRATIONS?  Una migration è un file (di solito SQL) che descrive un cambiamento nello schema del database.

// Esempi di cambiamenti:

// Creare una nuova tabella

// Aggiungere una colonna

// Rinominare una colonna

// Creare un indice

// Cancellare una tabella

// 👉 In pratica è come un “diario di bordo” delle modifiche al database, che puoi applicare passo dopo passo per mantenere coerente il DB tra sviluppo, staging e produzione.


// Supponiamo che in schema.ts hai:

// export const users = pgTable("users", {
//     id: serial("id").primaryKey(),
//     name: text("name").notNull(),
// });

// Poi aggiungi una nuova colonna:

// export const users = pgTable("users", {
//     id: serial("id").primaryKey(),
//     name: text("name").notNull(),
//     email: text("email").notNull(),
// });

// ora lanci:
// npx drizzle-kit generate

// Questo genera un file migration tipo:

// ALTER TABLE "users" ADD COLUMN "email" text NOT NULL;


// Flusso tipico

// quando Modifichi lo schema in TS(schema.ts) allora:

// Generi una migration(drizzle - kit generate) // genera i file con

// Applichi la migration al DB(drizzle - kit push/npm run db:migrate) Drizzle esegue i comandi SQL sul tuo DB per aggiornare lo schema. cosi possiamo vedere le tebelle in neon

// Il DB è aggiornato con la nuova struttura


///

// Ps ho inserito i comandi di drizzle kit in package.json script per semplificare il generate e push(migrate)