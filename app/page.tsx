import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FileText,
  Printer,
  Settings,
  Shield,
  Github,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground font-sans selection:bg-gray-200">
      {/* Header */}
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-24 md:py-32 lg:py-48 overflow-hidden flex flex-col items-center justify-center text-center px-4">

          {/* Ethereal Light Rays Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            {/* Ray 1 */}
            <div
              className="absolute top-[-50%] left-[20%] w-[200px] h-[200%] bg-gradient-to-b from-foreground/5 via-foreground/2 to-transparent rotate-[25deg] blur-3xl animate-beam-flow opacity-30 mix-blend-overlay"
              style={{ "--beam-opacity": 0.4 } as React.CSSProperties}
            ></div>
            {/* Ray 2 */}
            <div
              className="absolute top-[-50%] right-[30%] w-[300px] h-[200%] bg-gradient-to-b from-foreground/5 via-foreground/1 to-transparent -rotate-[15deg] blur-3xl animate-beam-flow opacity-20 mix-blend-overlay delay-1000"
              style={{ "--beam-opacity": 0.3, animationDuration: "20s" } as React.CSSProperties}
            ></div>
            {/* Ray 3 (Central Glow) */}
            <div
              className="absolute top-[-20%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] bg-foreground/5 blur-[100px] rounded-full opacity-20 animate-pulse"
              style={{ animationDuration: "8s" }}
            ></div>
          </div>

          <div className="relative z-10 max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight leading-[1.1] text-foreground">
              Prescriptions, simplified.
            </h1>
            <p className="mx-auto max-w-[600px] text-muted-foreground text-lg md:text-xl leading-relaxed font-light">
              Calm, clinical, and open-source software for generating accurate medical prescriptions. Designed for doctors who value clarity and speed.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="rounded-full px-8 h-12 text-base shadow-sm border border-border/50 bg-foreground text-background hover:bg-foreground/90 transition-all" asChild>
                <Link href="/dashboard">Start Prescribing</Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base border-border bg-transparent hover:bg-muted transition-all" asChild>
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Feature Section */}
        <section id="features" className="w-full py-20 md:py-32 bg-background border-t border-border/40">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <FeatureCard
                index={0}
                icon={<FileText className="w-6 h-6 stroke-1 text-primary" />}
                title="Structured Data"
                description="Generate standardized prescriptions that eliminate errors and ensure clarity. Every field is type-safe and validated."
              />
              <FeatureCard
                index={1}
                icon={<Printer className="w-6 h-6 stroke-1 text-primary" />}
                title="Print Ready"
                description="Optimized layouts specifically designed for standard prescription pads or plain A4 paper printing."
              />
              <FeatureCard
                index={2}
                icon={<Shield className="w-6 h-6 stroke-1 text-primary" />}
                title="Secure & Private"
                description="Your data stays yours. Open-source and self-hostable means you have complete control over patient privacy."
              />
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section id="workflow" className="w-full py-20 md:py-32 bg-muted/30 border-t border-border/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center mb-16 text-center">
              <h2 className="text-3xl md:text-4xl font-serif tracking-tight mb-4">How it works</h2>
              <p className="text-muted-foreground max-w-[500px]">A streamlined workflow designed to save you time during consultations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connector Line (Desktop) */}
              <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-[1px] bg-border z-0"></div>

              <Step
                number="1"
                title="Patient Details"
                description="Quickly enter patient information or select from your saved records."
              />
              <Step
                number="2"
                title="Add Medications"
                description="Search databases for drugs, set dosages, and add instructions with ease."
              />
              <Step
                number="3"
                title="Print & Sign"
                description="Generate a PDF instantly, print it out, and sign. You're done."
              />
            </div>
          </div>
        </section>

        {/* Open Source Section */}
        <section className="w-full py-24 bg-background border-t border-border/40">
          <div className="container px-4 md:px-6 flex flex-col items-center text-center">
            <div className="p-4 rounded-full bg-muted/50 mb-6">
              <Github className="w-8 h-8 opacity-80" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif tracking-tight mb-6">Proudly Open Source</h2>
            <p className="max-w-[700px] text-muted-foreground text-lg mb-10 leading-relaxed">
              We believe healthcare software should be transparent and accessible.
              HealthScript Pro is free to use, modify, and distribute.
            </p>
            <Button variant="outline" size="lg" className="rounded-full px-8 border-foreground/20 hover:border-foreground/50 transition-colors" asChild>
              <Link href="https://github.com/akhilthirunalveli/HealthScript-Pro" target="_blank">
                View Repository <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-border/40 bg-background">
        <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="space-y-1 text-center md:text-left">
            <p className="font-serif text-foreground">HealthScript Pro</p>
            <p>Released under the MIT License.</p>
          </div>
          <nav className="flex gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">Documentation</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, index }: { icon: React.ReactNode, title: string, description: string, index: number }) {
  return (
    <Card
      className="group relative border border-border/40 bg-gradient-to-br from-background via-background to-muted/20 shadow-sm hover:shadow-md hover:border-border/80 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
      style={{
        animationDelay: `${index * 100}ms`
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <CardHeader className="relative z-10">
        <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-muted/50 group-hover:bg-foreground/5 transition-colors duration-300 text-foreground">
          {icon}
        </div>
        <CardTitle className="font-serif text-2xl font-normal group-hover:text-primary transition-colors duration-300">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <CardDescription className="text-base text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  )
}

function Step({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center text-center relative z-10">
      <div className="w-16 h-16 rounded-full bg-background border border-border flex items-center justify-center text-xl font-serif mb-6 shadow-sm">
        {number}
      </div>
      <h3 className="text-xl font-medium mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed max-w-[300px]">{description}</p>
    </div>
  )
}
