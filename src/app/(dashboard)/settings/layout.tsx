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

// Da sapere su <Link>. Leggi file Link_info.md
