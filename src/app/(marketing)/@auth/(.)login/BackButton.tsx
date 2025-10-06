// this is a client component. we can write the client component here because the route will not be affect since it just
// affectts if it has the prefix "page"(page.tsx), and we only need this button component within (.)login route

"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter(); // hook to route back
  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded"
      onClick={() => router.back()}
    >
      {/*
      router.back()} goes back in history, in that route you came fram
 */}
      Go Back
    </button>
  );
}
