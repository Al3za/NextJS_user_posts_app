// this react component is going to be seen in all route components inside dashboard, like settings/page and the others
// like the rootLayout in the root layout file

import { ReactNode } from "react";

export default function DashboardLayout({
  children,
  analitics,
  users,
}: {
  children: ReactNode;
  analitics: ReactNode;
  users: ReactNode; // tipe of the users/page.tsx file
}) {
  return (
    <div className="bg-green-700 p-2">
      <h1 className="text-2xl font-bold">Dashboard Layout</h1>
      {children}
      {/*Remind. children is the page.tsx file inside dashboard folder */}
      {""}
      {analitics}
      {""}
      {users}
    </div>
  );
}
