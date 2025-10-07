// a personalized file to write fore exemple headers. So they ll be shown in all the files within (marketing) folder
// that practice is called groups and is defined by parentesis (). The route still though the name
//  of the folder outside parentesis.For ex in this case to render the page we have to navigate
// to "blog", and not "(marketing)": http://localhost:3000/blog

// same as the app layout, but personalized. (if you have some links in app layout they ll be shown anyway).
// ps if we delete the app layut and create a layout for each folder component, the navigation will refresh the browser
// instead of just navigate through page without reloading. So its better to have always app layout.tsx
import Link from "next/link";

// remembere, even this is a server component
export default function MarketingLayout({
  children,
  auth,
}: Readonly<{
  children: React.ReactNode;
  auth: React.ReactNode;
}>) {
  return (
    <div className="bg-sky-600 p-2">
      <h1 className="text-2xl font-bold">(marketing) Layout</h1>
      <nav className="bg-red-800 p-2">
        <ul className="flex gap-4">
          <li>
            <Link href="/">Home</Link>{" "}
            {/*all those link are pre-fetched at build time and are ssg(static)*/}
            {/* remember to disabilitate the pre-fecth and casching from llink if the link contains dinamic segments
            like: <Link href={`/posts/${id}`} prefetch={false}>{title}</Link> */}
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/dashboard">dashboard</Link>{" "}
            {/* renders (dashboard)/dashboard/page.tsx */}
          </li>
          <li>
            <Link href="/login">Login</Link>{" "}
            {/* renders (auth)/(.)login/page.tsx. thats because that link is inside (marketing), and (.)login
            make it possible navigate to this (.)login/page.tsx, and not in (auth)/login.
            but If we navigate in the browser on https:localhost:3000, it will render (auth)/login/page.tsx.
            (.)login is a sort of personalized navigation to the page we wanna render defined inside the (group)(marketing) itself */}
          </li>
        </ul>
      </nav>
      {children}
      {auth}{" "}
      {/* this renders the full page (both children and auth page.tsx). otherwise  */}
    </div>
  );
}

// dopo il build, se andiamo su console, inspektera, network, fetch/xhr, preview
// vedremo il preview delle pagine statiche generate dai Link, con i nomi delle pagine generate uguali
// ai nomi dei Link path:
// (blog?_src=7g69s,dashboard?_src=7g69s,login?_src=7g69s..).
