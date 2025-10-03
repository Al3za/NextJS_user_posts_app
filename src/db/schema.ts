import {
    pgTable, // serve a definire una tabella
    text,
    timestamp,
    // serial,  intero auto-incrementale (tipico per ID).
    varchar, // Significa “stringa a lunghezza variabile” (variable character).
    pgEnum,
    uuid,
    primaryKey
} from "drizzle-orm/pg-core"

// creiamo una logica relazionale

// define role enum
export const roleEnum = pgEnum("role", ["admin", "editor", "viewer"]); // pgEnum e una specie di tabella solo per valori definiti

// users table. inseriamo gli user
export const users = pgTable("users", {
    id: uuid('id').primaryKey().defaultRandom(), // se non fornisci un valore esplicito per id, genera un UUID random automaticamente. Ogni volta che inseriamo dati in questa tabella, l id avviene automaticamente
    name: varchar("name", { length: 100 }).notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    role: roleEnum("role").default("viewer").notNull(), // qua invochiamo la "tabella" roleEnum di sopra. Role deve essere un valore definito in roleEnum
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Perché usare UUID invece di SERIAL ?
// Globally unique: un UUID è unico anche su più database → ottimo se hai sistemi distribuiti.
// Sicurezza: meno prevedibile di un ID incrementale(1, 2, 3...).
// Scalabilità: evita conflitti quando unisci dati da più fonti.

//////

// table posts. Inseriamo i post degli users. la colonna author deve avere l id di users (relazionale)
export const posts = pgTable("posts", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: varchar("title", { length: 200 }).notNull(),
    content: text("content").notNull(),
    author: uuid('author').references(() => users.id, { onDelete: "cascade" }).notNull(), // posts.author is the foreign key, point to users.id col as referece.
    // { onDelete: "cascade" } significa che se un utente viene cancellato, anche tutti i post scritti da lui verranno eliminati automaticamente (comportamento “a cascata”).
    // .notNull() Ogni post deve avere un autore: non puoi inserire un post senza specificare l’UUID di un utente.
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});


// post_likes table. Inseriamo postId e userId che equivalgono a quale user (users.id) piace questo post (posts.id)
// Questa definizione che hai scritto in Drizzle è un classico esempio di tabella di join(o tabella pivot)
// per gestire una relazione molti - a - molti tra posts e users.
export const postLikes = pgTable("post_likes", {
    postId: uuid("post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
    // foreign key verso la colonna id. della tabella posts
    // se un post viene cancellato, vengono eliminati da questa tabella anche i suoi like, i like delle altre persone ad esempio.
    userId: uuid("user_id") //  foreign key verso la colonna id. della tabella users
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
},
    // Primary key composta. Significa che la combinazione postId + userId deve essere unica.
    // Quindi uno stesso utente non può mettere like due volte allo stesso post (evita duplicati).
    (table) => [primaryKey({
        columns: [table.postId, table.userId]
    })]
)
// post_likes è una tabella di join molti - a - molti tra posts e users.

// Garantisce che:

// Ogni like appartenga a un utente e a un post validi(grazie alle foreign key).

// Non ci siano duplicati(grazie alla primary key composta).

// I dati restino consistenti quando cancelli un post o un utente(grazie a onDelete: cascade).


////////

// table comments. Vediamo chi a commentato a un certo post
export const comments = pgTable("comments", {
    id: uuid("id").primaryKey().defaultRandom(),
    postId: uuid("post_id")
        .notNull()
        .references(() => posts.id, { onDelete: "cascade" }),
    userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});