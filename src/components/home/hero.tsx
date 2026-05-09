import Link from "next/link";

export function Hero({ settings }: { settings: any }) {
  return (
    <section className="py-20 md:py-32 text-center flex flex-col items-center justify-center min-h-[70vh]">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-base-content max-w-4xl">
        {settings?.hero_title || "Hi, I am a Developer"}
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-base-content/70 sm:text-xl">
        {settings?.hero_subtitle || "Building digital experiences with Next.js and Supabase"}
      </p>
      <div className="mt-10 flex gap-4 justify-center items-center">
        <Link href="#projects" className="btn btn-primary btn-lg rounded-full">
          View Work
        </Link>
        <Link href="#connect" className="btn btn-outline btn-lg rounded-full">
          Contact Me
        </Link>
      </div>
    </section>
  )
}
