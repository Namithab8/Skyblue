import React, { useRef, useEffect } from 'react';
import StreetHero from '../components/StreetHero.jsx';
import WeddingCompany from '../components/WeddingCompany.jsx';
import WhyChooseDhruva from '../components/WhyChooseDhruva.jsx';
import HowItWorks from '../components/HowItWorks.jsx';

export default function Home() {
  const wrapRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el || !panelRef.current) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / total));
      const reveal = Math.min(1, p / 0.7);
      panelRef.current.style.transform = `translateY(${(1 - reveal) * 100}%)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <section className="scroll-wrap" ref={wrapRef}>
        <div className="scroll-stage">
          <div className="stage-street">
            <StreetHero />
          </div>
          <div className="stage-panel" ref={panelRef}>
            <WeddingCompany />
          </div>
        </div>
      </section>
      <WhyChooseDhruva />
      <HowItWorks />
    </>
  );
}
