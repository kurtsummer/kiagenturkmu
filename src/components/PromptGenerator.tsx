import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

import { MediaType, CameraType, FilmStock, Perspective, Lighting, Mood, Prompt } from "../types/prompt";
import { Sparkles, Copy, Check, Save, Wand2, RefreshCcw, Zap, Dices, BrainCircuit, Ban } from "lucide-react";

import { toast } from "../hooks/use-toast";

interface PromptGeneratorProps {
  onSave: (prompt: Prompt) => void;
}

export function PromptGenerator({ onSave }: PromptGeneratorProps) {
  const [config, setConfig] = useState({
    subject: "",
    mediaType: "Bild" as MediaType,
    cameraType: "Analog" as CameraType,
    filmStock: "Kodak Portra 400" as FilmStock,
    perspective: "Augenhöhe" as Perspective,
    lighting: "Goldene Stunde" as Lighting,
    mood: "Nostalgisch" as Mood,
    aperture: "2.8",
    shutterSpeed: "1/500",
    iso: "200",
    focalLength: "35mm",
    aspectRatio: "16:9",
    negativePrompt: "unscharf, schlechte Qualität, verzerrt, Wasserzeichen, Unterschrift, körnig, niedrige Auflösung, hässlich, nicht im Fokus"
  });

  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [copied, setCopied] = useState(false);

  const cameraTypes: CameraType[] = ["Retro", "Analog", "Digital", "Spiegellos", "Spiegelreflex", "Vintage", "35mm Film", "Mittelformat", "Großformat", "GoPro", "iPhone"];
  const filmStocks: FilmStock[] = ["Kodak Portra 400", "Fujifilm Superia", "Schwarz-Weiß", "CineStill 800T", "Polaroid", "Technicolor", "Ektachrome", "Standard Digital", "VHS-Stil", "Super 8", "Kodak Gold 200", "Ilford HP5"];
  const perspectives: Perspective[] = ["Weitwinkel", "Nahaufnahme", "Vogelperspektive", "Froschperspektive", "Draufsicht", "Augenhöhe", "Schräger Winkel", "Makro", "Extreme Nahaufnahme", "Totale", "Halbtotale", "Ego-Perspektive"];
  const lightings: Lighting[] = ["Goldene Stunde", "Cinematisch", "Neon-Licht", "Weiches Licht", "Hartes Licht", "Studio-Beleuchtung", "Natürliches Licht", "Düster", "Bewölkt"];
  const moods: Mood[] = ["Nostalgisch", "Futuristisch", "Raw/Authentisch", "Ätherisch", "Traumhaft", "Professionell", "Dunkel", "Lebhaft"];
  
  const apertures = ["1.2", "1.4", "1.8", "2.8", "4.0", "5.6", "8.0", "11", "16"];
  const shutters = ["1/8000", "1/4000", "1/2000", "1/1000", "1/500", "1/250", "1/125", "1/60", "1/30", "1/15", "1s"];
  const isos = ["100", "200", "400", "800", "1600", "3200", "6400", "12800"];
  const focalLengths = ["14mm", "24mm", "35mm", "50mm", "85mm", "100mm", "200mm", "400mm"];
  const aspectRatios = ["1:1", "16:9", "9:16", "4:3", "3:2", "2:1", "21:9"];

  const mapToEnglish = {
    media: { "Bild": "High-resolution professional photograph of", "Video": "Cinematic high-quality video footage of" },
    camera: {
      "Retro": "vintage retro camera", "Analog": "classic analog camera", "Digital": "high-end digital sensor",
      "Spiegellos": "modern mirrorless camera", "Spiegelreflex": "professional DSLR camera", "Vintage": "authentic vintage camera equipment",
      "35mm Film": "35mm film camera", "Mittelformat": "medium format camera with shallow depth of field",
      "Großformat": "large format camera with immense detail", "GoPro": "action-packed GoPro camera", "iPhone": "shot on iPhone, mobile photography style"
    },
    film: {
      "Kodak Portra 400": "Kodak Portra 400, warm skin tones, fine grain",
      "Fujifilm Superia": "Fujifilm Superia, vibrant greens and cool shadows",
      "Schwarz-Weiß": "timeless black and white film, high contrast",
      "CineStill 800T": "CineStill 800T, tungsten balanced, cinematic halation",
      "Polaroid": "instant Polaroid film, soft edges, nostalgic chemicals",
      "Technicolor": "classic Technicolor 3-strip process, saturated primary colors",
      "Ektachrome": "Kodak Ektachrome color reversal film, vivid colors",
      "Standard Digital": "sharp digital clarity, clean professional look",
      "VHS-Stil": "80s VHS tracking effects, scanlines, chromatic aberration",
      "Super 8": "Super 8mm home movie style, grainy, jittery frames",
      "Kodak Gold 200": "Kodak Gold 200, consumer-grade warmth, nostalgic feeling",
      "Ilford HP5": "Ilford HP5 black and white, gritty grain, classic look"
    },
    perspective: {
      "Weitwinkel": "wide angle lens, capturing the vast environment", "Nahaufnahme": "close-up shot, focusing on intricate details",
      "Vogelperspektive": "bird's eye view from high above", "Froschperspektive": "worm's eye view, looking up from the ground",
      "Draufsicht": "top-down flat lay perspective", "Augenhöhe": "eye-level perspective, creating a direct connection",
      "Schräger Winkel": "dutch angle, creating tension and dynamism", "Makro": "extreme macro photography, microscopic details visible",
      "Extreme Nahaufnahme": "extreme close-up, intense focus on a specific feature", "Totale": "full wide shot, showing the subject in its entirety",
      "Halbtotale": "medium wide shot, balancing subject and environment", "Ego-Perspektive": "first-person point of view (POV)"
    },
    lighting: {
      "Goldene Stunde": "bathed in warm golden hour light, long soft shadows", "Cinematisch": "cinematic lighting with high dynamic range and moody shadows",
      "Neon-Licht": "vibrant neon lights, Cyberpunk aesthetic, glowing reflections", "Weiches Licht": "diffused soft lighting, gentle transitions",
      "Hartes Licht": "hard direct sunlight, dramatic high-contrast shadows", "Studio-Beleuchtung": "professional studio lighting setup, rim lights, softboxes",
      "Natürliches Licht": "natural ambient daylight, realistic reflections", "Düster": "low-key moody lighting, mysterious atmosphere", "Bewölkt": "soft overcast daylight, flat even lighting"
    },
    mood: {
      "Nostalgisch": "evoking a sense of nostalgia and memory", "Futuristisch": "sleek futuristic aesthetic, clean lines, advanced tech feel",
      "Raw/Authentisch": "raw and authentic documentary style, unpolished beauty", "Ätherisch": "ethereal and otherworldly, glowing halos, soft focus",
      "Traumhaft": "dreamlike surreal atmosphere, soft hazy textures", "Professionell": "clean professional commercial look, high-end production",
      "Dunkel": "dark and gritty atmosphere, intense and heavy", "Lebhaft": "vibrant and energetic, bursting with life and color"
    }
  };

  const translateNegative = (text: string) => {
    const mapping: Record<string, string> = {
      "unscharf": "blurry",
      "schlechte qualität": "low quality",
      "verzerrt": "distorted",
      "wasserzeichen": "watermark",
      "unterschrift": "signature",
      "körnig": "grainy",
      "niedrige auflösung": "low resolution",
      "hässlich": "ugly",
      "nicht im fokus": "out of focus",
      "text": "text",
      "rahmen": "frame",
      "logo": "logo",
      "deformiert": "deformed",
      "mutiert": "mutated",
      "unrealistisch": "unrealistic"
    };

    let translated = text.toLowerCase();
    Object.entries(mapping).forEach(([ger, eng]) => {
      translated = translated.replace(new RegExp(ger, 'g'), eng);
    });
    return translated;
  };

  const handleSurpriseMe = () => {
    const randomItems = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
    const randomSubjects = [
      "Ein Elefant in einer Londoner U-Bahn",
      "Ein viktorianisches Labor auf dem Mars",
      "Ein schwebender Zen-Garten in den Wolken",
      "Ein Cyberpunk Streetfood-Stand bei Regen",
      "Ein mittelalterlicher Ritter, der eine Pizza isst",
      "Eine leuchtende Qualle in einem Waldsee",
      "Ein nostalgischer 90er Jahre Skatepark im Sonnenuntergang"
    ];

    setConfig({
      subject: randomItems(randomSubjects),
      mediaType: randomItems(["Bild", "Video"]),
      cameraType: randomItems(cameraTypes),
      filmStock: randomItems(filmStocks),
      perspective: randomItems(perspectives),
      lighting: randomItems(lightings),
      mood: randomItems(moods),
      aperture: randomItems(apertures),
      shutterSpeed: randomItems(shutters),
      iso: randomItems(isos),
      focalLength: randomItems(focalLengths),
      aspectRatio: randomItems(aspectRatios),
      negativePrompt: "unscharf, schlechte Qualität, verzerrt, Wasserzeichen"
    });

    toast({ title: "Überraschung!", description: "Zufällige Kombination generiert." });
  };

  const handleAutoOptimize = () => {
    if (!config.subject) {
      toast({ title: "Fehler", description: "Bitte gib zuerst ein Thema ein, damit ich es analysieren kann.", variant: "destructive" });
      return;
    }

    const text = config.subject.toLowerCase();
    let updates: Partial<typeof config> = {};

    if (text.includes("portrait") || text.includes("gesicht") || text.includes("mensch") || text.includes("frau") || text.includes("mann")) {
      updates = { perspective: "Nahaufnahme", lighting: "Weiches Licht", filmStock: "Kodak Portra 400", aperture: "1.8", focalLength: "85mm", mood: "Raw/Authentisch" };
    } else if (text.includes("nacht") || text.includes("neon") || text.includes("dunkel") || text.includes("stadt")) {
      updates = { lighting: "Neon-Licht", mood: "Futuristisch", filmStock: "CineStill 800T", aperture: "2.8", focalLength: "35mm", perspective: "Weitwinkel" };
    } else if (text.includes("landschaft") || text.includes("berge") || text.includes("natur") || text.includes("see")) {
      updates = { perspective: "Weitwinkel", lighting: "Goldene Stunde", filmStock: "Fujifilm Superia", aperture: "8.0", focalLength: "24mm", mood: "Raw/Authentisch" };
    } else if (text.includes("auto") || text.includes("rennen") || text.includes("schnell")) {
      updates = { perspective: "Froschperspektive", lighting: "Hartes Licht", shutterSpeed: "1/2000", aperture: "4.0", focalLength: "35mm", mood: "Lebhaft" };
    } else if (text.includes("makro") || text.includes("detail") || text.includes("insekt") || text.includes("blume")) {
      updates = { perspective: "Makro", lighting: "Studio-Beleuchtung", aperture: "2.8", focalLength: "100mm", mood: "Professionell" };
    } else if (text.includes("weltraum") || text.includes("station") || text.includes("zukunft")) {
      updates = { mood: "Futuristisch", lighting: "Cinematisch", cameraType: "Digital", filmStock: "Standard Digital", focalLength: "24mm" };
    } else {
      // Default Professional fallback
      updates = { perspective: "Augenhöhe", lighting: "Cinematisch", mood: "Professionell", aperture: "2.8", focalLength: "35mm" };
    }

    setConfig(prev => ({ ...prev, ...updates }));
    toast({
      title: "Optimiert!",
      description: "Einstellungen wurden basierend auf deinem Thema angepasst.",
      duration: 3000
    });
  };

  const generatePrompt = () => {
    if (!config.subject) {
      toast({ title: "Hinweis", description: "Bitte gib zuerst ein Thema ein.", variant: "destructive" });
      return;
    }
    const engMedia = mapToEnglish.media[config.mediaType];
    const engCamera = mapToEnglish.camera[config.cameraType as keyof typeof mapToEnglish.camera];
    const engFilm = mapToEnglish.film[config.filmStock as keyof typeof mapToEnglish.film];
    const engPersp = mapToEnglish.perspective[config.perspective as keyof typeof mapToEnglish.perspective];
    const engLight = mapToEnglish.lighting[config.lighting as keyof typeof mapToEnglish.lighting];
    const engMood = mapToEnglish.mood[config.mood as keyof typeof mapToEnglish.mood];

    const techInfo = `camera settings: f/${config.aperture}, focal length ${config.focalLength}, shutter speed ${config.shutterSpeed}, ISO ${config.iso}.`;
    const engNegative = translateNegative(config.negativePrompt);

    const fullPrompt = `${engMedia} ${config.subject}. The scene is ${engPersp}, captured using a ${engCamera}. ${techInfo} The visual style is defined by ${engFilm}, ${engLight}, all contributing to a ${engMood} feeling. Extremely detailed textures, hyper-realistic, volumetric lighting, photorealistic rendering, 8k resolution, masterfully composed. --ar ${config.aspectRatio} --no ${engNegative}`;
    setGeneratedPrompt(fullPrompt);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    toast({ title: "Kopiert!", description: "Prompt in der Zwischenablage." });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (!generatedPrompt) return;
    onSave({
      id: Math.random().toString(36).substr(2, 9),
      title: config.subject.slice(0, 30),
      content: generatedPrompt,
      mediaType: config.mediaType,
      cameraType: config.cameraType,
      filmStock: config.filmStock,
      perspective: config.perspective,
      lighting: config.lighting,
      mood: config.mood,
      aperture: config.aperture,
      shutterSpeed: config.shutterSpeed,
      iso: config.iso,
      focalLength: config.focalLength,
      aspectRatio: config.aspectRatio,
      negativePrompt: config.negativePrompt,
      tags: ["generiert", config.mediaType.toLowerCase()],
      createdAt: new Date().toISOString(),
    });
    toast({ title: "Gespeichert!", description: "In Datenbank abgelegt." });
  };

  return (
    <Card className="border-none shadow-[0_30px_100px_rgba(16,185,129,0.15)] bg-white/80 dark:bg-zinc-950/80 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-accent" />
      <CardHeader className="pt-10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl">
               <Wand2 className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-3xl font-black tracking-tight">Prompt-Generator</CardTitle>
          </div>
          <Button
            variant="outline"
            onClick={handleSurpriseMe}
            className="rounded-xl border-primary/20 hover:bg-primary/5 gap-2 font-bold transition-all"
          >
            <Dices className="w-4 h-4 text-primary" /> Überrasch mich
          </Button>
        </div>
        <CardDescription className="text-lg font-medium">Lass deiner Kreativität freien Lauf oder lass dich überraschen.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 p-10">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="subject" className="text-base font-black text-primary uppercase tracking-widest flex items-center gap-2">
              <Zap className="w-4 h-4 fill-primary" /> 1. Was ist dein Thema?
            </Label>
            <Button
              size="sm"
              variant="secondary"
              onClick={handleAutoOptimize}
              className="rounded-xl h-8 text-[10px] font-black uppercase tracking-widest gap-2 animate-pulse hover:animate-none bg-primary/10 text-primary border-none"
            >
              <BrainCircuit className="w-3.5 h-3.5" /> KI-Optimierung
            </Button>
          </div>
          <Textarea
            id="subject"
            placeholder="Beschreibe deine Szene..."
            className="h-32 resize-none rounded-3xl border-2 border-primary/5 bg-white/50 dark:bg-black/20 focus:border-primary/30 focus:ring-primary/20 transition-all text-lg p-6"
            value={config.subject}
            onChange={(e) => setConfig({ ...config, subject: e.target.value })}
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="negative" className="text-[10px] font-black uppercase tracking-widest text-red-500/80 flex items-center gap-2">
            <Ban className="w-3.5 h-3.5" /> Negative Einflüsse (Ausschlüsse)
          </Label>
          <Input
            id="negative"
            placeholder="Was soll NICHT im Bild sein? (z.B. Texte, Unschärfe...)"
            className="h-12 rounded-2xl border-2 border-red-500/5 bg-red-500/5 focus:border-red-500/20 transition-all font-medium px-6 text-sm"
            value={config.negativePrompt}
            onChange={(e) => setConfig({ ...config, negativePrompt: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { label: "Medien-Typ", value: config.mediaType, key: "mediaType", options: ["Bild", "Video"] },
            { label: "Kamera", value: config.cameraType, key: "cameraType", options: cameraTypes },
            { label: "Film / Look", value: config.filmStock, key: "filmStock", options: filmStocks },
            { label: "Perspektive", value: config.perspective, key: "perspective", options: perspectives },
            { label: "Beleuchtung", value: config.lighting, key: "lighting", options: lightings },
            { label: "Stimmung", value: config.mood, key: "mood", options: moods },
            { label: "Seitenverhältnis", value: config.aspectRatio, key: "aspectRatio", options: aspectRatios },
          ].map((field) => (
            <div key={field.key} className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">{field.label}</Label>
              <Select value={field.value as string} onValueChange={(v) => setConfig({ ...config, [field.key]: v })}>
                <SelectTrigger className="rounded-2xl h-14 border-2 border-primary/5 bg-white/50 dark:bg-black/20 hover:border-primary/20 transition-all font-bold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  {field.options.map(t => <SelectItem key={t} value={t} className="rounded-xl my-0.5">{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>

        {/* Technical Extended Options */}
        <div className="p-6 bg-primary/5 rounded-[2rem] border border-primary/10">
          <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4 block text-center">Erweiterte Kamera-Einstellungen</Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="space-y-2 text-center">
              <Label className="text-[9px] font-bold text-muted-foreground">Blende (Aperture)</Label>
              <Select value={config.aperture} onValueChange={(v) => setConfig({ ...config, aperture: v })}>
                <SelectTrigger className="h-10 rounded-xl bg-white/50 dark:bg-black/20 border-primary/5 font-bold"><SelectValue /></SelectTrigger>
                <SelectContent>{apertures.map(a => <SelectItem key={a} value={a}>f/{a}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2 text-center">
              <Label className="text-[9px] font-bold text-muted-foreground">Brennweite</Label>
              <Select value={config.focalLength} onValueChange={(v) => setConfig({ ...config, focalLength: v })}>
                <SelectTrigger className="h-10 rounded-xl bg-white/50 dark:bg-black/20 border-primary/5 font-bold"><SelectValue /></SelectTrigger>
                <SelectContent>{focalLengths.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2 text-center">
              <Label className="text-[9px] font-bold text-muted-foreground">Belichtung</Label>
              <Select value={config.shutterSpeed} onValueChange={(v) => setConfig({ ...config, shutterSpeed: v })}>
                <SelectTrigger className="h-10 rounded-xl bg-white/50 dark:bg-black/20 border-primary/5 font-bold"><SelectValue /></SelectTrigger>
                <SelectContent>{shutters.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2 text-center">
              <Label className="text-[9px] font-bold text-muted-foreground">ISO-Wert</Label>
              <Select value={config.iso} onValueChange={(v) => setConfig({ ...config, iso: v })}>
                <SelectTrigger className="h-10 rounded-xl bg-white/50 dark:bg-black/20 border-primary/5 font-bold"><SelectValue /></SelectTrigger>
                <SelectContent>{isos.map(i => <SelectItem key={i} value={i}>ISO {i}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="pt-6">
          <Button onClick={generatePrompt} className="w-full h-16 text-xl font-black gap-3 shadow-[0_20px_40px_rgba(16,185,129,0.3)] hover:shadow-primary/40 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]">
            <Sparkles className="w-6 h-6 animate-pulse" /> PROMPT GENERIEREN
          </Button>
        </div>

        {generatedPrompt && (
          <div className="mt-12 p-8 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-[2rem] border-2 border-primary/10 relative overflow-hidden animate-in zoom-in-95 duration-500">
            <div className="absolute top-0 right-0 p-4">
               <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => setGeneratedPrompt("")} className="h-8 rounded-full hover:bg-white/50">
                    <RefreshCcw className="w-3.5 h-3.5" />
                  </Button>
               </div>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-4 block">Dein High-End Prompt:</span>
            <div className="bg-white/60 dark:bg-black/40 backdrop-blur-sm p-6 rounded-2xl border border-white/40 mb-8 shadow-sm">
              <p className="text-base font-bold italic leading-relaxed text-zinc-800 dark:text-zinc-200">
                {generatedPrompt}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button onClick={handleCopy} variant="outline" className="gap-2 h-14 rounded-2xl border-primary/20 hover:border-primary font-bold bg-white/50 transition-all">
                {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                KOPIEREN
              </Button>
              <Button onClick={handleSave} className="gap-2 h-14 rounded-2xl font-bold transition-all bg-secondary hover:bg-secondary/90 shadow-lg shadow-secondary/20">
                <Save className="w-5 h-5" /> SPEICHERN
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
