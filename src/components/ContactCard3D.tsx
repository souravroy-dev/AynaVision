import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "motion/react";
import { Mail, Phone, X, ChevronRight, Check } from "lucide-react";

interface ContactCard3DProps {
  email1?: string;
  phone1?: string;
  email2?: string;
  phone2?: string;
}

export default function ContactCard3D({
  email1 = "your-email@example.com",
  phone1 = "+88 (XXX) XXX-XXXX",
  email2 = "your-alt-email@example.com",
  phone2 = "+88 (XXX) XXX-XXXX",
}: ContactCard3DProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateY = useTransform(mouseX, [-1, 1], [15, -15]);
  const rotateX = useTransform(mouseY, [-1, 1], [-15, 15]);

  const glowX = useTransform(mouseX, [-1, 1], ["30%", "70%"]);
  const glowY = useTransform(mouseY, [-1, 1], ["30%", "70%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(label);
      setTimeout(() => setCopied(null), 1500);
    });
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="group relative px-8 py-4 bg-transparent border border-outline-dim/50 text-on-surface font-sans text-sm tracking-widest uppercase overflow-hidden hover:border-brand-primary/60 transition-colors duration-500"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="relative z-10 flex items-center gap-3">
          Open Contact
          <ChevronRight
            size={16}
            className="group-hover:translate-x-1 transition-transform duration-300"
          />
        </span>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-brand-primary/0 via-brand-primary/5 to-brand-primary/0"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{
              background: "radial-gradient(ellipse at center, rgba(13,17,23,0.85), rgba(13,17,23,0.95))",
              backdropFilter: "blur(8px)",
            }}
            onClick={() => setIsOpen(false)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.4 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="absolute top-6 right-6 z-50 p-2 text-on-surface-variant hover:text-brand-primary transition-colors"
              aria-label="Close contact card"
            >
              <X size={28} strokeWidth={1.5} />
            </motion.button>

            <div className="perspective-3d">
              <motion.div
                ref={cardRef}
                initial={{ opacity: 0, scale: 0.8, rotateX: 15, rotateY: -15, y: 80 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0, rotateY: 0, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateX: -15, rotateY: 15, y: 80 }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
                  rotate: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
                  y: { type: "spring", stiffness: 150, damping: 15 },
                }}
                whileHover={{ scale: 1.02 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => e.stopPropagation()}
                style={{ rotateX, rotateY }}
                className="relative w-full max-w-xl origin-bottom"
              >
                <div
                  className="relative bg-surface-panel/60 backdrop-blur-xl border border-outline-dim/40 rounded-3xl p-8 md:p-14"
                  style={{
                    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 0 rgba(255,255,255,0.05)",
                  }}
                >
                  {/* Interactive glow */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none opacity-30 rounded-3xl"
                    style={{
                      background: `radial-gradient(600px circle at ${glowX} ${glowY}, rgba(242,202,80,0.15), transparent 40%)`,
                    }}
                  />

                  {/* Subtle noise texture */}
                  <div
                    className="absolute inset-0 opacity-[0.03] rounded-3xl pointer-events-none"
                    style={{
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
                      backgroundSize: "128px 128px",
                    }}
                  />

                  {/* Copied toast */}
                  <AnimatePresence>
                    {copied && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.9 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-primary/90 text-brand-on-primary text-xs font-sans font-bold tracking-widest uppercase shadow-lg backdrop-blur-md"
                      >
                        <Check size={14} />
                        {copied} copied!
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div style={{ translateZ: 30 }} className="relative z-10 text-center">
                    {/* Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="mb-10"
                    >
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                        className="inline-block px-4 py-1.5 bg-brand-primary/10 border border-brand-primary/20 rounded-full text-brand-primary text-xs tracking-[0.2em] uppercase mb-6"
                      >
                        Get in Touch
                      </motion.span>

                      <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="font-display text-3xl md:text-4xl text-on-surface mb-3 leading-tight tracking-tight"
                      >
                        Let{"'"}s Create
                        <br />
                        Something <span className="italic text-brand-primary">Exceptional</span>
                      </motion.h2>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="font-sans text-on-surface-variant text-sm md:text-base max-w-sm mx-auto leading-relaxed mt-4"
                      >
                        Ready to bring your vision to life? Reach out directly or
                        start a project.
                      </motion.p>
                    </motion.div>

                    {/* Contact links — grouped by person */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                      className="flex flex-col gap-5 mb-10"
                    >
                      {/* Person 1 */}
                      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                        <motion.a
                          href={"mailto:" + email1}
                          whileHover={{ y: -3, transition: { duration: 0.2 } }}
                          whileTap={{ scale: 0.97 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(email1, "Email 1");
                          }}
                          onAuxClick={(e) => {
                            e.stopPropagation();
                            handleCopy(email1, "Email 1");
                          }}
                          className="group flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-outline-dim/30 hover:border-brand-primary/40 transition-all duration-300 flex-1 cursor-pointer"
                        >
                          <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-brand-primary/10 text-brand-primary group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                            <Mail size={16} strokeWidth={1.5} />
                          </div>
                          <div className="relative flex flex-col items-start min-w-0">
                            <span className="text-[9px] text-on-surface-variant/60 uppercase tracking-widest mb-0.5">
                              Email
                            </span>
                            <span className="font-sans text-xs text-on-surface select-all group-hover:text-brand-primary transition-colors break-all">
                              {email1}
                            </span>
                          </div>
                          <motion.div
                            initial={{ opacity: 0, x: -8 }}
                            whileHover={{ opacity: 1, x: 0 }}
                            className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                          >
                            <ChevronRight size={12} className="text-on-surface-variant" />
                          </motion.div>
                        </motion.a>

                        <motion.a
                          href={"tel:" + phone1.replace(/[^0-9+]/g, "")}
                          whileHover={{ y: -3, transition: { duration: 0.2 } }}
                          whileTap={{ scale: 0.97 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(phone1, "Phone 1");
                          }}
                          onAuxClick={(e) => {
                            e.stopPropagation();
                            handleCopy(phone1, "Phone 1");
                          }}
                          className="group flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-outline-dim/30 hover:border-brand-primary/40 transition-all duration-300 flex-1 cursor-pointer"
                        >
                          <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-brand-primary/10 text-brand-primary group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                            <Phone size={16} strokeWidth={1.5} />
                          </div>
                          <div className="relative flex flex-col items-start min-w-0">
                            <span className="text-[9px] text-on-surface-variant/60 uppercase tracking-widest mb-0.5">
                              Phone
                            </span>
                            <span className="font-sans text-xs text-on-surface select-all group-hover:text-brand-primary transition-colors break-all">
                              {phone1}
                            </span>
                          </div>
                          <motion.div
                            initial={{ opacity: 0, x: -8 }}
                            whileHover={{ opacity: 1, x: 0 }}
                            className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                          >
                            <ChevronRight size={12} className="text-on-surface-variant" />
                          </motion.div>
                        </motion.a>
                      </div>

                      {/* Person 2 */}
                      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                        <motion.a
                          href={"mailto:" + email2}
                          whileHover={{ y: -3, transition: { duration: 0.2 } }}
                          whileTap={{ scale: 0.97 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(email2, "Email 2");
                          }}
                          onAuxClick={(e) => {
                            e.stopPropagation();
                            handleCopy(email2, "Email 2");
                          }}
                          className="group flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-outline-dim/30 hover:border-brand-primary/40 transition-all duration-300 flex-1 cursor-pointer"
                        >
                          <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-brand-primary/10 text-brand-primary group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                            <Mail size={16} strokeWidth={1.5} />
                          </div>
                          <div className="relative flex flex-col items-start min-w-0">
                            <span className="text-[9px] text-on-surface-variant/60 uppercase tracking-widest mb-0.5">
                              Email
                            </span>
                            <span className="font-sans text-xs text-on-surface select-all group-hover:text-brand-primary transition-colors break-all">
                              {email2}
                            </span>
                          </div>
                          <motion.div
                            initial={{ opacity: 0, x: -8 }}
                            whileHover={{ opacity: 1, x: 0 }}
                            className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                          >
                            <ChevronRight size={12} className="text-on-surface-variant" />
                          </motion.div>
                        </motion.a>

                        <motion.a
                          href={"tel:" + phone2.replace(/[^0-9+]/g, "")}
                          whileHover={{ y: -3, transition: { duration: 0.2 } }}
                          whileTap={{ scale: 0.97 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(phone2, "Phone 2");
                          }}
                          onAuxClick={(e) => {
                            e.stopPropagation();
                            handleCopy(phone2, "Phone 2");
                          }}
                          className="group flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-outline-dim/30 hover:border-brand-primary/40 transition-all duration-300 flex-1 cursor-pointer"
                        >
                          <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-brand-primary/10 text-brand-primary group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                            <Phone size={16} strokeWidth={1.5} />
                          </div>
                          <div className="relative flex flex-col items-start min-w-0">
                            <span className="text-[9px] text-on-surface-variant/60 uppercase tracking-widest mb-0.5">
                              Phone
                            </span>
                            <span className="font-sans text-xs text-on-surface select-all group-hover:text-brand-primary transition-colors break-all">
                              {phone2}
                            </span>
                          </div>
                          <motion.div
                            initial={{ opacity: 0, x: -8 }}
                            whileHover={{ opacity: 1, x: 0 }}
                            className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                          >
                            <ChevronRight size={12} className="text-on-surface-variant" />
                          </motion.div>
                        </motion.a>
                      </div>
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.5 }}
                      className="w-full"
                    >
                      <motion.button
                        whileHover={{ boxShadow: "0 0 40px rgba(242,202,80,0.25)" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          const el = document.getElementById("contact");
                          el?.scrollIntoView({ behavior: "smooth" });
                          setIsOpen(false);
                        }}
                        className="w-full bg-brand-primary text-brand-on-primary px-8 py-5 font-sans text-sm font-bold tracking-widest uppercase hover:shadow-[0_0_50px_rgba(242,202,80,0.3)] transition-all duration-300 rounded-2xl min-h-[56px]"
                      >
                        Start a Project
                      </motion.button>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1 }}
                        className="text-center mt-5 text-on-surface-variant/50 text-xs font-sans tracking-wider"
                      >
                        Typically responds within 24 hours
                      </motion.p>
                    </motion.div>
                  </motion.div>

                  {/* Inner edge highlight */}
                  <div
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    style={{
                      boxShadow: "inset 0 1px 1px rgba(255,255,255,0.08), inset 0 -1px 1px rgba(0,0,0,0.3)",
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}