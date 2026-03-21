import Navbar      from './components/Navbar';
import Hero        from './components/Hero';
import About       from './components/About';
import Skills      from './components/Skills';
import Projects    from './components/Projects';
import Certificates from './components/Certificates';
import Contact     from './components/Contact';
import Footer      from './components/Footer';
import BackToTop   from './components/BackToTop';
import CursorGlow  from './components/CursorGlow';
import AIChatbot   from './components/AIChatbot';
import { useTheme, useScrollY } from './hooks/useTheme';

function ScrollProgressBar({ scrollY }) {
  const total = typeof document !== 'undefined'
    ? document.documentElement.scrollHeight - window.innerHeight : 1;
  const pct = total > 0 ? Math.min(scrollY / total, 1) * 100 : 0;
  return <div className="scroll-progress" style={{ width: `${pct}%` }} />;
}

export default function App() {
  const { dark, toggle } = useTheme();
  const scrollY = useScrollY();

  return (
    <div className="grain relative">
      <ScrollProgressBar scrollY={scrollY} />
      <CursorGlow />
      <Navbar dark={dark} onToggle={toggle} scrollY={scrollY} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certificates />
        <Contact />
      </main>
      <Footer />
      <BackToTop scrollY={scrollY} />
      <AIChatbot />
    </div>
  );
}
