
"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Activity } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    const [hidden, setHidden] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4"
        >
            <div className="rounded-full px-6 py-3 flex items-center gap-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                <Link href="/" className="flex items-center gap-2 text-foreground font-semibold tracking-tight">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Activity className="w-5 h-5" />
                    </div>
                    <span>HealthScript Pro</span>
                </Link>
            </div>
        </motion.nav>
    );
}
