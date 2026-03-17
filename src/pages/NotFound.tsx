import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ChefHat, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Fehler: Benutzer hat versucht auf eine nicht existierende Route zuzugreifen:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="text-center max-w-md bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100">
        <div className="bg-primary/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8">
           <ChefHat className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-6xl font-black mb-4 text-slate-900">404</h1>
        <p className="text-2xl font-bold text-slate-700 mb-8">Hoppla! Diese Seite existiert nicht.</p>
        <p className="text-slate-500 mb-10 leading-relaxed">
          Es scheint, als ob dieser Link ins Leere führt. Keine Sorge, wir bringen dich zurück in die Küche.
        </p>
        <Button asChild className="h-14 px-10 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20 gap-2">
          <Link to="/">
            <Home className="w-5 h-5" /> Zurück zur Startseite
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
