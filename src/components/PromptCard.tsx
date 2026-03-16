import { Prompt } from "../types/prompt";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Camera, Film, Video, Image as ImageIcon, Copy, Check, Calendar, Sparkles, Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "../hooks/use-toast";

interface PromptCardProps {
  prompt: Prompt;
  onToggleFavorite?: (id: string) => void;
  onTagClick?: (tag: string) => void;
}

export function PromptCard({ prompt, onToggleFavorite, onTagClick }: PromptCardProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    toast({
      title: "Kopiert!",
      description: "Prompt wurde in die Zwischenablage kopiert.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <Card className="group relative overflow-hidden border-none transition-all duration-500 hover:shadow-[0_20px_50px_rgba(16,185,129,0.2)] hover:-translate-y-2 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md rounded-[2rem]">

      {/* Decorative gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <CardHeader className="pb-2 relative">
        <div className="flex items-center justify-between mb-3">
          <Badge className="bg-gradient-to-r from-primary to-primary/80 text-white border-none px-3 py-1 font-bold text-[10px] uppercase tracking-wider">
            {prompt.mediaType === 'Video' ? <Video className="w-3 h-3 mr-1.5" /> : <ImageIcon className="w-3 h-3 mr-1.5" />}
            {prompt.mediaType}
          </Badge>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onToggleFavorite?.(prompt.id)}
              className={`p-2 rounded-full transition-all duration-300 ${prompt.isFavorite ? 'bg-red-500/10 text-red-500 scale-110' : 'bg-zinc-500/10 text-zinc-400 hover:text-red-400'}`}
            >
              <Heart className={`w-4 h-4 ${prompt.isFavorite ? 'fill-current' : ''}`} />
            </button>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">
              <Calendar className="w-3 h-3 text-secondary" />
              {formatDate(prompt.createdAt)}
            </div>
          </div>
        </div>
        <CardTitle className="text-xl font-black tracking-tight line-clamp-1 group-hover:text-primary transition-colors">{prompt.title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5 relative">
        <div className="relative p-4 rounded-2xl bg-white dark:bg-zinc-800/50 border border-primary/5 shadow-inner group-hover:border-primary/20 transition-all">
          <p className="text-sm text-muted-foreground line-clamp-3 italic leading-relaxed">
            "{prompt.content}"
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-[11px]">
          <div className="flex flex-col gap-1 p-3 rounded-2xl bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
            <div className="flex items-center gap-1.5 text-primary">
              <Camera className="w-3.5 h-3.5" />
              <span className="font-black uppercase tracking-widest text-[9px]">Kamera</span>
            </div>
            <span className="font-bold truncate text-zinc-700 dark:text-zinc-300">{prompt.cameraType}</span>
          </div>
          <div className="flex flex-col gap-1 p-3 rounded-2xl bg-secondary/5 border border-secondary/10 hover:bg-secondary/10 transition-colors">
            <div className="flex items-center gap-1.5 text-secondary">
              <Film className="w-3.5 h-3.5" />
              <span className="font-black uppercase tracking-widest text-[9px]">Film/Look</span>
            </div>
            <span className="font-bold truncate text-zinc-700 dark:text-zinc-300">{prompt.filmStock}</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-accent/5 border border-accent/10 col-span-2 hover:bg-accent/10 transition-colors">
             <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
             <div className="flex-1">
                <span className="text-accent font-black uppercase tracking-widest text-[9px] block">Perspektive</span>
                <span className="font-bold text-zinc-700 dark:text-zinc-300">{prompt.perspective}</span>
             </div>
          </div>
        </div>

        {(prompt.aperture || prompt.iso || prompt.shutterSpeed || prompt.focalLength || prompt.aspectRatio) && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 border-t border-dashed border-primary/10">
            {prompt.aperture && (
              <div className="text-[9px] font-bold text-center bg-zinc-50 dark:bg-zinc-800 p-1 rounded-lg">
                <span className="text-muted-foreground mr-1">F/</span>{prompt.aperture}
              </div>
            )}
            {prompt.focalLength && (
              <div className="text-[9px] font-bold text-center bg-zinc-50 dark:bg-zinc-800 p-1 rounded-lg">
                {prompt.focalLength}
              </div>
            )}
            {prompt.shutterSpeed && (
              <div className="text-[9px] font-bold text-center bg-zinc-50 dark:bg-zinc-800 p-1 rounded-lg">
                <span className="text-muted-foreground mr-1">SEC:</span>{prompt.shutterSpeed}
              </div>
            )}
            {prompt.iso && (
              <div className="text-[9px] font-bold text-center bg-zinc-50 dark:bg-zinc-800 p-1 rounded-lg">
                <span className="text-muted-foreground mr-1">ISO:</span>{prompt.iso}
              </div>
            )}
            {prompt.aspectRatio && (
              <div className="text-[9px] font-bold text-center bg-primary/10 text-primary p-1 rounded-lg">
                AR {prompt.aspectRatio}
              </div>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-2 pt-2">
          {prompt.tags.map(tag => (
            <Badge
              key={tag}
              variant="outline"
              className="text-[9px] uppercase tracking-tighter font-black px-2 py-0.5 rounded-full border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all cursor-pointer"
              onClick={() => onTagClick?.(tag)}
            >
              #{tag}
            </Badge>
          ))}
        </div>

      </CardContent>

      <CardFooter className="pt-4 pb-6 px-6 relative">
        <Button 
          variant="outline" 
          className="w-full h-12 gap-2 transition-all duration-300 active:scale-95 bg-white dark:bg-zinc-800 hover:bg-primary hover:text-white border-primary/20 hover:border-primary shadow-lg shadow-primary/5 hover:shadow-primary/20 rounded-xl font-bold" 
          onClick={copyToClipboard}
        >
          {copied ? <Check className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
          {copied ? "Kopiert" : "Prompt kopieren"}
        </Button>
      </CardFooter>
    </Card>
  );
}
