// (.login) intercept the login file, so when we use the Link from (marketing)/layout.tsx, (.login)/page.tsx
// will be rendered, but when we write the segment login in the browser (auth) link will be render.
// In parole povere quando chiamiamo il path login dal nostro (marketing) folder, allora un livello sopra
// ci troviamo dentro il folder login e renderiamo il nostro model.
// se togliamo il punto dal file login in (marketing) = (.)login e lasciamo solo login, riceviamo
// il segente error:
//  You cannot have two parallel pages that resolve to the same path. Please check /(auth)/login and /(marketing).
// questo serve a creare route persnalizzate se vengono chiamate dallo (slot) stesso

// @auth e una parallel routing, la riconosciamo da @. Al momento il codice non si blocca se visitiamo
// la rout https:localhost:3000/login, ma data la natura del @ routing, se usiamo solo https:localhost:3000
// il codice crasha perche non abbiamo definito quale pagina render a parte @auth/login.
// noi vogliamo anche che si veda il (marketing)/page.tsx assieme al login/page.tsx, quindi dobbiamo definire
// dentro @auth di non bloccarsi se visualiziamo un altro route aparte @auth/login.
// quindi il primo passo e che nel (marketing)/layout.tsx inseriamo il children auth per renderizzare sia
// la page di (marketing), che la page del auth/login

import BackButton from "./BackButton";
export default function Login() {
  return (
    <div className="w-full h-full top-0 start-0 flex items-center justify-center bg-[rgba(1,1,1,0.6)] fixed">
      <div>
        <BackButton />{" "}
        {/*call a client coomponent that brings you back to the route you were before*/}
        <h1 className="text-xl">Modal Login</h1>
      </div>
    </div>
  );
}
