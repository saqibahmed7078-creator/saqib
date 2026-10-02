
import React from 'react';
// 🎯 FIX: Naye Lenis version mein import ka tareeqa yeh hai
import { ReactLenis } from 'lenis/react';
import Skill from './pages/Skill';
import Hero from './pages/Hero';
import Work from './pages/Work';
import WorkedWith from './pages/WorkedWith';
import About from './pages/About';
import Footer from './pages/Footer';

function App() {
  return (
    // 🪄 root prop se yeh poori website par lag jayega
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothTouch: false }}>
      
      <div className="bg-black min-h-screen">
        <Hero />
        <About />
        <Work />
        <WorkedWith />
        <Skill />
        <Footer />
      </div>

    </ReactLenis>
  );
}

export default App;