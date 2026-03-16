import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Prompt, MediaType, CameraType, FilmStock, Perspective } from "../types/prompt";
import { Database, Sparkles, Pencil, Trash2 } from "lucide-react";

import { toast } from "../hooks/use-toast";

interface EditPromptModalProps {
  prompt: Prompt | null;
  onClose: () => void;
  onUpdate: (prompt: Prompt) => void;
}

export function EditPromptModal({ prompt, onClose, onUpdate }: EditPromptModalProps) {
  const [formData, setFormData] = useState<{
    title: string;
    content: string;
    mediaType: MediaType;
    cameraType: CameraType;
    filmStock: FilmStock;
    perspective: Perspective;
    aspectRatio: string;
    negativePrompt: string;
    imageUrl?: string;
    tags: string;
  } | null>(null);

  useEffect(() => {
    if (prompt) {
      setFormData({
        title: prompt.title,
        content: prompt.content,
        mediaType: prompt.mediaType,
        cameraType: prompt.cameraType,
        filmStock: prompt.filmStock,
        perspective: prompt.perspective,
        aspectRatio: prompt.aspectRatio || "16:9",
        negativePrompt: prompt.negativePrompt || "",
        imageUrl: prompt.imageUrl,
        tags: prompt.tags.join(", "),
      });

    } else {
      setFormData(null);
    }
  }, [prompt]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData || !prompt) return;

    if (!formData.title || !formData.content) {
      toast({
        title: "Fehler",
        description: "Bitte Titel und Prompt ausfüllen.",
        variant: "destructive",
      });
      return;
    }

    const updatedPrompt: Prompt = {
      ...prompt,
      title: formData.title,
      content: formData.content,
      mediaType: formData.mediaType,
      cameraType: formData.cameraType,
      filmStock: formData.filmStock,
      perspective: formData.perspective,
      aspectRatio: formData.aspectRatio,
      negativePrompt: formData.negativePrompt,
      imageUrl: formData.imageUrl,
      tags: formData.tags.split(",").map(t => t.trim()).filter(t => t !== ""),
    };

    onUpdate(updatedPrompt);
    onClose();
    toast({
      title: "Aktualisiert!",
      description: "Der Prompt wurde erfolgreich geändert.",
    });
  };

  if (!formData) return null;

  const cameraTypes: CameraType[] = ["Retro", "Analog", "Digital", "Spiegellos", "Spiegelreflex", "Vintage", "35mm Film", "Mittelformat", "Großformat", "GoPro", "iPhone"];
  const filmStocks: FilmStock[] = ["Kodak Portra 400", "Fujifilm Superia", "Schwarz-Weiß", "CineStill 800T", "Polaroid", "Technicolor", "Ektachrome", "Standard Digital", "VHS-Stil", "Super 8", "Kodak Gold 200", "Ilford HP5"];
  const perspectives: Perspective[] = ["Weitwinkel", "Nahaufnahme", "Vogelperspektive", "Froschperspektive", "Draufsicht", "Augenhöhe", "Schräger Winkel", "Makro", "Extreme Nahaufnahme", "Totale", "Halbtotale", "Ego-Perspektive"];
  const aspectRatios = ["1:1", "16:9", "9:16", "4:3", "3:2", "2:1", "21:9"];

  return (
    <Dialog open={!!prompt} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-primary" />
        <form onSubmit={handleSubmit} className="p-8">
          <DialogHeader className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-500/10 rounded-xl">
                 <Pencil className="w-6 h-6 text-blue-500" />
              </div>
              <DialogTitle className="text-2xl font-black tracking-tight">Prompt bearbeiten</DialogTitle>
            </div>
            <DialogDescription className="font-medium text-base">
              Passe die Details deines gespeicherten Prompts an.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-title" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Kurztitel</Label>
              <Input 
                id="edit-title" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="h-14 rounded-2xl border-2 border-primary/5 focus:border-primary/30 transition-all font-bold"
              />
            </div>
            {formData.imageUrl && (
              <div className="relative rounded-2xl overflow-hidden group">
                <img src={formData.imageUrl} className="w-full h-32 object-cover" alt="Vorschau" />
                <button
                  type="button"
                  onClick={() => setFormData({...formData, imageUrl: undefined})}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
            <div className="grid gap-2">

              <Label htmlFor="edit-content" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Prompt-Inhalt</Label>
              <Textarea 
                id="edit-content" 
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                className="min-h-[120px] rounded-2xl border-2 border-primary/5 focus:border-primary/30 transition-all font-medium p-4"
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
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Seitenverhältnis</Label>
              <Select value={formData.aspectRatio} onValueChange={(v) => setFormData({...formData, aspectRatio: v})}>
                <SelectTrigger className="h-12 rounded-xl border-2 border-primary/5"><SelectValue /></SelectTrigger>
                <SelectContent className="rounded-xl">
                  {aspectRatios.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Tags (kommagetrennt)</Label>
              <Input 
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                className="h-12 rounded-xl border-2 border-primary/5 focus:border-primary/30 transition-all font-bold"
              />
            </div>
          </div>
          <DialogFooter className="mt-8">
            <Button type="button" variant="ghost" onClick={onClose} className="rounded-2xl h-14 font-bold">Abbrechen</Button>
            <Button type="submit" className="flex-1 h-14 rounded-2xl text-lg font-black tracking-widest bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20">
              ÄNDERUNGEN SPEICHERN
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
