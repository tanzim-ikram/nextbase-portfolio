const DUMMY_ABOUT = "I'm a passionate full-stack developer and UI/UX designer with a love for building beautiful, functional digital products. I specialize in modern web technologies — turning complex problems into elegant, user-friendly solutions. I'm always looking for new challenges and opportunities to grow.";

export function About({ text }: { text?: string | null }) {
  const content = text || DUMMY_ABOUT;

  return (
    <section id="about" className="py-12 md:py-24">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">About Me</h2>
        <p className="text-lg text-base-content/70 leading-relaxed">
          {content}
        </p>
      </div>
    </section>
  );
}
