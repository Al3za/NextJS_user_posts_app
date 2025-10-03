import Link from "next/link";

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-blue-900 p-2">
      <h1 className="text-2xl font-bold">Settings Layout</h1>
      <div className="flex gap-2">
        <div className="w-[200px] h-[500px] bg-orange-700 p-2">
          <h2 className="text-xl font-bold">Settings</h2>
          <nav>
            <ul>
              <li>
                <Link href="/settings">General</Link>{" "}
                {/*create a personalized link for all the routes in settings 
                When run build, the Link is pre-fetching the html of the link, so the rendering for the client 
                will be fast(ssg). If the href was dinamic like /dashboard/settings${id}, maybe we wanna consider
                to deactivate the link pre-fetching */}
              </li>
              <li>
                <Link href="/settings/profile">Profile</Link>{" "}
                {/*Link tag doesnt refresh the page, it just routing thrigh the app component
                Only that page we are navigate in are re-rendered (Very nice) 
                Not a big single boudle anymore like react, but small boundles for each page*/}
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

// Da sapere su <Link>

// 🔹 1. Prefetch automatico nel viewport

// Quando un <Link> entra nel viewport (cioè diventa visibile sullo schermo), Next.js in produzione fa il prefetch delle risorse necessarie alla pagina di destinazione (HTML + JavaScript).

// Questo avviene dietro le quinte, senza che tu debba fare nulla (SSG).

// 2. Risultato pratico

// Quando l’utente clicca sul link, la pagina è già stata scaricata → la navigazione è quasi istantanea.

// Non c’è un full-page reload (come con un normale <a>), ma un aggiornamento client-side del contenuto.

// 🔹 3. Dopo il build (SSG/ISR/SSR)

// Se la pagina è SSG: il file HTML è già stato generato al build → viene prefetchato.

// Se la pagina è ISR: viene prefetchata la versione cache valida (e poi aggiornata se serve).

// Se la pagina è SSR: Next prefetcherà solo le informazioni minime, ma la pagina comunque verrà servita dal server.

// Eccezioni / dettagli da considerare

// Se il link punta a una rotta dinamica (es. /posts/[id]) non prefetcherà l’intera rotta, o potrebbe dover “aspettare” componenti loading, a seconda della configurazione.
// nextjs.org
// +1

// Puoi disabilitare il prefetching su un <Link> usando prefetch={false}.
// nextjs.org
// +1

// Prefetching avviene principalmente in produzione, non necessariamente in modalità di sviluppo.
// nextjs.org

// Se i link sono parte del layout che è prerenderizzato, quei link fanno parte dell’HTML statico generato.

// quando disattivare il prefetch da link durante il build?

// {
//   /* Prefetch utile: pochi link statici */
// }
// <Link href="/posts/123">Post 123</Link>;

// {
//   /* Prefetch disattivato: molti link dinamici */
// }
// <Link href={`/posts/${id}`} prefetch={false}>
//   {title}
// </Link>;

// pre rendering hapens only in product(after npm run build), not in dev

// lounch build and then npm start to see the builded app
