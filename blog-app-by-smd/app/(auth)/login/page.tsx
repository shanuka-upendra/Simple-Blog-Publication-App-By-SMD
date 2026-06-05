import { createClient } from "@/utils/supabase/client"
import { redirect } from "next/dist/client/components/navigation"

export default function LoginPage({
    searchParams,
}: {
    searchParams: { message?: string }
}) {
    const signIn = async (formData: FormData) => {
        'use server'
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const supabase = createClient()

        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
            return redirect('/login?message=Invalid credentials')
        }
        return redirect('/dashboard')
    }

    const signUp = async (formData: FormData) => {
        'use server'
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const supabase = createClient()

        const { error } = await supabase.auth.signUp({ email, password })
        if (error) {
            return redirect('/login?message=Could not create account')
        }
        return redirect('/login?message=Check your email to continue signing in')
    }

    return (
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md mx-auto justify-center mt-20">
            <div className="bg-white p-8 brutal-border brutal-shadow">
                <h1 className="text-3xl font-black mb-6 uppercase tracking-tight">Access Portal</h1>

                <form className="flex-1 flex flex-col w-full justify-center gap-4 text-black">
                    <label className="font-bold text-sm" htmlFor="email">Email</label>
                    <input
                        className="px-4 py-2 bg-[#f4f4f0] brutal-border focus:outline-none focus:ring-2 focus:ring-black"
                        name="email"
                        placeholder="developer@example.com"
                        required
                    />

                    <label className="font-bold text-sm mt-2" htmlFor="password">Password</label>
                    <input
                        className="px-4 py-2 bg-[#f4f4f0] brutal-border focus:outline-none focus:ring-2 focus:ring-black"
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        required
                    />

                    <div className="flex gap-4 mt-6">
                        <button
                            formAction={signIn}
                            className="flex-1 bg-black text-white font-bold px-4 py-3 brutal-border brutal-shadow hover:bg-gray-800 transition-colors"
                        >
                            Sign In
                        </button>
                        <button
                            formAction={signUp}
                            className="flex-1 bg-white text-black font-bold px-4 py-3 brutal-border brutal-shadow hover:bg-gray-100 transition-colors"
                        >
                            Sign Up
                        </button>
                    </div>

                    {searchParams?.message && (
                        <p className="mt-4 p-3 bg-red-100 brutal-border text-red-900 font-semibold text-center text-sm">
                            {searchParams.message}
                        </p>
                    )}
                </form>
            </div>
        </div>
    )
}
