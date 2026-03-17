import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Sparkles, TrendingUp, Users } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#F8F9FC] pt-20 pb-24 md:pt-32 md:pb-40">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-[#6D5EF5]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-[#1F2A44]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Text Content */}
          <div className="flex-1 text-left max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6D5EF5]/10 text-[#6D5EF5] text-sm font-semibold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Sparkles className="w-4 h-4" />
              <span>KI-Marketing Strategie für KMU</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#1F2A44] mb-8 leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-1000">
              KI-Marketing für KMU — <br />
              <span className="text-[#6D5EF5]">persönlich</span> begleitet, <br />
              <span className="text-[#6D5EF5]">professionell</span> umgesetzt.
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              Ich unterstütze kleine und mittlere Unternehmen dabei, KI sinnvoll im Marketing einzusetzen — von Social Media über Webseiten bis zu effizienteren Prozessen. Verständlich in der Beratung, modern in der Umsetzung und klar auf Ergebnisse ausgerichtet.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
              <Button 
                size="lg" 
                className="w-full sm:w-auto h-14 px-8 rounded-xl bg-[#1F2A44] hover:bg-[#1F2A44]/90 text-white font-bold text-lg shadow-lg shadow-[#1F2A44]/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Kostenloses Erstgespräch anfragen
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto h-14 px-8 rounded-xl border-slate-200 text-slate-600 font-semibold text-lg hover:bg-white hover:text-[#1F2A44] transition-all"
              >
                Leistungen ansehen
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-6 text-slate-500 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#6D5EF5]" />
                <span className="text-sm font-medium">Keine Vorkenntnisse nötig</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#6D5EF5]" />
                <span className="text-sm font-medium">Individuelle Betreuung</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#6D5EF5]" />
                <span className="text-sm font-medium">Messbare Erfolge</span>
              </div>
            </div>
          </div>

          {/* Visual Side */}
          <div className="flex-1 relative w-full max-w-2xl animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
            <div className="relative bg-white p-6 md:p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
              {/* Mock Interface Content */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#6D5EF5]/10 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-[#6D5EF5]" />
                    </div>
                    <div>
                      <div className="h-3 w-24 bg-slate-100 rounded-full mb-1"></div>
                      <div className="h-2 w-16 bg-slate-50 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100" />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="h-32 rounded-2xl bg-[#F8F9FC] border border-slate-50 p-4">
                    <div className="h-2 w-12 bg-slate-200 rounded-full mb-3"></div>
                    <div className="space-y-2">
                      <div className="h-1.5 w-full bg-slate-100 rounded-full"></div>
                      <div className="h-1.5 w-3/4 bg-slate-100 rounded-full"></div>
                      <div className="h-1.5 w-1/2 bg-slate-100 rounded-full"></div>
                    </div>
                  </div>
                  <div className="h-32 rounded-2xl bg-[#6D5EF5]/5 border border-[#6D5EF5]/10 p-4">
                    <div className="h-2 w-12 bg-[#6D5EF5]/20 rounded-full mb-3"></div>
                    <div className="space-y-2">
                      <div className="h-1.5 w-full bg-[#6D5EF5]/10 rounded-full"></div>
                      <div className="h-1.5 w-3/4 bg-[#6D5EF5]/10 rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                     <Sparkles className="w-5 h-5 text-white" />
                   </div>
                   <div className="flex-1">
                     <div className="h-2 w-1/2 bg-white/20 rounded-full mb-2"></div>
                     <div className="h-2 w-1/3 bg-white/10 rounded-full"></div>
                   </div>
                   <div className="px-3 py-1.5 rounded-lg bg-[#6D5EF5] text-[10px] font-bold uppercase tracking-wider">
                     Active
                   </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-[#6D5EF5] rounded-full"></div>
                  </div>
                  <span className="text-xs font-semibold text-slate-400">67% optimized</span>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Users className="w-32 h-32" />
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 flex items-center gap-3 animate-bounce-slow">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">Aktuelles Projekt</div>
                <div className="text-sm font-bold text-[#1F2A44]">KI Content-Strategie</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
