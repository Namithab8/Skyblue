import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const NAV = [
  ['HOME', '/'],
  ['OUR TEAM', '/team'],
  ['OUR SERVICES', '/services'],
  ['GALLERY', '/gallery'],
  ['MEDIA', '/media'],
  ['CONTACT US', '/contact'],
];

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="header">
      <button
        className="brand"
        onClick={() => { window.location.href = '/'; }}
        aria-label="Dhruva home"
      >
        <img src="/image.png" alt="Weddings by Dhruva" />
      </button>
      <nav className="nav-list">
        {NAV.map(([name, to]) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => (isActive ? 'nav active' : 'nav')}
          >
            {name}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
