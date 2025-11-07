import { MainLayout } from '@/components/MainLayout';

export default function MyProducts() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center flex-1 px-spacing-8">
        <h1 className="text-body-lg text-text mb-spacing-6">/ My_Products</h1>
        <p className="text-body text-text-secondary text-center">
          My-Products: "What I Build When No One's Watching"
        </p>
        <p className="text-body text-text-secondary text-center mt-spacing-8">
          Coming soon...
        </p>
      </div>
    </MainLayout>
  );
}
