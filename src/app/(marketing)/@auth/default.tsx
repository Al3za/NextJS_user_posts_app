// questa page fa' in modo che l app non crasha se visitiamo un altro route al di fuori di @auth/login.
// se visitiamo https:localHost:3000 questa non crasha data la natura di @. senza questo codice l app avrebbe
// creashato, perche dobbiamo semplicemente definire in @auth di non crashare se non viene non viene
// visitata un altra page al di fuori di login/page.tsx (ad esempio https:localHost:3000, e non https:localHost:3000/login)
// a questo serve questa page. Ritorna null se scegliamo un altro path non definito in auth, e non da error
// se visitiamo le altre pagine, la "Home-main page" che e' la page.tsx scompare, e vengono renderizate solo le pagine
// che si trovano nella route che visitiamo. Ma grazie alle modifiche del children auth nel root layout, possiamo vedere
// la pagina login insieme alla main page
export default function Page() {
  return null;
}
