export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-[1200px]">
        <h1 className="text-4xl font-semibold text-accent mb-4">
          Evgeny Shkuratov
        </h1>
        <p className="text-body text-text-secondary mb-8">
          Portfolio v5.0.1 - Next.js setup complete
        </p>
        <div className="border border-accent rounded p-8">
          <p className="text-body-lg">
            ✅ Next.js 15 initialized
            <br />
            ✅ TypeScript configured
            <br />
            ✅ Tailwind CSS with design tokens ready
            <br />
            ✅ Project structure created
            <br />
            <br />
            Ready for development!
          </p>
        </div>
      </div>
    </div>
  );
}
