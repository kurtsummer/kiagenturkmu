import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChefHat, ArrowRight, Clock, Wallet, Heart, CheckCircle2 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">PrepMaster</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <a href="#vorteile" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Vorteile</a>
            <a href="#funktionsweise" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">So funktioniert's</a>
            <Button asChild className="rounded-full px-6">
              <Link to="/generator">Jetzt starten</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6 animate-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Dein Wochenplan in fünf Minuten
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-6 max-w-4xl mx-auto leading-[1.1]">
            Spare Zeit und Geld mit einem klaren <span className="text-primary">Wochenplan</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Erstelle deinen persönlichen Meal Prep Plan in Sekunden. Schluss mit täglicher Grübelei und teuren Spontankäufen.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="h-14 px-10 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
              <Link to="/generator" className="gap-2">
                Jetzt kostenlos testen <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
              <CheckCircle2 className="w-4 h-4 text-secondary" /> Keine Anmeldung nötig
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-white" id="vorteile">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black mb-4">Du kennst das...</h2>
            <div className="w-20 h-1.5 bg-primary/20 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Tägliches Grübeln", desc: "Du überlegst jeden Tag neu, was du heute essen sollst.", icon: Clock },
              { title: "Zu viel Einkauf", desc: "Du kaufst planlos ein und am Ende landet viel im Müll.", icon: Wallet },
              { title: "Zeitverlust", desc: "Einkaufen und Kochen rauben dir wertvolle Freizeit.", icon: Clock },
              { title: "Stress pur", desc: "Hunger + keine Ahnung = schlechte Laune und Fast Food.", icon: Heart }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-3xl border bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all border-slate-100">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative" id="funktionsweise">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                PrepMaster gibt dir die <span className="text-primary">Struktur</span> zurück
              </h2>
              <div className="space-y-6">
                {[
                  "Du weißt genau, was du kochst",
                  "Du kaufst nur das, was du wirklich brauchst",
                  "Du sparst bares Geld und wertvolle Zeit",
                  "Du hast endlich einen Plan, der funktioniert"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-slate-900" />
                    </div>
                    <span className="text-lg text-slate-300 font-medium">{text}</span>
                  </div>
                ))}
              </div>
              <Button asChild size="lg" className="mt-12 h-14 px-10 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-bold transition-all hover:scale-105">
                <Link to="/generator">Meinen Plan erstellen</Link>
              </Button>
            </div>
            <div className="lg:w-1/2 relative">
               <div className="bg-slate-800 p-8 rounded-[2rem] border border-slate-700 shadow-2xl">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                 </div>
                 <div className="space-y-4">
                    <div className="h-4 bg-slate-700 rounded-full w-3/4"></div>
                    <div className="h-4 bg-slate-700 rounded-full w-1/2"></div>
                    <div className="pt-4 grid grid-cols-2 gap-4">
                       <div className="h-32 bg-slate-700/50 rounded-2xl border border-slate-600"></div>
                       <div className="h-32 bg-slate-700/50 rounded-2xl border border-slate-600"></div>
                    </div>
                    <div className="h-24 bg-primary/20 rounded-2xl border border-primary/30 flex items-center justify-center">
                       <span className="text-primary font-bold">Wochenplan generiert!</span>
                    </div>
                 </div>
               </div>
               <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/20 blur-3xl rounded-full"></div>
               <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/20 blur-3xl rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t mt-auto">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <ChefHat className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg">PrepMaster</span>
          </div>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} PrepMaster. Dein hilfreicher Küchenassistent.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
