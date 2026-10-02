
// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// // 🔧 Apna image asset import karo
// import meImg from "../assets/me.jpeg";
// import vsl from '../assets/vsl.mp4';
// gsap.registerPlugin(ScrollTrigger);

// export default function About() {
//   const sectionRef = useRef(null);
//   const textRef = useRef(null);
//   const wordsRef = useRef([]);

//   const aboutText = "I turn ideas into intelligent, automated systems that drive real business results, blending full-stack engineering with AI to help businesses work smarter, faster and scale ";
//   const words = aboutText.split(" ");

//   useEffect(() => {
//     let ctx = gsap.context(() => {
      
//       // 1. TEXT REVEAL ANIMATION (Yeh chalegi)
//       gsap.to(wordsRef.current, {
//         opacity: 1,
//         stagger: 0.1, 
//         scrollTrigger: {
//           trigger: textRef.current,
//           start: "top 80%", 
//           end: "bottom 50%", 
//           scrub: 1, 
//         },
//       });

//       // 🔥 Image Parallax Animation yahan se poori tarah remove kar di gayi hai

//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     // 🔥 Yahan rounded-b-[32px] md:rounded-b-[40px] lg:rounded-b-[48px] add kiya hai
//     <section
//       id="about" 
//       ref={sectionRef} 
//       className="relative z-10 w-full bg-black text-white py-32 px-6 md:py-48 md:px-12 font-sans flex justify-center overflow-hidden shadow-2xl rounded-b-[32px] md:rounded-b-[40px] lg:rounded-b-[48px]"
//     >
//       <div className="w-full max-w-[1400px] flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16 lg:gap-20">
        
//         {/* LEFT SIDE: TEXT REVEAL */}
//         <div ref={textRef} className="w-full md:w-[65%] lg:w-[70%]">
//           <h2 className="text-[26px] sm:text-[36px] md:text-[4.5vw] font-medium leading-[1.05] tracking-tight">
//             {words.map((word, i) => (
//               <React.Fragment key={i}>
//                 <span
//                   ref={(el) => (wordsRef.current[i] = el)}
//                   className="opacity-20 inline-block"
//                 >
//                   {word}
//                 </span>
//                 {i !== words.length - 1 && " "}
//               </React.Fragment>
//             ))}
//           </h2>
//         </div>

//         {/* RIGHT SIDE: NORMAL IMAGE (No Animation) */}
//         <div 
//           className="w-[50%] sm:w-[35%] md:w-[25%] lg:w-[20%] xl:w-[16%] aspect-[3/4] overflow-hidden rounded-[16px] bg-zinc-900 mt-10 md:mt-0 shrink-0"
//         >
//           <img
//             src={vsl}
//             alt="About Me"
//             // 🔥 Yahan h-[130%] ko change kar ke h-full kar diya hai taake image aaram se box mein fit aye
//             className="w-full h-full object-cover object-center origin-center"
//             draggable={false}
//           />a
//         </div>

//       </div>
//     </section>
//   );
// }
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import meImg from "../assets/me.jpeg";
import vsl from "../assets/vsl.mp4";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const wordsRef = useRef([]);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const aboutText =
    "I turn ideas into intelligent, automated systems that drive real business results, blending full-stack engineering with AI to help businesses work smarter, faster and scale ";
  const words = aboutText.split(" ");

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(wordsRef.current, {
        opacity: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          end: "bottom 50%",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch((err) => console.error("Play failed:", err));
    } else {
      video.pause();
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 w-full bg-black text-white py-32 px-6 md:py-48 md:px-12 font-sans flex justify-center overflow-hidden shadow-2xl rounded-b-[32px] md:rounded-b-[40px] lg:rounded-b-[48px]"
    >
      <div className="w-full max-w-[1400px] flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16 lg:gap-20">
        {/* LEFT SIDE: TEXT REVEAL */}
        <div ref={textRef} className="w-full md:w-[65%] lg:w-[70%]">
          <h2 className="text-[26px] sm:text-[36px] md:text-[4.5vw] font-medium leading-[1.05] tracking-tight">
            {words.map((word, i) => (
              <React.Fragment key={i}>
                <span
                  ref={(el) => (wordsRef.current[i] = el)}
                  className="opacity-20 inline-block"
                >
                  {word}
                </span>
                {i !== words.length - 1 && " "}
              </React.Fragment>
            ))}
          </h2>
        </div>

        {/* RIGHT SIDE: VIDEO (click to play/pause) */}
        <div
          onClick={togglePlay}
          className="relative cursor-pointer w-[50%] sm:w-[35%] md:w-[25%] lg:w-[20%] xl:w-[16%] aspect-[3/4] overflow-hidden rounded-[16px] bg-zinc-900 mt-10 md:mt-0 shrink-0"
        >
          <video
            ref={videoRef}
            src={vsl}
            
            playsInline
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            className="w-full h-full object-cover object-center"
          />

          {/* Play icon overlay: sirf pause hone par dikhega */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity">
              <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 ml-1 text-black"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}