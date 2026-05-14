import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ContactCard3D from './components/ContactCard3D';
import {
  Layout,
  Palette,
  Database,
  Terminal,
  Menu,
  X,
  Twitter,
  Linkedin,
  Dribbble,
  Instagram,
  Monitor,
  Zap,
  Shield,
  Code2
} from 'lucide-react';

import jobScoutImg from './pic1.png';
import priceCompareImg from '../pricecompare.jpeg';

const IMAGES = {
  dashboard: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmV9Z5BsCCj9RyTWwI2hoATJCs9dqsMgSFFMFPTt8O0XbL72rycxKCrQlQZHKBCdZ95n5mPOXu-HmmhlQTf9objcMCTSu3M_NRFQKJ7DJXkaVAsqgtGxwmjEjwE2l0f0L8TQ6J9vtIZmdNu4kb3VVfGtKLH_w_9CA29lZS3Fxm6tJSXOqiZPiZg43g-b7uKD0vBmZ9fEpDYMkZMyVTqRnYvBxzMFjYu76PxMDcfdeUKfWtfg63Mwn8BRP6s0SKpf7DG8bKpu-sdOnb',
  mobile: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDravfXmPLYfD8Uebv2XDArawWB_Z_lvNHIRGMSr-lhkFfJcZvpZjevzLUPCOBMyOxFs-6fC1D7q6GoSPM3aPU6z9ESquQPShiQdDwGLUe9WayJIeynoO01cckx3PUCtHE8NRcIFaib9vkwkOOqwLOAUXMOt5mMqrVKc5pXI7RF_Al6j46KVps4w7NxPjaQ75riRarxsorWitrcqS0Gjutoxh1MZjZ05mZuaBJd1sHKCCSTEabxWt7BXQ74ait4ziCfzbQrD5PLI7md',
  platform: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1yW72FQRRoGp95X2GGcIZOOx_tXxfJ9xIx4yyAAjqRoIypvrX00P6L7E2UwWFXuHF85ZDYZLtcsZ2GNWE7lhMncb23-QHNysrJRuM3fTDg9QCr4nYYs5rDWhpH3-wAlA7lAX8Lc8LhhmIzppKZU6tiYFJ_lRjzb7PyvuWiH-uHhlViM8A8FNKMv08m-t2LFD1LPJIVPisTyyUxHTfrMMfgWyEevn6bCpWM7w8L0speNNiz4OdeVAW-VDBw6g5EMx1eFwRMfqN8TPG',
  jobScout: jobScoutImg,
  priceGuard: priceCompareImg
};

