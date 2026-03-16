import { useState, useMemo, useEffect } from "react";
import { mockPrompts } from "../data/mockData";
import { PromptCard } from "../components/PromptCard";
import { PromptFilters } from "../components/PromptFilters";
import { AddPromptModal } from "../components/AddPromptModal";
import { EditPromptModal } from "../components/EditPromptModal";
import { PromptGenerator } from "../components/PromptGenerator";

import { ThemeToggle } from "../components/ThemeToggle";
import { Prompt } from "../types/prompt";
import { Sparkles, Database, LayoutGrid, Wand2, Heart, Download, Upload } from "lucide-react";
import { toast } from "../hooks/use-toast";
import { Button } from "../components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

export default function Index() {
  const [prompts, setPrompts] = useState<Prompt[]>(() => {
    const saved = localStorage.getItem("prompt_db_content");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return mockPrompts;
      }
    }
    return mockPrompts;
  });

  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);

  const [filters, setFilters] = useState({

    search: "",
    mediaType: "",
    cameraType: "",
    filmStock: "",
    perspective: "",
    onlyFavorites: false,
  });

  // Save to local storage whenever prompts change
  useEffect(() => {
    localStorage.setItem("prompt_db_content", JSON.stringify(prompts));
  }, [prompts]);

  const filteredPrompts = useMemo(() => {
    return prompts.filter((p) => {
      const matchesSearch = 
        p.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.content.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(filters.search.toLowerCase()));
      
      const matchesMediaType = !filters.mediaType || p.mediaType === filters.mediaType;
      const matchesCameraType = !filters.cameraType || p.cameraType === filters.cameraType;
      const matchesFilmStock = !filters.filmStock || p.filmStock === filters.filmStock;
      const matchesPerspective = !filters.perspective || p.perspective === filters.perspective;
      const matchesFavorites = !filters.onlyFavorites || p.isFavorite;

      return matchesSearch && matchesMediaType && matchesCameraType && matchesFilmStock && matchesPerspective && matchesFavorites;
    });
  }, [prompts, filters]);

  const handleAddPrompt = (newPrompt: Prompt) => {
    setPrompts([newPrompt, ...prompts]);
  };

  const handleToggleFavorite = (id: string) => {
    setPrompts(prev => prev.map(p => p.id === id ? { ...p, isFavorite: !p.isFavorite } : p));
  };

  const handleDeletePrompt = (id: string) => {
    if (window.confirm("Bist du sicher, dass du diesen Prompt löschen möchtest?")) {
      setPrompts(prev => prev.filter(p => p.id !== id));
      toast({ title: "Gelöscht", description: "Der Prompt wurde aus der Datenbank entfernt." });
    }
  };

  const handleUpdatePrompt = (updatedPrompt: Prompt) => {
    setPrompts(prev => prev.map(p => p.id === updatedPrompt.id ? updatedPrompt : p));
  };

  const handleTagClick = (tag: string) => {

    setFilters(prev => ({ ...prev, search: tag }));
    // Smooth scroll to search filters if needed, but the search is reactive
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(prompts, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `promptdb_backup_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({ title: "Export erfolgreich", description: "Deine Datenbank wurde als JSON gespeichert." });
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        if (Array.isArray(json)) {
          setPrompts(json);
          toast({ title: "Import erfolgreich", description: `${json.length} Prompts wurden geladen.` });
        } else {
          throw new Error("Ungültiges Dateiformat");
        }
      } catch (err) {
        toast({ title: "Fehler beim Import", description: "Die Datei konnte nicht gelesen werden.", variant: "destructive" });
      }
    };
    reader.readAsText(file);
  };

  const handleResetFilters = () => {

    setFilters({
      search: "",
      mediaType: "",
      cameraType: "",
      filmStock: "",
      perspective: "",
      onlyFavorites: false,
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative p-1 bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-primary/10 overflow-hidden">
                <img
                  src="/logo.png"
                  alt="PromptDB Logo"
                  className="w-10 h-10 object-contain dark:invert transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">PromptDB</h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">KI Creative Studio</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <ThemeToggle />
             <AddPromptModal onAdd={handleAddPrompt} />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 relative">
        <div className="relative max-w-6xl mx-auto mb-20 p-8 md:p-24 rounded-[3rem] overflow-hidden group shadow-2xl shadow-primary/20">
          {/* Hero Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/hero-bg.png"
              alt="Futuristic Photorealistic Creative Studio"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/70" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-10">
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tight leading-[1.1] text-white drop-shadow-2xl">
              Gestalte die <span className="text-primary italic drop-shadow-lg">Zukunft</span> deiner <span className="text-secondary drop-shadow-lg">Bilder</span>
            </h2>
            <p className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto font-bold leading-relaxed drop-shadow-md bg-black/10 backdrop-blur-md rounded-[2rem] p-6 border border-white/10">
              Wähle deine Kamera, den Film-Look und die Perspektive. Unser Generator erstellt dir den perfekten, detailreichen Prompt.
            </p>
          </div>
        </div>

        <Tabs defaultValue="generator" className="space-y-12">
          <div className="flex justify-center">
            <TabsList className="h-16 p-1.5 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-primary/5 shadow-xl shadow-primary/5">
              <TabsTrigger value="generator" className="rounded-xl px-10 text-base font-bold flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300">
                <Wand2 className="w-5 h-5" /> Generator
              </TabsTrigger>
              <TabsTrigger value="database" className="rounded-xl px-10 text-base font-bold flex items-center gap-2 data-[state=active]:bg-secondary data-[state=active]:text-white transition-all duration-300">
                <LayoutGrid className="w-5 h-5" /> Datenbank
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="generator" className="max-w-4xl mx-auto focus-visible:outline-none">
            <PromptGenerator onSave={handleAddPrompt} />
          </TabsContent>

          <TabsContent value="database" className="space-y-8 focus-visible:outline-none">
            <div className="flex items-center gap-4 mb-4">
               <PromptFilters 
                filters={filters} 
                setFilters={setFilters} 
                onReset={handleResetFilters} 
              />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
              <h3 className="text-sm font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                <div className="w-8 h-1 bg-primary rounded-full" />
                {filteredPrompts.length} Gespeicherte Werke
              </h3>
              
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExport}
                  className="rounded-xl gap-2 font-bold border-primary/20 hover:bg-primary/5"
                >
                  <Download className="w-4 h-4" /> Backup
                </Button>
                
                <div className="relative">
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                    title="Backup hochladen"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl gap-2 font-bold border-primary/20 hover:bg-primary/5"
                  >
                    <Upload className="w-4 h-4" /> Import
                  </Button>
                </div>

                <Button
                  variant={filters.onlyFavorites ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setFilters({ ...filters, onlyFavorites: !filters.onlyFavorites })}
                  className="rounded-xl gap-2 font-bold"
                >
                  <Heart className={`w-4 h-4 ${filters.onlyFavorites ? 'fill-current' : ''}`} />
                  {filters.onlyFavorites ? "Nur Favoriten" : "Favoriten"}
                </Button>
              </div>
            </div>

            {filteredPrompts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPrompts.map((prompt) => (
                  <PromptCard
                    key={prompt.id}
                    prompt={prompt}
                    onToggleFavorite={handleToggleFavorite}
                    onTagClick={handleTagClick}
                    onEdit={setEditingPrompt}
                    onDelete={handleDeletePrompt}
                  />
                ))}

              </div>
            ) : (
              <div className="py-24 text-center border-4 border-dashed rounded-[2.5rem] bg-white dark:bg-zinc-900/40 border-primary/10">
                <div className="mb-4 inline-flex p-4 bg-primary/5 rounded-full">
                  <Database className="w-12 h-12 text-primary/40" />
                </div>
                <p className="text-zinc-500 text-lg font-medium">Keine passenden Einträge gefunden.</p>
                <Button variant="link" onClick={handleResetFilters} className="mt-2 text-primary font-bold">Filter zurücksetzen</Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t py-12 mt-20 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-medium text-muted-foreground flex items-center justify-center gap-2">
            Made with <Sparkles className="w-4 h-4 text-primary" /> by PromptDB
          </p>
          <p className="text-[10px] text-muted-foreground mt-2 uppercase tracking-widest">© {new Date().getFullYear()} - Alle Rechte vorbehalten</p>
        </div>
      </footer>

      <EditPromptModal
        prompt={editingPrompt}
        onClose={() => setEditingPrompt(null)}
        onUpdate={handleUpdatePrompt}
      />
    </div>
  );
}
