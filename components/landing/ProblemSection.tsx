
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ProblemSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const x1 = useTransform(scrollYProgress, [0, 1], [-200, 200]);
    const x2 = useTransform(scrollYProgress, [0, 1], [300, -300]);

    const chaoticItems = [
        "Paperwork", "Prior Auth", "Compliance", "Typing", "Faxing",
        "Errors", "Burnout", "Clutter", "Noise"
    ];

    return (
        <section ref={containerRef} className="py-32 relative overflow-hidden bg-background">
            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center mb-24">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold text-foreground mb-6"
                >
                    The noise stops <span className="text-secondary-foreground relative inline-block">
                        here
                        <svg className="absolute -bottom-2 left-0 w-full h-3 text-accent/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                        </svg>
                    </span>.
                </motion.h2>
                <p className="text-xl text-muted max-w-2xl mx-auto">
                    Medical practice has become a storm of distractions. We designed a shelter.
                </p>
            </div>

            {/* Chaotic Stream Visual */}
            <div className="relative h-[400px] w-full flex flex-col justify-center gap-12 overflow-hidden opacity-60 mask-linear-fade">
                <motion.div style={{ x: x1 }} className="flex gap-8 whitespace-nowrap">
                    {chaoticItems.map((item, i) => (
                        <span key={i} className="text-4xl md:text-6xl font-black text-gray-200 select-none">
                            {item}
                        </span>
                    ))}
                    {chaoticItems.map((item, i) => (
                        <span key={`dup-${i}`} className="text-4xl md:text-6xl font-black text-gray-200 select-none">
                            {item}
                        </span>
                    ))}
                </motion.div>

                <motion.div style={{ x: x2 }} className="flex gap-8 whitespace-nowrap ml-20">
                    {chaoticItems.reverse().map((item, i) => (
                        <span key={i} className="text-4xl md:text-6xl font-black text-secondary select-none">
                            {item}
                        </span>
                    ))}
                </motion.div>
            </div>

            {/* Gradient Mask for fading edges */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
        </section>
    );
}
