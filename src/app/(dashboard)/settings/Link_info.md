Da sapere su <Link>

🔹 1.Prefetch automatico nel viewport

Quando un <Link> entra nel viewport (cioè diventa visibile sullo schermo), Next.js in produzione
fa il prefetch delle risorse necessarie alla pagina di destinazione (HTML + JavaScript).

Questo avviene dietro le quinte, senza che tu debba fare nulla (SSG).

2. Risultato pratico

Quando l’utente clicca sul link, la pagina è già stata scaricata → la navigazione è quasi istantanea.

Non c’è un full-page reload (come con un normale <a>), ma un aggiornamento client-side del contenuto.

🔹 3. Dopo il build (SSG/ISR/SSR)

Se la pagina è SSG: il file HTML è già stato generato al build → viene prefetchato. In questo caso
si puo' usare il Link come in questa pagina, oppure in casi come:

<Link href={`/posts/`}>
{title}

</Link>
 non c e bisogno di prefetch={false}, perche il path non contiene segmenti(come sotto in ssr)

Se la pagina è ISR: viene prefetchata la versione cache valida (e poi aggiornata se serve).

Se la pagina è SSR: Next prefetcherà solo le informazioni minime, ma la pagina comunque verrà
servita dal server. Se ci sono <Link> SSR tipo
/_ Prefetch disattivato: molti link dinamici _/}
{

<Link href={`/posts/${id}`} prefetch={false}>
{title}

</Link>
} 
ricorda di eliminare il prefetch (prefetch={false}) perche non sa' quale id aspettarsi
e' possono sorgere problemi. Lo stesso vale per un component che e ssr, e che fa un fetch ad un
risorsa con un segmento nello url.
in questo caso usa nella pagina:

export const dynamic = "force-dynamic"; forza SSR

export default async function PostsPage() {
no caching → eseguito a ogni richiesta
const res = await fetch("https:sonplaceholder.typicode.com/posts", {
cache: "no-store",
});
const posts = await res.json();

return (

<div>
<h1>Lista post (SSR)</h1>
{posts.map((p: any) => (
<p key={p.id}>{p.title}</p>
))}
</div>
);
}

Eccezioni / dettagli da considerare

Se il link punta a una rotta dinamica (es. /posts/[id]) non prefetcherà l’intera rotta, o potrebbe dover “aspettare” componenti loading, a seconda della configurazione.
nextjs.org
+1

Puoi disabilitare il prefetching su un <Link> usando prefetch={false}.
nextjs.org
+1

Prefetching avviene principalmente in produzione, non necessariamente in modalità di sviluppo.
nextjs.org

Se i link sono parte del layout che è prerenderizzato, quei link fanno parte dell’HTML statico generato.

quando disattivare il prefetch da link durante il build?

{
/_ Prefetch utile: pochi link statici _/
}

<Link href="/posts/123">Post 123</Link>;

{
/_ Prefetch disattivato: molti link dinamici _/
}

<Link href={`/posts/${id}`} prefetch={false}>
  {title}
</Link>;

pre rendering hapens only in product(after npm run build), not in dev

launch build and then npm start to see the builded app
