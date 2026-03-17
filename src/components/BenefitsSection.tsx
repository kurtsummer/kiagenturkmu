import { Eye, Zap, MousePointerClick } from "lucide-react";

export const BenefitsSection = () => {
  const benefits = [
    {
      title: "Mehr Sichtbarkeit",
      description: "Professioneller auftreten, besser gefunden werden und gezielt mehr Aufmerksamkeit bei Ihrer Zielgruppe erzeugen.",
      icon: <Eye className="w-6 h-6 text-[#7FA38A]" />,
    },
    {
      title: "Mehr Effizienz",
      description: "Wiederkehrende Aufgaben vereinfachen und Marketingprozesse mit KI intelligenter gestalten.",
      icon: <Zap className="w-6 h-6 text-[#6D5EF5]" />,
    },
    {
      title: "Mehr Kundenanfragen",
      description: "Marketing so aufsetzen, dass nicht nur Aktivität entsteht, sondern echte Resultate.",
      icon: <MousePointerClick className="w-6 h-6 text-[#1F2A44]" />,
    },
  ];

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-[#1F2A44] mb-6">
            Was Sie davon haben
          </h2>
          <div className="h-1.5 w-16 bg-[#7FA38A] rounded-full mx-auto"></div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-full bg-[#F8F9FC] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                {benefit.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-[#1F2A44] mb-4">
                {benefit.title}
              </h3>
              
              <p className="text-slate-500 text-lg leading-relaxed font-medium max-w-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Decorative Quote or Small Text */}
        <div className="mt-24 text-center">
          <p className="text-slate-400 text-sm font-semibold uppercase tracking-[0.2em]">
            Ergebnisse statt nur Technologie
          </p>
        </div>
      </div>
    </section>
  );
};
