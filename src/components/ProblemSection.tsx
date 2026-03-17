import { Brain, Clock, Target } from "lucide-react";

export const ProblemSection = () => {
  const problems = [
    {
      icon: <Brain className="w-6 h-6 text-[#7FA38A]" />,
      title: "Zu viel Theorie, zu wenig Klarheit",
      description: "Fachbegriffe und komplexe Konzepte machen den Einstieg schwer. Ich übersetze Theorie in verständliche Schritte."
    },
    {
      icon: <Clock className="w-6 h-6 text-[#7FA38A]" />,
      title: "Zu viele Tools, zu wenig Zeit",
      description: "Der Markt ist überflutet mit KI-Anwendungen. Ich helfe Ihnen, die Werkzeuge zu finden, die wirklich Zeit sparen."
    },
    {
      icon: <Target className="w-6 h-6 text-[#7FA38A]" />,
      title: "Zu viel Hype, zu wenig konkrete Ergebnisse",
      description: "KI soll kein Selbstzweck sein. Wir konzentrieren uns auf Lösungen, die messbaren Erfolg für Ihr Marketing bringen."
    }
  ];

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container mx-auto px-4">
        {/* Header Text */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-[#1F2A44] mb-8 leading-tight">
            Viele Unternehmen wissen, dass KI wichtig wird — aber nicht, wie sie sinnvoll starten sollen.
          </h2>
          <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-medium">
            Genau hier setze ich an. Viele KMU möchten moderner auftreten, sichtbarer werden und ihr Marketing effizienter gestalten, fühlen sich beim Thema KI aber unsicher, überfordert oder mit Fachbegriffen allein gelassen. Ich helfe dabei, aus einem komplexen Thema einen klaren und machbaren Weg zu machen.
          </p>
        </div>

        {/* Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {problems.map((item, index) => (
            <div 
              key={index} 
              className="p-8 rounded-[2rem] border border-slate-100 bg-[#F8F9FC]/50 hover:bg-[#F8F9FC] transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm border border-slate-50 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-[#1F2A44] mb-4">
                {item.title}
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm md:text-base font-medium">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Subtle Path Visual */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 text-sm font-bold text-[#7FA38A] bg-[#7FA38A]/5 px-4 py-2 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#7FA38A] animate-pulse"></span>
            Es gibt einen klaren Weg für Ihr Unternehmen
          </div>
        </div>
      </div>
    </section>
  );
};