const Navbar = () => {
   const [scrolled, setScrolled] = useState(false);
   const [isOpen, setIsOpen] = useState(false);

   useEffect(() => {
     const handleScroll = () => setScrolled(window.scrollY > 20);
     window.addEventListener('scroll', handleScroll);
     return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   // Lock body scroll when mobile menu is open
   useEffect(() => {
     if (isOpen) {
       document.body.style.overflow = 'hidden';
     } else {
       document.body.style.overflow = '';
     }
     return () => { document.body.style.overflow = ''; };
   }, [isOpen]);

   // Close menu on Escape key
   useEffect(() => {
     const handleEsc = (e: KeyboardEvent) => {
       if (e.key === 'Escape' && isOpen) setIsOpen(false);
     };
     window.addEventListener('keydown', handleEsc);
     return () => window.removeEventListener('keydown', handleEsc);
   }, [isOpen]);

   const navLinks = [
     { name: 'WORKS', href: '#works' },
     { name: 'PROCESS', href: '#process' },
     { name: 'PHILOSOPHY', href: '#philosophy' },
     { name: 'CONTACT', href: '#contact' },
   ];

   return (
     <nav className={`fixed top-0 w-full z-[60] transition-all duration-500 border-b ${scrolled ? 'bg-surface-base/80 backdrop-blur-2xl border-outline-dim py-4 shadow-2xl' : 'bg-transparent border-transparent py-6'}`}>
       <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
         <motion.span
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           className="font-display text-xl md:text-3xl text-brand-primary tracking-tighter cursor-pointer"
         >
           AYNA VISION
         </motion.span>

         <div className="hidden md:flex gap-10 items-center">
           {navLinks.map((link, i) => (
             <motion.a
               key={link.name}
               href={link.href}
               initial={{ opacity: 0, y: -10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="font-sans text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-brand-primary transition-colors relative group py-2 px-3 cursor-pointer"
             >
               {link.name}
               <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-primary transition-all duration-300 group-hover:w-full" />
             </motion.a>
           ))}
<motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-brand-primary text-brand-on-primary px-8 py-3 font-sans text-xs font-bold rounded-sm tracking-widest uppercase cursor-pointer"
            >
              Tell us what to build
            </motion.button>
         </div>

<button
            className="md:hidden text-brand-primary p-2 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
           {isOpen ? <X size={28} /> : <Menu size={28} />}
         </button>
       </div>

       <AnimatePresence>
         {isOpen && (
           <motion.div
             id="mobile-menu"
             initial={{ opacity: 0, height: 0 }}
             animate={{ opacity: 1, height: 'auto' }}
             exit={{ opacity: 0, height: 0 }}
             className="md:hidden bg-surface-base border-b border-outline-dim overflow-hidden"
           >
             <div className="flex flex-col p-8 gap-6" onClick={() => setIsOpen(false)}>
               {navLinks.map((link) => (
<a
                    key={link.name}
                    href={link.href}
                    className="text-lg font-display uppercase tracking-widest text-on-surface py-2 cursor-pointer"
                  >
                    {link.name}
                  </a>
                ))}
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-brand-primary text-brand-on-primary px-8 py-4 font-sans text-xs font-bold rounded-sm tracking-widest uppercase w-full text-center cursor-pointer"
                >
                 Tell us what to build
               </button>
             </div>
             {/* Backdrop dismiss overlay */}
             <div
               className="fixed inset-0 z-[-1]"
               onClick={() => setIsOpen(false)}
               aria-hidden="true"
             />
           </motion.div>
         )}
       </AnimatePresence>
     </nav>
   );
 };

const Hero = () => {
   return (
     <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-6 overflow-hidden scroll-mt-[72px]" id="hero">
       <div className="light-bloom top-[-200px] left-[-200px]" />
       <div className="light-bloom bottom-[-200px] right-[-200px] opacity-40" />

       <div className="max-w-5xl text-center relative z-10">
         <motion.h1
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="font-display text-4xl sm:text-5xl md:text-8xl text-on-surface tracking-tighter leading-[1.15] mb-6"
         >
           THE FUTURE,<br /> <span className="italic font-normal text-on-surface-variant font-display">REFLECTED</span> TODAY.
         </motion.h1>

         <motion.p
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
           className="font-sans text-base sm:text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed"
         >
           We build websites, web applications, browser extensions, and digital systems designed to feel clear, fast, and genuinely useful.
         </motion.p>

         <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, delay: 0.4 }}
           className="flex flex-col sm:flex-row gap-4 justify-center items-center"
         >
           <button
             onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
             className="w-full sm:w-auto bg-brand-primary text-brand-on-primary px-10 py-5 font-sans text-sm font-bold tracking-widest uppercase hover:shadow-[0_0_30px_rgba(242,202,80,0.4)] hover:scale-105 active:scale-95 transition-all duration-500 rounded-none cursor-pointer min-h-[48px]"
           >
             Tell us what to build
           </button>
           <button
             onClick={() => document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })}
             className="w-full sm:w-auto border border-outline-dim text-on-surface px-10 py-5 font-sans text-sm font-bold tracking-widest uppercase backdrop-blur-lg hover:bg-white/5 hover:scale-105 active:scale-95 transition-all duration-500 rounded-none cursor-pointer min-h-[48px]"
           >
             View Showcase
           </button>
         </motion.div>
       </div>

       {/* Mobile: single stacked preview */}
       <div className="block sm:hidden mt-12 relative w-full max-w-sm mx-auto h-[400px]">
         <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, delay: 0.8 }}
           className="glass-panel p-3 rounded-2xl perspective-card overflow-hidden w-full h-full"
         >
           <img src={IMAGES.platform} alt="Platform preview" className="w-full h-full object-cover rounded-xl" loading="lazy" />
         </motion.div>
       </div>

       {/* Desktop: multi-card layout */}
       <div className="hidden sm:block mt-20 relative w-full max-w-6xl h-[300px] md:h-[450px]">
         <motion.div
           initial={{ opacity: 0, x: -50, rotateY: 20 }}
           animate={{ opacity: 1, x: 0, rotateY: 10 }}
           transition={{ duration: 1.2, delay: 0.6 }}
           className="absolute left-[5%] md:left-[10%] top-0 w-64 md:w-80 h-40 md:h-52 glass-panel p-3 rounded-xl perspective-card overflow-hidden"
         >
           <img src={IMAGES.dashboard} alt="Dashboard UI" className="w-full h-full object-cover rounded-lg" loading="lazy" />
         </motion.div>

         <motion.div
           initial={{ opacity: 0, x: 50, rotateY: -20 }}
           animate={{ opacity: 1, x: 0, rotateY: -10 }}
           transition={{ duration: 1.2, delay: 0.8 }}
           className="absolute right-[5%] md:right-[10%] top-10 w-80 md:w-96 h-48 md:h-64 glass-panel p-3 rounded-xl perspective-card overflow-hidden z-20"
         >
           <img src={IMAGES.mobile} alt="Mobile App UI" className="w-full h-full object-cover rounded-lg" loading="lazy" />
         </motion.div>

         <motion.div
           initial={{ opacity: 0, y: 100 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.2, delay: 0.7 }}
           className="absolute left-1/2 -translate-x-1/2 top-10 sm:top-24 w-[90%] sm:w-[500px] h-60 md:h-80 glass-panel p-3 rounded-xl perspective-card z-10 overflow-hidden"
         >
           <img src={IMAGES.platform} alt="Platform Mockup" className="w-full h-full object-cover rounded-lg" loading="lazy" />
         </motion.div>
       </div>
     </section>
   );
 };

