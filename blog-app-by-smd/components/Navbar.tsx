import { createClient } from "@/utils/supabase/client";
import Link from "next/dist/client/link";


export default async function Navbar() {
    const supabase = createClient();
    const {data: {user}} = await supabase.auth.getUser();

    return (
    <nav className="border-b-4 border-black p-4 flex justify-between items-center bg-white">
      <Link href="/" className="font-bold text-2xl tracking-tight">
        Simple Blog App<span className="text-blue-600">By SMD</span>
      </Link>
      
      <div className="flex gap-4 items-center font-semibold">
        {user ? (
          <>
            <Link href="/dashboard" className="hover:underline">Dashboard</Link>
            <form action="/auth/signout" method="post">
              <button className="px-4 py-2 bg-black text-white brutal-shadow">
                Sign Out
              </button>
            </form>
          </>
        ) : (
          <Link href="/login" className="px-4 py-2 border-2 border-black bg-[#f4f4f0] brutal-shadow">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}