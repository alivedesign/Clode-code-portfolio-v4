import { MainLayout } from '@/components/MainLayout';

export default function Main() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center flex-1 px-spacing-8">
        <h1 className="text-body-lg text-text mb-spacing-6">/ Main</h1>
        <p className="text-body text-text-secondary text-center">
          Hero Section: "The Story of How We'll Work Together"
        </p>
        <p className="text-body text-text-secondary text-center mt-spacing-8">
          Coming soon...
        </p>
      </div>
    </MainLayout>
  );
}
