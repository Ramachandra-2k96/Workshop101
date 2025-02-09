import RiveHero from "@/components/RiveHero";
import AboutSection from "@/components/about";
import WorkshopDetails from "@/components/WorkshopDetails";
import Prerequisites from "@/components/Prerequisites";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="block relative w-screen h-screen">
      <RiveHero />
      <AboutSection />
      <Prerequisites />
      <WorkshopDetails />
      <Footer />
    </main>
  );
}