const Projects = () => {
   return (
<section id="works" className="py-14 sm:py-24 bg-surface-base scroll-mt-[72px]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-10 sm:mb-16">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
               className="font-display text-3xl sm:text-4xl md:text-5xl mb-6 tracking-tight"
            >
              SELECTED WORKS
            </motion.h2>
          </div>

          {/* Project 1 - JobScout (Browser Focused) */}
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-16 mb-12 lg:mb-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2"
            >
{/* Scrolling Frame for Browser Screenshot */}
                <div className="group/card overflow-hidden rounded-2xl perspective-card relative h-auto">
                  <div className="relative aspect-[16/10]">
<motion.img
                      src={IMAGES.jobScout}
                      alt="JobScout Full UI"
                      className="w-full"
                      whileHover={{ y: '-35%' }}
                      transition={{ duration: 3.5, ease: "easeInOut" }}
                      loading="lazy"
                    />
                   {/* Browser-like Header */}
                   <div className="absolute top-0 w-full h-8 bg-surface-container-highest/80 border-b border-outline-dim flex items-center px-4 gap-1.5 z-20">
                     <div className="w-2 h-2 rounded-full bg-red-400/50" />
                     <div className="w-2 h-2 rounded-full bg-yellow-400/50" />
                     <div className="w-2 h-2 rounded-full bg-green-400/50" />
                   </div>
                 </div>
               </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2"
            >
              <span className="text-brand-primary font-sans text-xs font-bold tracking-widest uppercase mb-6 block">JobScout</span>
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl mb-4 leading-tight">ELITE RECRUITMENT<br />SYSTEM</h3>
<p className="font-sans text-sm sm:text-base text-on-surface-variant mb-6 max-w-xl leading-relaxed">
                 A full-scale professional platform engineered for high-volume recruitment. Every interaction is optimized for speed, precision, and developer-centric aesthetics. Hover to explore the full interface depth.
               </p>
            </motion.div>
          </div>

          {/* Project 2 - PriceGuard (Web/Extension Focused) */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-8 md:gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2"
            >
{/* Scrolling Frame for Web Screenshot */}
                <div className="group/card overflow-hidden rounded-2xl perspective-card relative h-auto">
                  <div className="relative aspect-[16/10]">
<motion.img
                      src={IMAGES.priceGuard}
                      alt="PriceGuard Full UI"
                      className="w-full"
                      whileHover={{ y: '-35%' }}
                      transition={{ duration: 3.5, ease: "easeInOut" }}
                      loading="lazy"
                    />
                   {/* Browser-like Header */}
                   <div className="absolute top-0 w-full h-8 bg-surface-container-highest/80 border-b border-outline-dim flex items-center px-4 gap-1.5 z-20">
                     <div className="w-2 h-2 rounded-full bg-red-400/50" />
                     <div className="w-2 h-2 rounded-full bg-yellow-400/50" />
                     <div className="w-2 h-2 rounded-full bg-green-400/50" />
                   </div>
                 </div>
               </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 lg:text-right flex flex-col lg:items-end"
            >
              <span className="text-brand-primary font-sans text-xs font-bold tracking-widest uppercase mb-6 block">PriceGuard</span>
<h3 className="font-display text-2xl sm:text-3xl md:text-4xl mb-4 leading-tight">REAL-TIME <br />PRICE COMPARISON<br />ACROSS TOP<br /> E-COMMERCE SITES</h3>
               <p className="font-sans text-sm sm:text-base text-on-surface-variant mb-6 max-w-xl leading-relaxed">
                Browser extension that provides real-time price comparison for top Bangladesh e-commerce sites. Built with a bespoke scraping engine and a seamless floating UI. Hover to view the full interface depth.
</p>
            </motion.div>
          </div>
       </div>
     </section>
   );
 };

const Capabilities = () => {
    const coreServices = [
      { icon: <Monitor />, title: 'Web Applications', desc: 'Dashboards, SaaS platforms, admin panels built for real use.' },
      { icon: <Code2 />, title: 'Website Design', desc: 'Clean, responsive websites built with clarity, speed, and modern user experience in mind.' },
      { icon: <Palette />, title: 'WordPress', desc: 'Custom themes, plugins, and WordPress websites built your way.' },
      { icon: <Database />, title: 'Data Manipulation and Web Scraping', desc: 'Extraction systems and pipelines that collect and structure data reliably.' },
      { icon: <Layout />, title: 'Dashboard Design', desc: 'Data-heavy interfaces, admin panels, and visualization systems.' },
      { icon: <Shield />, title: 'Database Systems', desc: 'Structuring, optimization, and reliable data storage.' },
      { icon: <Zap />, title: 'Browser Extensions', desc: 'Tools that live in your browser and actually help with daily work.' },
      { icon: <Terminal />, title: 'Internal Tools', desc: 'Custom software for business workflows and operations.' },
      { icon: <Shield />, title: 'Maintenance', desc: 'Keeping your software running smoothly and up to date.' },
    ];

    return (
      <section id="capabilities" className="py-20 sm:py-32 bg-surface-base relative scroll-mt-[72px]">
       <div className="max-w-7xl mx-auto px-6 md:px-12">
         <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-center mb-16 sm:mb-24 tracking-tight">STUDIO CAPABILITIES</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
           {coreServices.map((service, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="glass-panel p-6 sm:p-8 group hover:border-brand-primary/40 transition-all duration-700 will-change-transform"
             >
               <div className="text-brand-primary mb-6 group-hover:scale-110 transition-transform duration-500 flex-shrink-0">
                 {service.icon}
               </div>
               <h4 className="font-display text-lg sm:text-xl mb-3 text-on-surface">{service.title}</h4>
               <p className="font-sans text-sm sm:text-base text-on-surface-variant leading-relaxed">{service.desc}</p>
             </motion.div>
           ))}
         </div>
       </div>
     </section>
   );
 };

const Blueprint = () => {
    const steps = [
      {
        id: '01',
        label: 'DISCOVERY',
        title: 'Learn the problem',
        desc: 'Before writing code, we try to understand where the friction actually comes from.',
        active: true
      },
      {
        id: '02',
        label: 'ARCHITECTURE',
        title: 'Build to last',
        desc: 'We design systems that stay maintainable as they grow — not just systems that look good in screenshots.',
        active: false
      },
      {
        id: '03',
        label: 'EXECUTION',
        title: 'Ship clean code',
        desc: 'Clean, working code is still the point.',
        active: false
      }
    ];

    return (
      <section id="process" className="py-20 sm:py-32 bg-surface-base scroll-mt-[72px]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-12 lg:gap-20">
          <div className="w-full lg:w-1/3">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl sm:text-4xl md:text-5xl mb-6 tracking-tight"
            >
              THE BLUEPRINT
            </motion.h2>
            <p className="font-sans text-base sm:text-lg text-on-surface-variant leading-relaxed">
              Our methodical approach ensures every project is delivered with surgical precision.
            </p>
          </div>

          <div className="w-full lg:w-2/3 border-l border-outline-dim pl-6 sm:pl-12 space-y-16 sm:space-y-24 relative">
            {steps.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative pl-4 sm:pl-0"
              >
                <div className="absolute -left-[26px] sm:-left-[54px] top-1 w-3 h-3 rounded-full transition-all duration-500 bg-brand-primary animate-pulse shadow-[0_0_15px_#f2ca50]" />
                <span className="text-brand-primary font-sans text-xs font-bold tracking-widest uppercase block mb-3 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(242,202,80,0.3)]">
  {step.id} {step.label}
</span>
                <h4 className="font-display text-xl sm:text-2xl mb-3">{step.title}</h4>
                <p className="font-sans text-sm sm:text-base text-on-surface-variant max-w-lg leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

const Manifesto = () => {
   return (
     <section id="philosophy" className="py-28 sm:py-48 bg-surface-base relative overflow-hidden text-center scroll-mt-[72px]">
       <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_50%_50%,#f2ca50_0%,transparent_50%)]" />
       <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
         <motion.span
           initial={{ opacity: 0, y: 10 }}
           whileInView={{ opacity: 1, y: 0 }}
           className="text-brand-primary font-sans text-xs font-bold tracking-[0.3em] uppercase block mb-10"
         >
           THE MANIFESTO
         </motion.span>
         <motion.h3
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           className="font-display text-4xl sm:text-5xl md:text-8xl leading-tight mb-16 sm:mb-20 tracking-tighter"
         >
           USEFUL OVER <span className="italic font-normal">NOISY.</span>
         </motion.h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 text-left text-on-surface-variant font-sans text-base sm:text-lg md:text-xl leading-relaxed">
           <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}>
             Most digital products become louder long before they become useful.

              We prefer interfaces that stay clear under complexity. Systems that stay fast. Tools people return to because they work — not because they demand attention.
           </motion.p>
           <motion.p initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}>
             We'd rather build one thing carefully than five things halfway. That's probably the simplest way to describe how we think.
           </motion.p>
         </div>
       </div>
     </section>
   );
 };

const Contact = () => {
    const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    return (
      <section id="contact" className="py-8 sm:py-12 bg-surface-base scroll-mt-[72px]">
        <div className="max-w-4xl mx-auto px-6">
          {/* Hero Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl mb-4 tracking-tight">Let's work together</h2>
            <p className="text-on-surface-variant font-sans text-sm sm:text-base max-w-sm mx-auto leading-relaxed">
              We're currently accepting new projects. Reach out and let's create something exceptional.
            </p>
          </motion.div>

          {/* 3D Interactive Contact Card - Moved up for immediate visibility */}
          <div className="flex justify-center mb-4 sm:mb-8">
 <ContactCard3D
                 email1="sourav4068@gmail.com"
                 phone1="+88 01868638717"
                 email2="ferdousprince24@gmail.com"
                 phone2="+88 01720678376"
               />
          </div>

            {/* Contact Form */}
            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="glass-panel p-8 sm:p-12 md:p-16 rounded-none mb-8 sm:mb-12"
              >
                {formState === 'success' ? (
                  <div className="text-center py-12">
                    <p className="text-brand-primary text-xl font-sans tracking-wide">Message sent!</p>
                    <p className="text-on-surface-variant mt-4 font-sans">We'll be in touch soon.</p>
                  </div>
                ) : formState === 'loading' ? (
                  <div className="text-center py-12">
                    <p className="text-on-surface-variant text-lg font-sans">Sending...</p>
                  </div>
                ) : formState === 'error' ? (
                  <div className="text-center py-12">
                    <p className="text-red-500 text-lg font-sans">Something went wrong. Please try again.</p>
                  </div>
                ) : (
                <form className="space-y-8 sm:space-y-10" onSubmit={async (e) => {
                  e.preventDefault();
                  setFormState('loading');
                  const formData = new FormData(e.currentTarget);
                  formData.append('access_key', '0dade25a-eb90-4499-b49a-f2904e623d2d');

                  const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                  });
                  const data = await response.json();
                  if (data.success) {
                    setFormState('success');
                    e.currentTarget.reset();
                  } else {
                    setFormState('error');
                  }
                }}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="relative group">
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="NAME"
                        className="w-full bg-transparent border-b border-outline-dim focus:border-brand-primary outline-none py-4 transition-all duration-500 placeholder:text-on-surface-variant/30 font-sans tracking-widest text-sm text-on-surface min-h-[48px]"
                      />
                    </div>
                    <div className="relative group">
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="EMAIL"
                        className="w-full bg-transparent border-b border-outline-dim focus:border-brand-primary outline-none py-4 transition-all duration-500 placeholder:text-on-surface-variant/30 font-sans tracking-widest text-sm text-on-surface min-h-[48px]"
                      />
                    </div>
                    <div className="relative group">
                      <input
                        type="tel"
                        name="phone"
                        placeholder="PHONE"
                        className="w-full bg-transparent border-b border-outline-dim focus:border-brand-primary outline-none py-4 transition-all duration-500 placeholder:text-on-surface-variant/30 font-sans tracking-widest text-sm resize-none text-on-surface min-h-[48px]"
                      />
                    </div>
                  </div>
                  <div className="relative group">
                    <textarea
                      name="message"
                      required
                      placeholder="PROJECT DETAILS"
                      rows={4}
                      className="w-full bg-transparent border-b border-outline-dim focus:border-brand-primary outline-none py-4 transition-all duration-500 placeholder:text-on-surface-variant/30 font-sans tracking-widest text-sm resize-none text-on-surface min-h-[48px]"
                    />
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-brand-primary text-brand-on-primary px-12 py-6 font-sans text-xs font-bold tracking-widest uppercase hover:scale-105 hover:shadow-[0_0_30px_rgba(242,202,80,0.4)] active:scale-95 transition-all duration-500 cursor-pointer min-h-[48px] w-full sm:w-auto"
                    >
                      Send message
                    </button>
                    <p className="mt-6 text-on-surface-variant text-xs font-sans tracking-widest opacity-50">
                      Usually responds within 24 hours
                    </p>
                  </div>
                </form>
                )}
              </motion.div>
            </div>

          </div>
        </section>
      );
    };


