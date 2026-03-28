import { Link } from "react-router-dom";
import { Shield, Zap, BarChart3, Github, Mail, ArrowRight, Sparkles, Globe, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import LandingNavbar from "@/components/LandingNavbar";

const features = [
  { icon: Shield, title: "Secure Cloud Storage", desc: "Enterprise-grade encryption for all your uploaded files and analysis data.", color: "text-success" },
  { icon: Zap, title: "Automated Analysis", desc: "AI-powered code and document analysis with instant feedback and reports.", color: "text-warning" },
  { icon: BarChart3, title: "Dashboard Tracking", desc: "Real-time monitoring of uploads, processing status, and quality metrics.", color: "text-primary" },
];

const stats = [
  { value: "10K+", label: "Files Analyzed" },
  { value: "99.9%", label: "Uptime" },
  { value: "50ms", label: "Avg Response" },
  { value: "256-bit", label: "Encryption" },
];

const Landing = () => (
  <div className="min-h-screen">
    <LandingNavbar />

    {/* Hero */}
    <section className="pt-32 pb-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(217_91%_53%/0.08),transparent_60%)]" />
      <div className="container mx-auto text-center max-w-3xl relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-8 animate-fade-in">
          <Sparkles className="h-3.5 w-3.5" /> Now with AI-powered analysis
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] animate-fade-in">
          Cloud File & Code{" "}
          <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">Analysis Platform</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Upload your files and get automated cloud-powered analysis reports. Fast, secure, and intelligent.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <Link to="/register">
            <Button size="lg" className="gap-2 glow-blue">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/upload">
            <Button size="lg" variant="outline">Upload File</Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Features */}
    <section id="features" className="py-24 px-4 border-t border-border/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">Powerful Features</h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">Everything you need to analyze, monitor, and secure your codebase.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title} className="glass-card p-8 hover:border-primary/40 transition-all duration-300 group hover:-translate-y-1">
              <div className={`p-3 rounded-xl bg-muted w-fit mb-5 group-hover:scale-110 transition-transform`}>
                <f.icon className={`h-6 w-6 ${f.color}`} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* About */}
    <section id="about" className="py-24 px-4 border-t border-border/50">
      <div className="container mx-auto max-w-2xl text-center">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
          <Globe className="h-7 w-7 text-primary" />
        </div>
        <h2 className="text-3xl font-bold mb-4">About CloudAnalyzer</h2>
        <p className="text-muted-foreground leading-relaxed">
          CloudAnalyzer is a developer-first platform built for teams who need fast, reliable code and document analysis. Our cloud-native architecture ensures your files are processed securely and efficiently.
        </p>
      </div>
    </section>

    {/* Footer */}
    <footer className="border-t border-border py-12 px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© 2026 CloudAnalyzer. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-foreground transition-colors flex items-center gap-1.5">
            <Github className="h-4 w-4" /> GitHub
          </a>
          <a href="#" className="hover:text-foreground transition-colors flex items-center gap-1.5">
            <Mail className="h-4 w-4" /> Contact
          </a>
          <a href="#" className="hover:text-foreground transition-colors flex items-center gap-1.5">
            <Lock className="h-4 w-4" /> Privacy
          </a>
        </div>
      </div>
    </footer>
  </div>
);

export default Landing;
