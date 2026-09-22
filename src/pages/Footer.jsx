
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const footerContentRef = useRef(null);

  // 🔥 Smooth Scroll Function for Menu Links
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Reveal Animation
      gsap.fromTo(
        footerContentRef.current,
        { yPercent: -30 }, 
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom", 
            end: "bottom bottom", 
            scrub: true, 
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative z-0 w-full bg-white text-black overflow-hidden"
    >
      <div 
        ref={footerContentRef} 
        className="w-full pt-10 pb-6 px-6 md:px-12 flex flex-col justify-between"
      >
        <div className="w-full max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
          
          {/* E.L. LOGO */}
          <div className="w-full md:w-auto flex-shrink-0">
            <h1 className="text-[60px] md:text-[80px] lg:text-[90px] font-bold leading-[0.85] tracking-tighter text-black">
              S.A.
            </h1>
          </div>

          {/* LINKS & CREDITS COLUMNS */}
          <div className="flex flex-wrap sm:flex-nowrap gap-8 sm:gap-10 lg:gap-16 w-full md:w-auto justify-between md:justify-end mt-4 md:mt-0">
            
            {/* CREDITS */}
            <div className="flex flex-col space-y-2">
              <span className="text-gray-500 text-xs md:text-sm font-medium">Credits</span>
              <span className="text-[#56147D] font-medium text-[14px] md:text-[15px]">© S.A. - 2026</span>
            </div>

            {/* MENU */}
            <div className="flex flex-col space-y-2">
              <span className="text-gray-500 text-xs md:text-sm font-medium">Menu</span>
              <nav className="flex flex-col space-y-1 text-[14px] md:text-[15px] font-medium">
                {/* 🔥 Proper section IDs with smooth scroll handler */}
                <a href="#home" onClick={(e) => handleNavClick(e, "home")} className="hover:text-gray-500 transition-colors">Home</a>
                <a href="#work" onClick={(e) => handleNavClick(e, "work")} className="hover:text-gray-500 transition-colors">Work</a>
                <a href="#about" onClick={(e) => handleNavClick(e, "about")} className="hover:text-gray-500 transition-colors">About</a>
              </nav>
            </div>

            {/* CONTACT */}
            <div className="flex flex-col space-y-2">
              <span className="text-gray-500 text-xs md:text-sm font-medium">Contact</span>
              <nav className="flex flex-col space-y-1 text-[14px] md:text-[15px] font-medium">
                {/* 🔥 Updated Contact Links */}
                
                <a href="tel:+923012584496" className="hover:text-gray-500 transition-colors">Phone</a>
                <a href="mailto:saqibahmed7078@gmail.com" className="hover:text-gray-500 transition-colors">Email</a>
              </nav>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}