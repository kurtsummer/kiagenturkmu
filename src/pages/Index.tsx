import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { ProblemSection } from "@/components/ProblemSection";
import { ServicesSection } from "@/components/ServicesSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { Sparkles, Menu, X, ArrowRight } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FC] flex flex-col font-sans antialiased">
      {/* Navigation */}
      <nav className="border-b border-slate-100 bg-white/70 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="bg-[#1F2A44] p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-5 h-5 text-[#6D5EF5]" />
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="font-extrabold text-xl tracking-tight text-[#1F2A44]">AI Marketing</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#6D5EF5]">Professional</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <a href="#leistungen" className="text-sm font-semibold text-slate-500 hover:text-[#1F2A44] transition-colors">Leistungen</a>
            <a href="#uber-mich" className="text-sm font-semibold text-slate-500 hover:text-[#1F2A44] transition-colors">Über mich</a>
            <a href="#referenzen" className="text-sm font-semibold text-slate-500 hover:text-[#1F2A44] transition-colors">Referenzen</a>
            <Button className="rounded-xl h-11 px-6 bg-[#1F2A44] hover:bg-[#1F2A44]/90 text-white font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#1F2A44]/10">
              Kontakt
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-100 p-6 animate-in slide-in-from-top-4">
            <div className="flex flex-col gap-6">
              <a href="#leistungen" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold text-slate-600">Leistungen</a>
              <a href="#uber-mich" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold text-slate-600">Über mich</a>
              <a href="#referenzen" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold text-slate-600">Referenzen</a>
              <Button className="rounded-xl h-12 bg-[#1F2A44] w-full font-bold">
                Kontakt aufnehmen
              </Button>
            </div>
          </div>
        )}
      </nav>

      <main>
        <Hero />
        <TrustBar />
        <ProblemSection />
        <ServicesSection />
        <BenefitsSection />
      </main>

      {/* Footer */}
      <footer className="py-16 border-t border-slate-100 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="bg-[#1F2A44] p-1.5 rounded-lg">
                <Sparkles className="w-4 h-4 text-[#6D5EF5]" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-[#1F2A44]">AI Marketing</span>
            </Link>
            
            <div className="flex gap-8 text-sm font-semibold text-slate-500">
              <a href="#" className="hover:text-[#6D5EF5] transition-colors">Impressum</a>
              <a href="#" className="hover:text-[#6D5EF5] transition-colors">Datenschutz</a>
              <a href="#" className="hover:text-[#6D5EF5] transition-colors">LinkedIn</a>
            </div>
          </div>
          
          <div className="text-center text-slate-400 text-sm font-medium">
            © {new Date().getFullYear()} AI Marketing Professional. Alle Rechte vorbehalten.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
