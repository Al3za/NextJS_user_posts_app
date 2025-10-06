import Link from "next/link";

export default function Login() {
  return (
    <div>
      <h1 className="text-xl">Login</h1>
      <Link href={"/"}>Home Page</Link> {/*Link pre-render works well here */}
    </div>
  );
}
