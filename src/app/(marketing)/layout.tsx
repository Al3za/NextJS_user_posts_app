// a personalized file to write forexemple headers. So they ll be shown in all the files within (marketing) folder
// that practice is called groups and is defined by parentesis (). The route still though the name
//  of the folder outside parentesis.For ex in this case to render the page we have to navigate
// to "blog", and not "(marketing)": http://localhost:3000/blog

// same as the app layout, but personalized. (if you have some links in app layout they ll be shown anyway).
// ps if we delete the app layut and create a layout for each folder component, the navigation will refresh the browser
// instead of just navigate through page without reloading. So its better to have always app layout.tsx
import Link from "next/link";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-sky-600 p-2">
      <h1 className="text-2xl font-bold">(marketing) Layout</h1>
      <nav className="bg-red-800 p-2">
        <ul className="flex gap-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/dashboard">dashboard</Link>
          </li>
        </ul>
      </nav>
      {children}
    </div>
  );
}
