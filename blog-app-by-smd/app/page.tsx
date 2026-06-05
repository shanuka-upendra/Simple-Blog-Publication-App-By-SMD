import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

export default async function Home() {
  const supabase = createClient()

  const { data: posts } = await supabase.from('posts').select('*').order('created_at', { ascending: false })

  return (
    <div className="flex flex-col gap-12 mt-10">
      {/* Hero Section */}
      <section className="bg-[#bcff6b] p-8 md:p-16 brutal-border brutal-shadow">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-tight mb-4">
          Ship Code.<br />Share Knowledge.
        </h1>
        <p className="text-xl md:text-2xl font-medium max-w-2xl mb-8">
          A dedicated space for software engineering insights. Read public articles for free, or upgrade for premium deep dives.
        </p>
        <Link
          href="/login"
          className="inline-block bg-black text-white font-bold text-lg px-8 py-4 brutal-border brutal-shadow hover:bg-gray-800 transition-colors"
        >
          Start Reading
        </Link>
      </section>

      {/* Blog Feed Section */}
      <section>
        <h2 className="text-3xl font-black uppercase mb-8 border-b-4 border-black pb-2">Latest Transmissions</h2>

        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <article key={post.id} className="bg-white p-6 brutal-border brutal-shadow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold">{post.title}</h3>
                    {post.is_premium && (
                      <span className="bg-black text-white text-xs font-bold px-2 py-1 uppercase">Premium</span>
                    )}
                  </div>
                  <p className="text-gray-700 mb-6 line-clamp-3">{post.content}</p>
                </div>
                <Link href={`/post/${post.id}`} className="font-bold underline decoration-2 underline-offset-4 hover:text-blue-600">
                  Read Article →
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 brutal-border text-center">
            <p className="text-xl font-bold text-gray-500">No posts initialized yet. Check back after Day 2.</p>
          </div>
        )}
      </section>
    </div>
  );
}
