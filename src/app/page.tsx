import Hero from "./home/components/Hero";
import Preview from "./home/components/Preview";

export default function Home() {
  return (
    <div className="w-full h-screen 2xl:flex 2xl:gap-72 gap-20 2xl:items-center 2xl:justify-end">
      <Hero />
      <Preview />
    </div>
  );
}
