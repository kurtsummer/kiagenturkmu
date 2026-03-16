import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Prompt, MediaType, CameraType, FilmStock, Perspective } from "../types/prompt";
import { Plus, Database, Sparkles } from "lucide-react";
import { toast } from "../hooks/use-toast";

interface AddPromptModalProps {
  onAdd: (prompt: Prompt) => void;
}

export function AddPromptModal({ onAdd }: AddPromptModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    mediaType: "Bild" as MediaType,
    cameraType: "Digital" as CameraType,
    filmStock: "Standard Digital" as FilmStock,
    perspective: "Augenhöhe" as Perspective,
    aspectRatio: "16:9",
    tags: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      toast({
        title: "Fehler",
        description: "Bitte Titel und Prompt ausfüllen.",
        variant: "destructive",
      });
      return;
    }

    const newPrompt: Prompt = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.title,
      content: formData.content,
      mediaType: formData.mediaType,
      cameraType: formData.cameraType,
      filmStock: formData.filmStock,
      perspective: formData.perspective,
      aspectRatio: formData.aspectRatio,
      tags: formData.tags.split(",").map(t => t.trim()).filter(t => t !== ""),

      createdAt: new Date().toISOString(),
    };

    onAdd(newPrompt);
    setOpen(false);
    setFormData({
      title: "",
      content: "",
      mediaType: "Bild",
      cameraType: "Digital",
      filmStock: "Standard Digital",
      perspective: "Augenhöhe",
      aspectRatio: "16:9",
      tags: "",
    });

    toast({
      title: "Erfolg!",
      description: "Prompt wurde zur Datenbank hinzugefügt.",
    });
  };

  const cameraTypes: CameraType[] = ["Retro", "Analog", "Digital", "Spiegellos", "Spiegelreflex", "Vintage", "35mm Film", "Mittelformat", "Großformat", "GoPro", "iPhone"];
  const filmStocks: FilmStock[] = ["Kodak Portra 400", "Fujifilm Superia", "Schwarz-Weiß", "CineStill 800T", "Polaroid", "Technicolor", "Ektachrome", "Standard Digital", "VHS-Stil", "Super 8", "Kodak Gold 200", "Ilford HP5"];
  const perspectives: Perspective[] = ["Weitwinkel", "Nahaufnahme", "Vogelperspektive", "Froschperspektive", "Draufsicht", "Augenhöhe", "Schräger Winkel", "Makro", "Extreme Nahaufnahme", "Totale", "Halbtotale", "Ego-Perspektive"];
  const aspectRatios = ["1:1", "16:9", "9:16", "4:3", "3:2", "2:1", "21:9"];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-2xl h-12 px-6 bg-gradient-to-r from-primary to-secondary text-white font-black tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
          <Plus className="w-5 h-5 mr-2" /> Eigener Prompt
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-secondary to-accent" />
        <form onSubmit={handleSubmit} className="p-8">
          <DialogHeader className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-secondary/10 rounded-xl">
                 <Database className="w-6 h-6 text-secondary" />
              </div>
              <DialogTitle className="text-2xl font-black tracking-tight">Eintrag hinzufügen</DialogTitle>
            </div>
            <DialogDescription className="font-medium text-base">
              Speichere deine besten Prompts manuell ab.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Kurztitel des Werks</Label>
              <Input 
                id="title" 
                placeholder="z.B. Neon City Shot" 
                className="h-14 rounded-2xl border-2 border-primary/5 focus:border-primary/30 transition-all font-bold"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Prompt-Inhalt (Englisch bevorzugt)</Label>
              <Textarea 
                id="content" 
                placeholder="Füge hier deinen detaillierten Prompt ein..." 
                className="min-h-[120px] rounded-2xl border-2 border-primary/5 focus:border-primary/30 transition-all font-medium p-4"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Typ</Label>
                <Select value={formData.mediaType} onValueChange={(v) => setFormData({...formData, mediaType: v as MediaType})}>
                  <SelectTrigger className="h-12 rounded-xl border-2 border-primary/5"><SelectValue /></SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="Bild">Bild</SelectItem>
                    <SelectItem value="Video">Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Kamera</Label>
                <Select value={formData.cameraType} onValueChange={(v) => setFormData({...formData, cameraType: v as CameraType})}>
                  <SelectTrigger className="h-12 rounded-xl border-2 border-primary/5"><SelectValue /></SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {cameraTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Film/Look</Label>
                <Select value={formData.filmStock} onValueChange={(v) => setFormData({...formData, filmStock: v as FilmStock})}>
                  <SelectTrigger className="h-12 rounded-xl border-2 border-primary/5"><SelectValue /></SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {filmStocks.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Perspektive</Label>
                <Select value={formData.perspective} onValueChange={(v) => setFormData({...formData, perspective: v as Perspective})}>
                  <SelectTrigger className="h-12 rounded-xl border-2 border-primary/5"><SelectValue /></SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {perspectives.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Seitenverhältnis (Aspect Ratio)</Label>
              <Select value={formData.aspectRatio} onValueChange={(v) => setFormData({...formData, aspectRatio: v})}>
                <SelectTrigger className="h-12 rounded-xl border-2 border-primary/5"><SelectValue /></SelectTrigger>
                <SelectContent className="rounded-xl">
                  {aspectRatios.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

          </div>
          <DialogFooter className="mt-8">
            <Button type="submit" className="w-full h-14 rounded-2xl text-lg font-black tracking-widest bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
              <Sparkles className="w-5 h-5 mr-2" /> SPEICHERN
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
