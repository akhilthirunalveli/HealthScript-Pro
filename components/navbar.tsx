"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
            <div className="container px-4 md:px-6 h-16 flex items-center justify-between">
                <Link className="flex items-center justify-center font-serif text-xl tracking-tight font-medium" href="#">
                    HealthScript <span className="ml-1 bg-primary text-primary-foreground px-1.5 py-0.5 rounded text-xs font-bold tracking-wider">PRO</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-6 lg:gap-8">
                    <Link className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" href="#features">
                        Features
                    </Link>
                    <Link className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" href="#workflow">
                        How it Works
                    </Link>
                    <Link className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" href="https://github.com/akhilthirunalveli/HealthScript-Pro" target="_blank">
                        GitHub
                    </Link>
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex gap-4 items-center">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/login">Sign In</Link>
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-full px-6 border-foreground/20 hover:bg-foreground hover:text-background transition-all" asChild>
                        <Link href="/dashboard">Get Started</Link>
                    </Button>
                    <ModeToggle />
                </div>

                {/* Mobile Menu Toggle */}
                <div className="flex items-center gap-4 md:hidden">
                    <ModeToggle />
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 text-foreground focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {
                isOpen && (
                    <div className="md:hidden absolute top-16 left-0 w-full bg-background border-b border-border/40 p-4 flex flex-col gap-4 animate-in slide-in-from-top-4 duration-200 shadow-xl">
                        <nav className="flex flex-col gap-4">
                            <Link
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors p-2"
                                href="#features"
                                onClick={() => setIsOpen(false)}
                            >
                                Features
                            </Link>
                            <Link
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors p-2"
                                href="#workflow"
                                onClick={() => setIsOpen(false)}
                            >
                                How it Works
                            </Link>
                            <Link
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors p-2"
                                href="https://github.com/akhilthirunalveli/HealthScript-Pro"
                                target="_blank"
                                onClick={() => setIsOpen(false)}
                            >
                                GitHub
                            </Link>
                        </nav>
                        <div className="flex flex-col gap-2 mt-2">
                            <Button variant="ghost" size="lg" asChild className="w-full justify-start">
                                <Link href="/login">Sign In</Link>
                            </Button>
                            <Button variant="outline" size="lg" className="w-full rounded-full border-foreground/20 hover:bg-foreground hover:text-background transition-all" asChild>
                                <Link href="/dashboard">Get Started</Link>
                            </Button>
                        </div>
                    </div>
                )
            }
        </header >
    );
}
