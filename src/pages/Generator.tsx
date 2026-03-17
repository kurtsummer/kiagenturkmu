import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ChefHat, ArrowLeft, Wand2, Calculator, Clock, Wallet, Utensils } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Generator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    calories: 2000,
    days: "7",
    budget: 50,
    diet: "Omnivor",
    cookingTime: "60"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate AI Generation
    toast({
      title: "Plan wird erstellt...",
      description: "Unser KI-Küchenchef stellt deine Mahlzeiten zusammen.",
    });

    setTimeout(() => {
      // Store data in localStorage for simplicity in this MVP
      localStorage.setItem("prep_master_input", JSON.stringify(formData));
      setLoading(false);
      navigate("/plan");
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="h-16 border-b bg-white flex items-center px-4 md:px-8">
        <Button variant="ghost" onClick={() => navigate("/")} className="gap-2 text-muted-foreground hover:text-primary">
          <ArrowLeft className="w-4 h-4" /> Zurück
        </Button>
        <div className="flex-1 flex justify-center items-center gap-2 pr-20">
          <ChefHat className="w-6 h-6 text-primary" />
          <span className="font-bold text-lg hidden sm:inline">PrepMaster</span>
        </div>
      </header>

      <main className="flex-1 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black mb-3">Erstelle deinen Plan</h1>
            <p className="text-slate-600">Beantworte ein paar Fragen und wir erledigen den Rest.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
            {/* Calories */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2 text-lg font-bold">
                  <Calculator className="w-5 h-5 text-primary" /> Wie viele Kalorien brauchst du pro Tag?
                </Label>
                <span className="text-primary font-black bg-primary/10 px-3 py-1 rounded-full">{formData.calories} kcal</span>
              </div>
              <Slider 
                value={[formData.calories]} 
                min={1200} 
                max={4000} 
                step={50} 
                onValueChange={(val) => setFormData({...formData, calories: val[0]})}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground font-medium uppercase tracking-wider">
                <span>Wenig</span>
                <span>Viel</span>
              </div>
            </div>

            {/* Cooking Time */}
            <div className="space-y-4">
              <Label className="flex items-center gap-2 text-lg font-bold">
                <Clock className="w-5 h-5 text-primary" /> Wie viel Zeit hast du fürs Kochen?
              </Label>
              <RadioGroup 
                value={formData.cookingTime} 
                onValueChange={(val) => setFormData({...formData, cookingTime: val})}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              >
                {[
                  { value: "30", label: "Max. 30 Min", desc: "Super schnell" },
                  { value: "60", label: "Ca. 60 Min", desc: "Standard" },
                  { value: "120", label: "Viel Zeit", desc: "Batch Cooking" },
                ].map((option) => (
                  <Label
                    key={option.value}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      formData.cookingTime === option.value 
                        ? "border-primary bg-primary/5 ring-4 ring-primary/5" 
                        : "border-slate-100 hover:border-slate-200"
                    }`}
                  >
                    <RadioGroupItem value={option.value} className="sr-only" />
                    <span className="font-bold mb-1">{option.label}</span>
                    <span className="text-xs text-muted-foreground">{option.desc}</span>
                  </Label>
                ))}
              </RadioGroup>
            </div>

            {/* Diet & Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-lg font-bold">
                  <Utensils className="w-5 h-5 text-primary" /> Ernährungsstil
                </Label>
                <Select value={formData.diet} onValueChange={(val) => setFormData({...formData, diet: val})}>
                  <SelectTrigger className="h-12 rounded-xl border-slate-200">
                    <SelectValue placeholder="Wähle einen Stil" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Omnivor">Allesesser (Omnivor)</SelectItem>
                    <SelectItem value="Vegetarisch">Vegetarisch</SelectItem>
                    <SelectItem value="Vegan">Vegan</SelectItem>
                    <SelectItem value="High Protein">High Protein</SelectItem>
                    <SelectItem value="Low Carb">Low Carb</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-lg font-bold">
                  <Wallet className="w-5 h-5 text-primary" /> Budget pro Woche
                </Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">€</span>
                  <Input 
                    type="number" 
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: parseInt(e.target.value) || 0})}
                    className="h-12 pl-8 rounded-xl border-slate-200 font-bold"
                  />
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-16 rounded-2xl text-xl font-black bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all active:scale-95 disabled:opacity-70"
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Erstelle Plan...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Wand2 className="w-6 h-6" /> Plan generieren
                </div>
              )}
            </Button>
          </form>
        </div>
      </main>

      <footer className="py-8 text-center text-slate-400 text-sm">
        Schritt 1 von 2: Angaben machen
      </footer>
    </div>
  );
};

export default Generator;
