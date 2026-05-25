import StatusBar from '@/components/StatusBar';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Manifesto from '@/components/Manifesto';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Terminal from '@/components/Terminal';
import Vibe from '@/components/Vibe';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <StatusBar />
      <Navbar />
      <main className="pt-8">
        <Hero />
        <Manifesto />
        <Skills />
        <Experience />
        <Terminal />
        <Vibe />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
