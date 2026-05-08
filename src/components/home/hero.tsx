export function Hero({ settings }: { settings: any }) {
  return (
    <section className="py-12 md:py-24 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
        {settings?.hero_title || "Hi, I am a Developer"}
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
        {settings?.hero_subtitle || "Building digital experiences with Next.js and Supabase"}
      </p>
      {settings?.about_text && (
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
          {settings.about_text}
        </p>
      )}
    </section>
  )
}
