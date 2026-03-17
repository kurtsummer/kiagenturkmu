import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  ChefHat, 
  ArrowLeft, 
  Calendar, 
  ShoppingCart, 
  Flame, 
  Download, 
  CheckCircle2,
  Clock,
  CircleDashed,
  Info
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PlanData {
  days: {
    name: string;
    meals: { type: string; name: string; calories: number }[];
  }[];
  shoppingList: { category: string; items: string[] }[];
  batchCooking: string[];
  nutrition: { calories: number; protein: number; carbs: number; fats: number };
}

const Plan = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [data, setData] = useState<PlanData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedInput = localStorage.getItem("prep_master_input");
    if (!savedInput) {
      navigate("/generator");
      return;
    }

    const input = JSON.parse(savedInput);
    
    // Simulate API result based on input
    setTimeout(() => {
      const mockData: PlanData = {
        days: [
          { name: "Montag", meals: [
            { type: "Frühstück", name: "Haferflocken mit Apfel & Zimt", calories: 350 },
            { type: "Mittag", name: "Hähnchen-Reis-Bowl mit Brokkoli", calories: 650 },
            { type: "Abend", name: "Protein-Omelette mit Spinat", calories: 400 },
          ]},
          { name: "Dienstag", meals: [
            { type: "Frühstück", name: "Vollkornbrot mit Avocado & Ei", calories: 400 },
            { type: "Mittag", name: "Hähnchen-Reis-Bowl mit Brokkoli", calories: 650 },
            { type: "Abend", name: "Griechischer Salat mit Feta", calories: 350 },
          ]},
          { name: "Mittwoch", meals: [
            { type: "Frühstück", name: "Griechischer Joghurt mit Beeren", calories: 300 },
            { type: "Mittag", name: "Linsen-Curry mit Reis", calories: 600 },
            { type: "Abend", name: "Hähnchen-Reis-Bowl mit Brokkoli", calories: 650 },
          ]},
          { name: "Donnerstag", meals: [
            { type: "Frühstück", name: "Haferflocken mit Apfel & Zimt", calories: 350 },
            { type: "Mittag", name: "Linsen-Curry mit Reis", calories: 600 },
            { type: "Abend", name: "Putensteak mit Ofengemüse", calories: 450 },
          ]},
          { name: "Freitag", meals: [
            { type: "Frühstück", name: "Vollkornbrot mit Avocado & Ei", calories: 400 },
            { type: "Mittag", name: "Linsen-Curry mit Reis", calories: 600 },
            { type: "Abend", name: "Gebackener Lachs mit Spargel", calories: 500 },
          ]},
        ],
        shoppingList: [
          { category: "Protein", items: ["800g Hähnchenbrust", "500g Putensteak", "200g Lachs", "10 Eier", "200g Feta"] },
          { category: "Gemüse & Obst", items: ["1kg Brokkoli", "500g Spinat", "3 Avocados", "5 Äpfel", "Mix-Salat"] },
          { category: "Vorratsschrank", items: ["1kg Reis", "500g Haferflocken", "Rote Linsen", "Olivenöl", "Gewürze"] },
        ],
        batchCooking: [
          "Hähnchenbrust im Ofen oder Pfanne für 3 Portionen vorkochen.",
          "Reis in großer Menge (ca. 500g trocken) kochen und portionieren.",
          "Linsen-Curry am Sonntagabend für 3 Tage vorbereiten.",
          "Gemüse waschen und schneiden."
        ],
        nutrition: {
          calories: input.calories,
          protein: Math.round(input.calories * 0.03),
          carbs: Math.round(input.calories * 0.1),
          fats: Math.round(input.calories * 0.01),
        }
      };
      setData(mockData);
      setLoading(false);
    }, 1000);
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-6">
        <div className="relative">
          <CircleDashed className="w-16 h-16 text-primary animate-spin" />
          <ChefHat className="w-8 h-8 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-black mb-2">Dein Plan wird serviert...</h2>
          <p className="text-slate-500">Gleich hast du deinen perfekten Wochenplan.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="h-16 border-b bg-white flex items-center px-4 md:px-8 sticky top-0 z-50">
        <Button variant="ghost" onClick={() => navigate("/generator")} className="gap-2 text-muted-foreground hover:text-primary">
          <ArrowLeft className="w-4 h-4" /> Ändern
        </Button>
        <div className="flex-1 flex justify-center items-center gap-2 pr-20">
          <ChefHat className="w-6 h-6 text-primary" />
          <span className="font-bold text-lg">PrepMaster</span>
        </div>
      </header>

      <main className="flex-1 py-12 px-4 md:px-8 max-w-6xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-wider mb-4">
              <CheckCircle2 className="w-4 h-4" /> Fertig erstellt
            </div>
            <h1 className="text-4xl font-black mb-2">Dein Wochenplan ist fertig</h1>
            <p className="text-slate-600">So kommst du entspannt durch die Woche.</p>
          </div>
          <Button onClick={() => window.print()} className="rounded-xl h-12 px-6 gap-2 font-bold shadow-lg shadow-primary/10">
            <Download className="w-5 h-5" /> Als PDF speichern
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content: Tabs */}
          <div className="lg:col-span-2 space-y-8">
            <Tabs defaultValue="wochenplan" className="w-full">
              <TabsList className="grid w-full grid-cols-3 h-14 p-1 rounded-2xl bg-slate-200/50">
                <TabsTrigger value="wochenplan" className="rounded-xl font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <Calendar className="w-4 h-4 mr-2" /> Plan
                </TabsTrigger>
                <TabsTrigger value="einkauf" className="rounded-xl font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <ShoppingCart className="w-4 h-4 mr-2" /> Einkauf
                </TabsTrigger>
                <TabsTrigger value="batch" className="rounded-xl font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <Flame className="w-4 h-4 mr-2" /> Kochen
                </TabsTrigger>
              </TabsList>

              <TabsContent value="wochenplan" className="mt-8 space-y-6">
                {data?.days.map((day, idx) => (
                  <Card key={idx} className="rounded-[2rem] border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4">
                      <CardTitle className="text-xl font-black">{day.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        {day.meals.map((meal, mIdx) => (
                          <div key={mIdx} className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                               <span className="text-xs font-black text-primary uppercase">{meal.type[0]}</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <h4 className="font-bold text-lg">{meal.name}</h4>
                                <Badge variant="secondary" className="rounded-lg">{meal.calories} kcal</Badge>
                              </div>
                              <p className="text-sm text-slate-500">{meal.type}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="einkauf" className="mt-8">
                <Card className="rounded-[2rem] border-slate-100 shadow-sm">
                  <CardContent className="p-8 space-y-8">
                    {data?.shoppingList.map((cat, idx) => (
                      <div key={idx}>
                        <h3 className="font-black text-xl mb-4 flex items-center gap-2">
                           <div className="w-2 h-2 rounded-full bg-primary"></div>
                           {cat.category}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {cat.items.map((item, iIdx) => (
                            <div key={iIdx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 group cursor-pointer hover:bg-white hover:border-primary/20 transition-all">
                              <div className="w-5 h-5 rounded-md border-2 border-slate-300 group-hover:border-primary transition-colors"></div>
                              <span className="font-medium">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="batch" className="mt-8">
                <Card className="rounded-[2rem] border-slate-100 shadow-sm overflow-hidden">
                  <div className="p-8 bg-slate-900 text-white">
                    <h3 className="text-2xl font-black mb-2 flex items-center gap-3">
                      <Flame className="w-6 h-6 text-orange-400" /> Batch Cooking Plan
                    </h3>
                    <p className="text-slate-400">Einmal kochen, die ganze Woche entspannt essen.</p>
                  </div>
                  <CardContent className="p-8 space-y-6">
                    {data?.batchCooking.map((step, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black shrink-0">
                          {idx + 1}
                        </div>
                        <p className="text-lg font-medium leading-relaxed">{step}</p>
                      </div>
                    ))}
                    <div className="mt-10 p-6 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-start gap-4">
                      <Clock className="w-6 h-6 text-secondary shrink-0" />
                      <div>
                        <h4 className="font-bold text-secondary mb-1">Zeit-Tipp</h4>
                        <p className="text-sm text-secondary-foreground leading-relaxed">
                          Wenn du alles auf einmal vorbereitest, sparst du unter der Woche ca. 45 Minuten pro Tag.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar: Stats */}
          <div className="space-y-8">
            <Card className="rounded-[2rem] border-slate-100 shadow-sm sticky top-24">
              <CardHeader>
                <CardTitle className="text-xl font-black">Nährwerte pro Tag</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 rounded-3xl bg-primary text-white text-center shadow-lg shadow-primary/20">
                  <span className="text-sm font-bold uppercase tracking-widest opacity-80">Kalorien</span>
                  <div className="text-4xl font-black mt-1">{data?.nutrition.calories} <span className="text-lg opacity-70">kcal</span></div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {[
                    { label: "Protein", value: data?.nutrition.protein, unit: "g", color: "bg-blue-500" },
                    { label: "Kohlenhydrate", value: data?.nutrition.carbs, unit: "g", color: "bg-green-500" },
                    { label: "Fette", value: data?.nutrition.fats, unit: "g", color: "bg-orange-500" },
                  ].map((stat, i) => (
                    <div key={i} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-sm font-bold text-slate-500">{stat.label}</span>
                        <span className="font-black">{stat.value}{stat.unit}</span>
                      </div>
                      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div className={`h-full ${stat.color} rounded-full`} style={{ width: '70%' }}></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 p-4 rounded-2xl bg-blue-50 border border-blue-100 flex gap-3">
                  <Info className="w-5 h-5 text-blue-500 shrink-0" />
                  <p className="text-xs text-blue-700 leading-relaxed font-medium">
                    Diese Werte sind Schätzungen basierend auf Standardrezepten.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="py-12 text-center text-slate-400 text-sm">
        <p>Dein Plan ist 7 Tage gültig.</p>
      </footer>
    </div>
  );
};

export default Plan;
