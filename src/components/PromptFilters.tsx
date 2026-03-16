import { MediaType, CameraType, FilmStock, Perspective } from "../types/prompt";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Search, X } from "lucide-react";
import { Button } from "./ui/button";

interface FilterState {
  search: string;
  mediaType: string;
  cameraType: string;
  filmStock: string;
  perspective: string;
  onlyFavorites: boolean;
}

interface PromptFiltersProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  onReset: () => void;
}

export function PromptFilters({ filters, setFilters, onReset }: PromptFiltersProps) {
  const updateFilter = (key: keyof Omit<FilterState, 'onlyFavorites'>, value: string) => {
    setFilters({ ...filters, [key]: value === "all" ? "" : value });
  };

  const mediaTypes: MediaType[] = ["Bild", "Video"];
  const cameraTypes: CameraType[] = ["Retro", "Analog", "Digital", "Spiegellos", "Spiegelreflex", "Vintage", "35mm Film", "Mittelformat", "Großformat", "GoPro", "iPhone"];
  const filmStocks: FilmStock[] = ["Kodak Portra 400", "Fujifilm Superia", "Schwarz-Weiß", "CineStill 800T", "Polaroid", "Technicolor", "Ektachrome", "Standard Digital", "VHS-Stil", "Super 8", "Kodak Gold 200", "Ilford HP5"];
  const perspectives: Perspective[] = ["Weitwinkel", "Nahaufnahme", "Vogelperspektive", "Froschperspektive", "Draufsicht", "Augenhöhe", "Schräger Winkel", "Makro", "Extreme Nahaufnahme", "Totale", "Halbtotale", "Ego-Perspektive"];

  return (
    <div className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-2 border-primary/5 rounded-[2.5rem] p-8 shadow-2xl shadow-primary/5 mb-12 space-y-8 animate-in slide-in-from-top-4 duration-700 w-full">
      <div className="relative group">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
          <Search className="text-primary w-5 h-5 group-focus-within:scale-110 transition-transform" />
        </div>
        <Input
          placeholder="Durchsuche deine kreative Sammlung..."
          className="pl-14 h-16 rounded-[1.5rem] border-2 border-primary/5 bg-white/80 dark:bg-black/20 focus:border-primary/30 focus:ring-primary/10 transition-all text-lg font-medium shadow-inner"
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Medien-Typ", key: "mediaType", options: mediaTypes },
          { label: "Kamera-Modell", key: "cameraType", options: cameraTypes },
          { label: "Film / Look", key: "filmStock", options: filmStocks },
          { label: "Blickwinkel", key: "perspective", options: perspectives },
        ].map((filter) => (
          <div key={filter.key} className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">{filter.label}</Label>
            <Select
              value={(filters[filter.key as keyof Omit<FilterState, 'onlyFavorites'>] as string) || "all"}
              onValueChange={(v) => updateFilter(filter.key as keyof Omit<FilterState, 'onlyFavorites'>, v)}
            >
              <SelectTrigger className="rounded-2xl h-14 border-2 border-primary/5 bg-white/80 dark:bg-black/20 hover:border-primary/20 transition-all font-bold">
                <SelectValue placeholder={`Alle ${filter.label}`} />
              </SelectTrigger>
              <SelectContent className="rounded-2xl max-h-[300px]">
                <SelectItem value="all" className="rounded-xl font-bold text-primary">Alle {filter.label}</SelectItem>
                {filter.options.map(t => <SelectItem key={t} value={t} className="rounded-xl my-0.5">{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>

      <div className="flex justify-center sm:justify-end pt-2">
        <Button variant="ghost" onClick={onReset} className="text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-full px-6 transition-all">
          <X className="w-4 h-4 mr-2" /> Filter zurücksetzen
        </Button>
      </div>
    </div>
  );
}
