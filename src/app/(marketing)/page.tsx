// now lets try a SSR dynamic rendering of this page

// export const dynamic = "force-dynamic"; (forza il render dinamico. La pagina non verrà pre-renderizzata al build time. ogni volta che un cliente visita la pagina questa verra creata e servita dal server (ssr))
// se usiamo searchParams props, oppure cookies, oppure headers o cache: "no-cache" nel fetch, non abbiamo bisogno della direttiva export const dynamic = "force-dynamic"; perche di defoult al build time la pagina
// sara' ssr (pagina dinamica), dato che usiamo props o runtime methods come header o cookies.
// this directive tells the serve that This page is non cached on build.(we can see the log('home component ran') after the build we refresh the homepage)
// our home route is now flagged with ƒ (maans dynamic page),. This means that on build, it skip the "full route cach" for this path(/)/page.tsx (the home component
// everytime the client request that rout, it will be generated a new html in next server, and not a cached version of the page.

// Important. we can still have a dinamic route and cache our fetch request.
// when we refresh the page in the browser, the page is re-rendered everytime, but the data cache is still the same as the build
// because of the "data cach" on he fetch

import { revalidatePath, revalidateTag } from "next/cache";

export default async function Home({
  searchParams, // if we use searchParams props, or in our fetch cookies,headers or cache: "no-cache", by default the route is dinamic (ssr by def on build).
}: // so there is no need to define it at the top of the page with export const dynamic = "force-dynamic", because is clearly a dinamic page
{
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  // We pass a props that is objet with a key of tipe string, the value of either string or string[] or undefined
}) {
  const lang = (await searchParams).lang; // start the app and write the key lang with the desired language you wand the word to be (htpp://localhost:3000?lang=zh) (zh is chinese)
  // it explans the type describet here: searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  console.log(lang);
  const data = await fetch(
    // next use by default memoization for fetch and res on server side. meaning that once data is fetched, if we use the same fetch on another page it ll shows the data we cached on the previus fetch
    // in client components instead we have to use methods lik SWR to do that
    `https://random-word-api.vercel.app/api?lang=${lang || "en"}`, // the props make this route ("/") dynamic
    // "en" is the fallback in case we not acces a language in the browser url
    {
      cache: "force-cache", //still cache "data cach", even thoug this page is render for new everytime a user visit it
      // cache: "no-cache", // dont cache data, reftech on every page request. when use "no-cache" we doon need export const dynamic = "force-dynamic", because this is dinamic by default
      next: {
        // revalidate:10, // define here how long the cache should laste berore invalidation
        tags: ["word"],
      },
    }
  );

  const data2 = await fetch(
    `https://random-word-api.vercel.app/api?lang=${lang || "en"}`, // the props make this route ("/") dynamic
    // "en" is the fallback in case we not acces a language in the browser url
    {
      // cache: "force-cache", //still cache "data cach", even thoug this page is render for new everytime a user visit it
      // cache: "no-cache", // dont cache data, reftech on every page request. when use "no-cache" we doon need export const dynamic = "force-dynamic", because this is dinamic by default
      next: {
        // revalidate:10, // define here how long the cache should laste berore invalidation
        tags: ["word"], // both fetches are using this tag
      },
    }
  );

  const words = await data.json(); // cached. on refresh the words not changes
  const words2 = await data2.json(); // no chached. on refresh the word do changes

  console.log("home component ran"); // to check if our component runs

  // lets create a function that can regenerate route and tag. its another way to restore a page(like  next: { revalidate: 10 }).
  // this func run on the server
  async function revalidate() {
    "use server"; // questa direttiva specifica che “Questo codice deve essere eseguito solo sul server, mai nel browser.”
    revalidatePath("/");
  }

  // option 2
  async function revalidate2() {
    "use server";
    revalidateTag("word");
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-600 p-4 m-4">
      <h2 className="text-2xl font-bold"> {words} </h2>
      <h2 className="text-2xl font-bold"> {words2} </h2>
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
