import DynamicSections from "@/components/DynamicSections";

export const revalidate = 3600; // revalidate every hour

export default function Home() {
  return (
    <main className="min-h-screen">
      <DynamicSections />
    </main>
  );
}