const Footer = () => {
   return (
     <footer className="py-16 sm:py-20 bg-surface-base border-t border-outline-dim/30">
       <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
         <div className="flex flex-col items-center md:items-start gap-3">
           <span className="font-display text-2xl sm:text-3xl text-brand-primary tracking-tighter">AYNA VISION</span>
           <p className="text-on-surface-variant text-xs sm:text-sm font-sans opacity-60 text-center md:text-left">
             © 2026 AYNA VISION. THE FUTURE, REFLECTED TODAY.
           </p>
         </div>

         <div className="flex gap-8">
           <a href="#" className="text-on-surface-variant hover:text-brand-primary transition-colors p-1" aria-label="Twitter"><Twitter size={20} /></a>
           <a href="#" className="text-on-surface-variant hover:text-brand-primary transition-colors p-1" aria-label="LinkedIn"><Linkedin size={20} /></a>
           <a href="#" className="text-on-surface-variant hover:text-brand-primary transition-colors p-1" aria-label="Dribbble"><Dribbble size={20} /></a>
           <a href="#" className="text-on-surface-variant hover:text-brand-primary transition-colors p-1" aria-label="Instagram"><Instagram size={20} /></a>
         </div>
       </div>
     </footer>
   );
 };

export default function App() {
   return (
     <div className="relative min-h-screen bg-surface-base" style={{ overscrollBehaviorY: 'contain', scrollBehavior: 'smooth' }}>
       <div className="grain-overlay" />
       <Navbar />
       <main>
         <Hero />
         <Projects />
         <Capabilities />
         <Blueprint />
         <Manifesto />
         <Contact />
       </main>
       <Footer />
     </div>
   );
 }
