import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isGoldPixel, goldifyCanvas } from '../utils/goldRecolor.js';

const HOTSPOTS = [
  { label: 'ABOUT ME', to: '/', scrollTo: 'about-us', left: '2%', top: '50%', width: '10%', height: '48%' },
  { label: 'GALLERY', to: '/gallery', left: '12%', top: '20%', width: '5%', height: '75%' },
  { label: 'MEDIA', to: '/media', left: '17%', top: '50%', width: '7%', height: '45%' },
  { label: 'OUR TEAM', to: '/team', left: '22%', top: '30%', width: '8%', height: '22%' },
  { label: 'OUR SERVICES', to: '/services', left: '32%', top: '6.5%', width: '10%', height: '84.5%' },
  { label: 'CONTACT US', to: '/contact', left: '46%', top: '30%', width: '4%', height: '40%', tip: 'end' },
  { label: 'ABOUT US', to: '/', scrollTo: 'about-us', left: '51.5%', top: '50%', width: '9%', height: '40%' },
  { label: 'GALLERY', to: '/gallery', left: '61%', top: '20%', width: '5%', height: '70%' },
  { label: 'MEDIA', to: '/media', left: '66%', top: '50%', width: '7%', height: '42%' },
  { label: 'OUR TEAM', to: '/team', left: '71%', top: '30%', width: '8%', height: '22%' },
  { label: 'OUR SERVICES', to: '/services', left: '80%', top: '6.5%', width: '10%', height: '84.5%' },
  { label: 'CONTACT US', to: '/contact', left: '94.5%', top: '30%', width: '5%', height: '40%', tip: 'end' },
];

function StreetCopy() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(-1);
  const [processed, setProcessed] = useState(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const process = () => {
      const canvas = goldifyCanvas(img);
      setProcessed(canvas.toDataURL('image/png'));
    };

    if (img.complete && img.naturalWidth) process();
    else img.addEventListener('load', process, { once: true });
  }, []);

  const regionStyle = (h) => {
    const w = parseFloat(h.width);
    const ht = parseFloat(h.height);
    const l = parseFloat(h.left);
    const t = parseFloat(h.top);
    return {
      width: `${(100 / w) * 100}%`,
      height: `${(100 / ht) * 100}%`,
      left: `${(-l / w) * 100}%`,
      top: `${(-t / ht) * 100}%`,
    };
  };

  return (
    <div className="street-copy">
      <img
        ref={imgRef}
        src="/dhruva-street.png"
        alt="Dhruva wedding street illustration"
        draggable="false"
      />
      {HOTSPOTS.map((h, i) => (
        <button
          key={h.label + i}
          type="button"
          className={`hotspot ${hovered === i ? 'hotspot-hover' : ''}`}
          style={{ left: h.left, top: h.top, width: h.width, height: h.height }}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(-1)}
          onFocus={() => setHovered(i)}
          onBlur={() => setHovered(-1)}
          onClick={() => {
            if (h.scrollTo) {
              navigate(h.to);
              setTimeout(() => {
                document.getElementById(h.scrollTo)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }, 80);
            } else {
              navigate(h.to);
            }
          }}
          aria-label={h.label}
        >
          {processed && (
            <span className="hotspot-region" aria-hidden="true">
              <img src={processed} alt="" style={regionStyle(h)} draggable="false" />
            </span>
          )}
          <span className="hotspot-num">{i + 1}</span>
          <span className={`hotspot-tip ${h.tip || ''} ${hovered === i ? 'show' : ''}`}>{h.label}</span>
        </button>
      ))}
    </div>
  );
}

export default function StreetHero() {
  return (
    <section className="home">
      <div className="street-viewport">
        <div className="street-track">
          <StreetCopy />
          <StreetCopy />
        </div>
      </div>
    </section>
  );
}
