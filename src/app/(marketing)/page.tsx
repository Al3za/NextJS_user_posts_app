// ABOUT REVALIDATE ISR METHODS:
// quando usiamo "export const revalidate = 3600"; e non specifichiamo il revalidate sul fetch, Tutta la
// pagina viene pre-renderizzata staticamente (SSG) durante il build, e quando il client visita
// nuovamente la pagina dopo 10 s, si Rigenera l’intero file HTML statico non solo il singolo fetch.

// se invece usiamo revalidate:10 dentro un fetch, durante il build il file resta (SSR), cioe  l html viene renderizzato
// e servito dal server ogni volta che il cliente visita il file. Pero i dati del fetch vengono cachati e anche qui
// vengono mostrati i nuovi dati del fetch solo quando sono passati 10 secondi. pero la pagina resta comunque SSR,
// cioe' l HTML della pagina viene generato da capo ogni volta che visitiamo la pagina. mentre con
// export const revalidate = 3600; durante la build, la pagina e' statica, anche dopo il revalidate,
// e quindi viene mostrata molto piu' veloce al cliente dato che viene sempre fornito dal CDN(anche dopo i 10 s del revalidate)
// e quindi e' piu' veloce per il client rispetto a SSR

import { revalidatePath, revalidateTag } from "next/cache";
// this page is now ISR (Incremental Static Regeneration)
// export const revalidate = 3600; // for all the fetch in this page (SSG)

//  const data = await fetch("https://random-word-api.herokuapp.com/word", {
//     next: { revalidate: 10 }) //(SSR) for personalized fetch, in case we have different fetch

// ABOUT THE HOME FUNCTION BELOVE:
// when we build the page, the fetch will triggered just once and the word will not change,
// because after the build is now static page, and data will be the same as when we fetched it
//  when builded the app
// so after build wee ll see always the same word even when we refresh, because we dont
// refetch the data, but just show a static page. To resolve that lwts use ISR with different revalidate methods.
///

export default async function Home() {
  // everytime we refresh the main page we get a different word (in dev mode, not in build)

  // const data = await fetch("https://random-word-api.herokuapp.com/word"); // return random words. use the export const revalidate time = 3600

  // const data = await fetch("https://random-word-api.herokuapp.com/word", {
  //   next: { revalidate: 10 }, //(ssr) revalidate every 10 sec. This is ssr, meaning
  // });
  // because we show the result of the fetch in this page, when revalidate, this file will be refreshed as well
  // data is cahed by default (data cashe)

  const data = await fetch("https://random-word-api.vercel.app/api", {
    next: {
      tags: ["word"], // this tags can be anything. it will help us to revalidate by tags in revalidate2 function
    },
  });
  const words = await data.json();
  // ricorda di usare un fallback se la fetch fails

  console.log("home component ran"); // this log will be shown when we click on revalidatePath button, but
  // not when we click on revalidateTag.

  // lets create a function that can regenerate route and tag. its another way to restore a page(like  next: { revalidate: 10 }).
  // this func run on the server
  async function revalidate() {
    "use server"; // questa direttiva specifica che “Questo codice deve essere eseguito solo sul server, mai nel browser.”
    revalidatePath("/"); //(SSG);  //the route of the page that has to revalidate ("/").
    // we revalidate the path ('/') because the fetch live in this path (the page.tsx in this path, the root page ("/"))
    // revalidatePath() Si può chiamare solo da una Server Action(come questa) o un Route Handler.
    // rigenera l’intera route(/) e file HTML statico della pagina (/)page.tsx,  a differenza di revalidateTag che rigenera solo i dati del fetch
    // e' il div tag html che contiene quei dati.
    // e come se facessimo il refresh dell intero page.tsx della route(/). (piu' "pesante" di revalidateTag, ricrea tutta l HTML della
    // page.tsx del path descritto. Inoltre refetcha tutti i fetch entro la pagina, non solo quelli definiti dal tag)
  }

  // option 2
  async function revalidate2() {
    "use server";
    revalidateTag("word"); // the tag name (word) of the fetch above that has to revalidate.(SSG)
    // con revalidateTag solo i dati del fetch con il word saranno aggiornati — non l’intera page.tsx HTML della route(/). (piu' leggero e granulare di revalidatePath)
    // la cache dei dati del fetch viene invalidata, il componente dove si trova il fetch (la Home page) viene
    // ricreato nel server, e cosi' viene servita la nuova pagina statica con i nuovi dati del fetch (e poi viene tutto cache in modo da ripetere la procedura).
    // A livello di html, si puo' pensare che solo il div che ospita i dati del fetch vengono ricreati( <h2 className="text-2xl font-bold"> {words} </h2>), non
    // a differenza di revalidatePath("/") che rebuild tutto l html della pagina (path("/"),page.tsx (Home))
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-600 p-4 m-4">
      <h2 className="text-2xl font-bold"> {words} </h2>
      <button onClick={revalidate}>Revalidate Path</button>
      {/* onclick funzione anche senza la direttiva "use client" perche chiamiamo una server component*/}
      {/* se ci fosse stata una connessione col browser non avrebbe funzionato (tipo un console.log) */}
      <button onClick={revalidate2}>Revalidate Tag</button>
    </div>
  );
}

// grazie al next config: logging: { //
// fetches: {
//   fullUrl: true, // when we fetch something in our pages, we ll get some logs in the terminal to identify important info
//   // like if a page is saved in cache or not (cache skip)
// },
//  vediamo se il fetch e' stato cashed nel nostro terminal:
// GET https://random-word-api.herokuapp.com/word 200 in 321ms (cache skip) -no cache

// the icon N in the page will tell us if the pages in the current route will be dinamics or static.
// actually when we click on the icon N in https::/localhost/3000, its says static. thats why when
// build the app, the word will be the same even if we reload the page, because it has been build as
// static.
