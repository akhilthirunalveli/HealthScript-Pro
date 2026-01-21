
"use client";

import { motion } from "framer-motion";
import { ArrowRight, Activity } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background px-6">
            {/* Background Organic Shapes */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ duration: 2 }}
                    className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] bg-secondary/80 rounded-full blur-3xl blob-shape animate-float"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ duration: 3, delay: 0.5 }}
                    className="absolute top-[20%] -right-[10%] w-[40vw] h-[40vw] bg-soft-teal/50 rounded-full blur-3xl blob-shape animate-breathe"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ duration: 4, delay: 1 }}
                    className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] bg-blue-50/50 rounded-full blur-3xl blob-shape animate-float"
                    style={{ animationDelay: "2s" }}
                />
            </div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
                        Prescribing made <span className="text-primary italic font-light">human</span>.
                    </h1>

                    <p className="text-xl md:text-2xl text-muted mb-10 max-w-2xl mx-auto leading-relaxed">
                        A continuous, calming workflow designed to let you focus on what matters most—your patients.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button className="px-8 py-4 bg-primary text-white rounded-full font-medium text-lg hover:bg-primary/90 transition-all flex items-center gap-2 group">
                            Start Prescribing
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted/50"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-current rounded-full" />
                </div>
            </motion.div>
        </section>
    );
}
