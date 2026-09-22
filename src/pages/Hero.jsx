
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { gsap } from "gsap";

// 🔧 adjust these two import paths to wherever you keep your assets
import heroLines from "../assets/60285.jpg";
import menuBg from "../assets/menubackground.avif";

const EASE = [0.22, 1, 0.36, 1]; 

const transition = { 
  duration: 3, 
  ease: EASE 
};

const heroVariants = {
  closed: { x: "0%", y: "0%", rotate: 0, scale: 1 },
  open: { x: "50%", y: "12%", rotate: -9, scale: 0.82 },
};

// 🔥 FIX: Background ki movement (x: "-100%") hata di hai. 
// Ab yeh static rahega aur sirf pointerEvents toggle hongay taake jab hide ho toh click na ho.
const overlayVariants = {
  closed: { pointerEvents: "none" },
  open: { pointerEvents: "auto" },
};

const navListVariants = {
  closed: {},
  open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }, 
};

const navItemVariants = {
  closed: { opacity: 0, y: 24 },
  open: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const NAV_LINKS = ["Home", "Work", "About"];

function MenuIcon() {
  return (
    <span className="flex flex-col gap-[5px]" aria-hidden="true">
      <span className="h-[2px] w-5 bg-current" />
      <span className="h-[2px] w-3.5 bg-current" />
    </span>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const sectionRef = useRef(null);
  const headingWrapRef = useRef(null);
  const topBarRef = useRef(null);
  const subRef = useRef(null);
  const scrollDotRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const textOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const onKeyDown = (e) => e.key === "Escape" && setIsMenuOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(topBarRef.current, { y: -20, opacity: 0, duration: 1.2 }) 
        .from(
          headingWrapRef.current.children,
          { y: 40, opacity: 0, duration: 1.5, stagger: 0.3 }, 
          "-=0.3"
        )
        .from(subRef.current, { y: 20, opacity: 0, duration: 1.2 }, "-=0.4") 
        .from(scrollDotRef.current, { opacity: 0, duration: 1.2 }, "-=0.3"); 
    });
    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleNavClick = (e, label) => {
    e.preventDefault(); 
    setIsMenuOpen(false); 

    setTimeout(() => {
      const targetId = label.toLowerCase();
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 200);
  };

  return (
    <section id="home" ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* ---------- left overlay (Ab yeh piche fixed rahega) ---------- */}
      <motion.div
        variants={overlayVariants}
        animate={isMenuOpen ? "open" : "closed"}
        initial={false}
        aria-hidden={!isMenuOpen}
        className="absolute inset-0 z-10 flex flex-col bg-black"
      >
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${menuBg})` }}
        />

        <button
          type="button"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close menu"
          tabIndex={isMenuOpen ? 0 : -1}
          className="absolute top-2 left-6 md:top-10 md:left-10 z-20 flex w-fit items-center gap-2 text-base font-medium text-white hover:text-neutral-400 transition-colors"
        >
          <CloseIcon />
          Close
        </button>

        <motion.nav
          variants={navListVariants}
          animate={isMenuOpen ? "open" : "closed"}
          className="absolute top-[15%] left-[4%] md:left-[9%] z-20 flex flex-col gap-3 md:gap-4 border-l border-white/20 pl-6 md:pl-8"
        >
          {NAV_LINKS.map((label) => (
            <motion.a
              key={label}
              href={`#${label.toLowerCase()}`}
              variants={navItemVariants}
              tabIndex={isMenuOpen ? 0 : -1}
              onClick={(e) => handleNavClick(e, label)} 
              className="w-fit text-xl from-neutral-50 text-white transition-colors hover:text-neutral-400 md:text-xl"
            >
              {label}
            </motion.a>
          ))}
        </motion.nav>
      </motion.div>

      {/* ---------- main hero content ---------- */}
      <motion.div
        variants={heroVariants}
        animate={isMenuOpen ? "open" : "closed"}
        transition={transition}
        initial={false}
        className="relative z-20 flex h-full w-full flex-col bg-black"
      >
        <img
          src={heroLines}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 w-full h-full select-none object-cover opacity-20"
        />

        <div ref={topBarRef} className="relative z-10 flex items-center justify-between px-6 pt-6 md:px-10 md:pt-8">
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
            className="flex items-center gap-2 rounded-full px-2 py-2 text-sm font-medium transition-colors hover:bg-[#4e0074] md:text-base"
          >
            <MenuIcon />
            Menu
          </button>
          <span className="text-lg font-bold tracking-wide md:text-xl">S.A</span>
        </div>

        <motion.div
          style={{ opacity: textOpacity }}
          className="relative z-10 flex flex-1 flex-col justify-center px-6 md:px-16 lg:px-24"
        >
          <div ref={headingWrapRef}>
            <h1 className="text-4xl font-medium leading-tight text-neutral-400 sm:text-5xl md:text-6xl lg:text-7xl">
              Sup, I&apos;m <span className="font-extrabold text-white">Saqib Ahmed</span>
            </h1>
            <h1 className="text-4xl font-medium leading-tight text-neutral-400 sm:text-5xl md:text-6xl lg:text-7xl">
              I&apos;m{" "}
              <TypeAnimation
                sequence={[
                  "a bit nerdy.",
                  2000,
                  "fullstack engineer.",
                  2000,
                  "a tech enthusiast.",
                  2000,
                  "a designer.",
                  2000,
                  "creative.",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                deletionSpeed={65}
                repeat={Infinity}
                cursor
                className="text-neutral-300"
              />
            </h1>
          </div>

          <p ref={subRef} className="mt-6 max-w-md text-sm text-neutral-500 md:text-base">
            Passionately creating innovative digital experiences, rooted in user needs.
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute bottom-14 left-1/2 z-10 -translate-x-1/2 md:bottom-16"
        >
          <span
            ref={scrollDotRef}
            className="flex h-8 w-5 items-start justify-center rounded-full border border-neutral-400 p-1"
          >
            <motion.span
              animate={prefersReducedMotion ? {} : { y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-neutral-300"
            />
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}