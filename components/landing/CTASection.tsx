
"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
    return (
        <section className="py-48 relative overflow-hidden flex items-center justify-center">
            {/* Warm Background */}
            <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-bold text-foreground mb-8 tracking-tight"
                >
                    Ready to heal <br />
                    <span className="text-accent italic font-serif">healthcare?</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-muted mb-12 max-w-2xl mx-auto"
                >
                    Join thousands of doctors who have rediscovered the joy of medicine.
                    Start your free trial today.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    <button className="px-5 py-3 bg-foreground font-mono text-background rounded-full text-base hover:scale-105 transition-transform shadow-2xl flex items-center gap-3 mx-auto">
                        Get Started Now
                        <ArrowRight className="w-6 h-6" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
