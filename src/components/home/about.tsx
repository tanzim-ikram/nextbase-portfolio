export function About({ text }: { text: string }) {
  if (!text) return null;
  return (
    <section id="about" className="py-12 md:py-24">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h2 className="text-3xl font-bold tracking-tight text-base-content">About Me</h2>
        <p className="text-lg text-base-content/70 leading-relaxed text-left md:text-center">
          {text}
        </p>
      </div>
    </section>
  );
}
