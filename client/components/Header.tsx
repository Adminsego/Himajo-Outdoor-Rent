import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full">
      <div className="bg-brand-gray-dark h-9 flex items-center justify-end px-6 md:px-20">
        <p className="text-white text-[11px] tracking-[1.8px]">
          <span className="font-bold">WA 08133-357-1793</span> - OPEN 24 HOURS
        </p>
      </div>
      
      <div className="bg-black h-[69px] flex items-center justify-between px-6 md:px-20">
        <Link to="/" className="text-white font-bold text-[14px] md:text-[17px] tracking-[2.7px]">
          HIMAJO OUTDOOR RENT+
        </Link>
        
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <nav className="hidden md:flex items-center gap-8">
          <NavLink
            to="/"
            className={({ isActive }) => `${isActive ? "text-brand-green" : "text-white hover:text-brand-green"} text-[14px] transition-colors`}
          >
            HOME
          </NavLink>
          <NavLink
            to="/info"
            className={({ isActive }) => `${isActive ? "text-brand-green" : "text-white hover:text-brand-green"} text-[14px] transition-colors`}
          >
            INFO
          </NavLink>
          <NavLink
            to="/featured"
            className={({ isActive }) => `${isActive ? "text-brand-green" : "text-white hover:text-brand-green"} text-[14px] transition-colors`}
          >
            FEATURED
          </NavLink>
          <NavLink
            to="/help"
            className={({ isActive }) => `${isActive ? "text-brand-green" : "text-white hover:text-brand-green"} text-[14px] transition-colors`}
          >
            BANTUAN
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) => `${isActive ? "text-brand-green" : "text-white hover:text-brand-green"} text-[14px] transition-colors`}
          >
            REGISTER
          </NavLink>
        </nav>
        
        <Link to="/products" className="hidden md:block border border-white bg-transparent text-white px-10 py-2.5 text-[13px] tracking-[0.7px] hover:bg-white hover:text-black transition-colors">
          PRICELIST
        </Link>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <nav className="flex flex-col px-6 py-4 space-y-4">
            <NavLink
              to="/"
              className={({ isActive }) => `${isActive ? "text-brand-green" : "text-white hover:text-brand-green"} text-[14px] transition-colors`}
              onClick={() => setMobileMenuOpen(false)}
            >
              HOME
            </NavLink>
            <NavLink
              to="/info"
              className={({ isActive }) => `${isActive ? "text-brand-green" : "text-white hover:text-brand-green"} text-[14px] transition-colors`}
              onClick={() => setMobileMenuOpen(false)}
            >
              INFO
            </NavLink>
            <NavLink
              to="/featured"
              className={({ isActive }) => `${isActive ? "text-brand-green" : "text-white hover:text-brand-green"} text-[14px] transition-colors`}
              onClick={() => setMobileMenuOpen(false)}
            >
              FEATURED
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) => `${isActive ? "text-brand-green" : "text-white hover:text-brand-green"} text-[14px] transition-colors`}
              onClick={() => setMobileMenuOpen(false)}
            >
              REGISTER
            </NavLink>
            <Link
              to="/products"
              className="border border-white bg-transparent text-white px-10 py-2.5 text-[13px] tracking-[0.7px] hover:bg-white hover:text-black transition-colors text-left"
              onClick={() => setMobileMenuOpen(false)}
            >
              PRICELIST
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
