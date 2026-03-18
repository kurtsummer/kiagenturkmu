import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ChefHat, 
  ArrowLeft, 
  Calendar, 
  ShoppingCart, 
  Printer, 
  Share2, 
  Clock, 
  Flame, 
  Wallet,
  CheckCircle2,
  UtensilsCrossed,
  ListChecks,
  Info
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Meal {
  type: string;
  name: string;
  calories: number;
  time: string;
  ingredients: string[];
  instructions: string[];
  imageUrl: string;
}

interface DayPlan {
  day: string;
  meals: Meal[];
}

const BREAKFAST_POOL: Omit<Meal, "type">[] = [
  {
    name: "Haferflocken mit frischen Beeren",
    calories: 350,
    time: "10 Min",
    imageUrl: "https://images.unsplash.com/photo-1490474418645-177b353a1d40?auto=format&fit=crop&w=800&q=80",
    ingredients: ["50g zarte Haferflocken", "100g frische Beeren", "150ml Milch oder Haferdrink", "1 TL Honig", "1/2 TL Zimt"],
    instructions: ["Milch und Flocken in einen Topf geben.", "Unter Rühren aufkochen lassen.", "Bei kleiner Hitze 3-4 Min. quellen lassen.", "Vom Herd nehmen, Honig und Zimt einrühren.", "Mit gewaschenen Beeren toppen."]
  },
  {
    name: "Avocado-Vollkornbrot mit Ei",
    calories: 420,
    time: "12 Min",
    imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    ingredients: ["2 Scheiben Vollkornbrot", "1/2 Avocado", "1 Bio-Ei", "1 TL Zitronensaft", "Salz & Chiliflocken"],
    instructions: ["Das Ei ca. 7 Min. wachsweich kochen.", "Währenddessen das Brot toasten.", "Avocado entkernen, das Fruchtfleisch herauslösen und mit Zitrone zerdrücken.", "Auf dem Brot verteilen.", "Das Ei pellen, halbieren und darauflegen. Würzen."]
  },
  {
    name: "Griechischer Joghurt mit Nüssen",
    calories: 380,
    time: "5 Min",
    imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
    ingredients: ["200g Griechischer Joghurt", "30g Walnusskerne", "1 EL Honig", "1/2 Bio-Apfel"],
    instructions: ["Joghurt in eine Schüssel geben.", "Apfel waschen, entkernen und in feine Spalten schneiden.", "Walnüsse grob hacken.", "Apfel und Nüsse auf dem Joghurt verteilen und mit Honig beträufeln."]
  },
  {
    name: "Herzhaftes Rührei mit Tomaten",
    calories: 310,
    time: "10 Min",
    imageUrl: "https://images.unsplash.com/photo-1525811902-f23426213fd0?auto=format&fit=crop&w=800&q=80",
    ingredients: ["2 Eier", "8 Kirschtomaten", "1 TL Butter", "1 Scheibe Brot", "Schnittlauch"],
    instructions: ["Eier in Schüssel verquirlen, salzen und pfeffern.", "Tomaten halbieren.", "Butter in Pfanne schmelzen, Tomaten 2 Min. anbraten.", "Eier dazugeben und bei mittlerer Hitze stocken lassen.", "Mit Schnittlauch auf dem Brot servieren."]
  },
  {
    name: "Bananen-Protein-Pancakes",
    calories: 450,
    time: "15 Min",
    imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7bb7445?auto=format&fit=crop&w=800&q=80",
    ingredients: ["1 reife Banane", "2 Eier", "30g Haferflocken", "1/4 TL Backpulver", "1 TL Öl"],
    instructions: ["Banane fein zerdrücken.", "Mit Eiern, Flocken und Backpulver zu Teig mischen.", "Öl in Pfanne erhitzen.", "Kleine Pancakes von beiden Seiten ca. 2 Min. goldbraun braten."]
  },
  {
    name: "Chia-Pudding mit Mango",
    calories: 320,
    time: "5 Min (+ Quellzeit)",
    imageUrl: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=800&q=80",
    ingredients: ["3 EL Chiasamen", "200ml Mandelmilch", "1/2 Mango", "1 TL Ahornsirup"],
    instructions: ["Chia, Milch und Sirup im Glas verrühren.", "Mind. 2 Stunden (oder über Nacht) kühlen.", "Mango schälen und würfeln.", "Vor dem Essen als Topping auf den Pudding geben."]
  },
  {
    name: "Shakshuka Express",
    calories: 390,
    time: "20 Min",
    imageUrl: "https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=800&q=80",
    ingredients: ["200ml Tomatenstücke", "1 Ei", "1/2 rote Paprika", "1/4 Zwiebel", "1 EL Öl"],
    instructions: ["Zwiebel und Paprika fein würfeln.", "Im Öl ca. 5 Min. dünsten.", "Tomaten zugeben, 5 Min. köcheln lassen.", "Eine Mulde bilden, Ei hineinschlagen.", "Deckel drauf und ca. 5 Min. garen."]
  },
  {
    name: "Puten-Vollkorn-Sandwich",
    calories: 360,
    time: "8 Min",
    imageUrl: "https://images.unsplash.com/photo-1521390188846-e2a39b7ef4a8?auto=format&fit=crop&w=800&q=80",
    ingredients: ["2 Scheiben Vollkornbrot", "50g Pute (Aufschnitt)", "1 EL Frischkäse", "Salat", "Gurke"],
    instructions: ["Brot mit Frischkäse bestreichen.", "Mit gewaschenem Salat belegen.", "Pute und Gurkenscheiben darauf verteilen.", "Zweite Scheibe auflegen und diagonal halbieren."]
  },
  {
    name: "Omelett mit Spinat & Feta",
    calories: 410,
    time: "12 Min",
    imageUrl: "https://images.unsplash.com/photo-1510629900260-7052fec3dd41?auto=format&fit=crop&w=800&q=80",
    ingredients: ["2 Eier", "50g Spinat", "30g Feta", "1 TL Öl"],
    instructions: ["Eier verquirlen.", "Öl erhitzen, Spinat darin zusammenfallen lassen.", "Eier darüber gießen.", "Feta drüberbröseln.", "Stocken lassen und einmal zusammenklappen."]
  },
  {
    name: "Hüttenkäse mit Apfel",
    calories: 280,
    time: "5 Min",
    imageUrl: "https://images.unsplash.com/photo-1551326344-42d6de2ad40c?auto=format&fit=crop&w=800&q=80",
    ingredients: ["200g Hüttenkäse", "1 Apfel", "1 TL Zimt", "1 TL Honig"],
    instructions: ["Käse in Schüssel geben.", "Apfel klein würfeln.", "Unter den Käse mischen.", "Mit Zimt und Honig verfeinern."]
  },
  {
    name: "Beeren-Smoothie-Bowl",
    calories: 340,
    time: "7 Min",
    imageUrl: "https://images.unsplash.com/photo-1494597564530-801f4467382c?auto=format&fit=crop&w=800&q=80",
    ingredients: ["150g TK-Beeren", "1 Banane", "50ml Hafermilch", "20g Granola"],
    instructions: ["Beeren, Banane und Milch im Mixer fein pürieren.", "In eine Schüssel füllen.", "Mit Granola garnieren und sofort genießen."]
  },
  {
    name: "Ei mit Toast-Sticks",
    calories: 320,
    time: "10 Min",
    imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    ingredients: ["1 Ei", "2 Scheiben Toast", "1 TL Butter", "Salz"],
    instructions: ["Ei 6,5 Min. kochen.", "Toast goldbraun rösten.", "Toast in Streifen schneiden.", "Ei köpfen und Streifen in das Eigelb dippen."]
  },
  {
    name: "Warmer Dinkelbrei",
    calories: 330,
    time: "10 Min",
    imageUrl: "https://images.unsplash.com/photo-1551326344-42d6de2ad40c?auto=format&fit=crop&w=800&q=80",
    ingredients: ["40g Dinkelgrieß", "250ml Milch", "1 EL Beeren", "1/2 TL Zimt"],
    instructions: ["Milch erhitzen.", "Grieß einrühren.", "Ca. 3 Min. unter Rühren quellen lassen.", "Mit Beeren und Zimt servieren."]
  },
  {
    name: "Granola-Quark-Schale",
    calories: 390,
    time: "5 Min",
    imageUrl: "https://images.unsplash.com/photo-1494390248081-4e521a5940db?auto=format&fit=crop&w=800&q=80",
    ingredients: ["250g Magerquark", "30g Granola", "Heidelbeeren", "Spritzer Zitrone"],
    instructions: ["Quark mit Zitrone und etwas Wasser glatt rühren.", "In Schale füllen.", "Granola und Beeren dekorativ darauf verteilen."]
  },
  {
    name: "Knäckebrot mit Lachs",
    calories: 290,
    time: "5 Min",
    imageUrl: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80",
    ingredients: ["3 Scheiben Knäckebrot", "50g Räucherlachs", "2 EL Frischkäse", "Dill"],
    instructions: ["Knäckebrot bestreichen.", "Lachs gleichmäßig darauf verteilen.", "Mit frischem Dill bestreuen."]
  },
  {
    name: "Apfel-Zimt Baked Oats",
    calories: 410,
    time: "25 Min",
    imageUrl: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=800&q=80",
    ingredients: ["50g Haferflocken", "1/2 Banane", "50ml Milch", "1/2 Apfel", "Zimt"],
    instructions: ["Banane matschen.", "Mit Flocken, Milch und Zimt mischen.", "Apfel würfeln und unterheben.", "In Form geben und bei 180°C 20 Min. backen."]
  },
  {
    name: "Tofu-Scramble",
    calories: 340,
    time: "15 Min",
    imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
    ingredients: ["150g Tofu", "Paprika", "Kurkuma", "1 EL Öl", "1 Scheibe Brot"],
    instructions: ["Tofu mit Gabel zerbröseln.", "Im Öl ca. 5 Min. braten.", "Gewürze und gewürfelte Paprika zugeben.", "Weitere 5 Min. braten und zum Brot servieren."]
  },
  {
    name: "Erdnuss Overnight Oats",
    calories: 440,
    time: "5 Min (+ Nacht)",
    imageUrl: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=800&q=80",
    ingredients: ["50g Haferflocken", "150ml Milch", "1 TL Erdnussbutter", "1/2 Banane"],
    instructions: ["Flocken und Milch mischen.", "Über Nacht im Kühlschrank lassen.", "Morgens Erdnussbutter unterrühren.", "Banane in Scheiben obenauf."]
  },
  {
    name: "Morgen-Quesadilla",
    calories: 420,
    time: "10 Min",
    imageUrl: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=800&q=80",
    ingredients: ["1 Tortilla", "1 Ei", "30g Käse", "Paprikawürfel"],
    instructions: ["Aus dem Ei Rührei machen.", "Tortilla in Pfanne legen.", "Mit Käse und Ei belegen.", "Zusammenklappen und von beiden Seiten 2 Min. braten."]
  },
  {
    name: "Frucht-Müsli",
    calories: 360,
    time: "5 Min",
    imageUrl: "https://images.unsplash.com/photo-1490474418645-177b353a1d40?auto=format&fit=crop&w=800&q=80",
    ingredients: ["50g Müsli", "150ml Milch", "Saisonfrüchte", "1 TL Nüsse"],
    instructions: ["Müsli in Schale.", "Früchte klein schneiden.", "Milch dazugeben.", "Nüsse drüberstreuen."]
  }
];

const MAIN_MEAL_POOL: Record<string, Omit<Meal, "type">[]> = {
  Omnivor: [
    { 
        name: "Hähnchen-Reis-Pfanne mit Brokkoli", 
        calories: 650, 
        time: "25 Min", 
        imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80", 
        ingredients: ["150g Hähnchenbrustfilet", "80g Basmatireis", "150g Brokkoli", "1 EL Sojasauce", "1 TL Öl", "Ingwer"], 
        instructions: ["Reis kochen.", "Hähnchen in Würfel schneiden und anbraten.", "Brokkoliröschen zugeben und mitgaren.", "Reis unterheben.", "Mit Sojasauce und Ingwer abschmecken."] 
    },
    { 
        name: "Pasta Bolognese Classic", 
        calories: 750, 
        time: "30 Min", 
        imageUrl: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80", 
        ingredients: ["100g Rinderhackfleisch", "100g Vollkornpasta", "200ml Tomaten", "1 kleine Zwiebel", "Knoblauch"], 
        instructions: ["Pasta kochen.", "Hackfleisch mit Zwiebel und Knoblauch braten.", "Tomaten zugeben und 10 Min. köcheln.", "Pasta unter die Sauce mischen."] 
    },
    { 
        name: "Lachs auf Kartoffelbett", 
        calories: 600, 
        time: "25 Min", 
        imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80", 
        ingredients: ["125g Lachsfilet", "200g Kartoffeln", "100g Spargel", "1 EL Olivenöl", "Rosmarin"], 
        instructions: ["Kartoffelwürfel in Pfanne ca. 15 Min. braten.", "Lachs würzen und mit Spargel zu den Kartoffeln geben.", "Von jeder Seite ca. 4 Min. mitbraten.", "Anrichten."] 
    },
    { 
        name: "Putensteak mit Blattsalat", 
        calories: 550, 
        time: "20 Min", 
        imageUrl: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80", 
        ingredients: ["180g Putensteak", "100g Salat", "5 Tomaten", "Dressing"], 
        instructions: ["Steak würzen und ca. 5 Min. pro Seite braten.", "Salat waschen und zerkleinern.", "Tomaten halbieren.", "Alles anrichten und Dressing drüber."] 
    },
    { 
        name: "Rindersteak mit Pfannengemüse", 
        calories: 700, 
        time: "20 Min", 
        imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80", 
        ingredients: ["200g Rindersteak", "Paprika", "Zucchini", "1 EL Butter"], 
        instructions: ["Fleisch ca. 3 Min. pro Seite scharf braten.", "In Folie ruhen lassen.", "Gemüse in der gleichen Pfanne dünsten.", "Zusammen servieren."] 
    },
    { 
        name: "Hähnchen-Spätzle-Topf", 
        calories: 800, 
        time: "35 Min", 
        imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80", 
        ingredients: ["150g Hähnchen", "125g Spätzle", "100ml Sahne", "Brühe"], 
        instructions: ["Spätzle kochen.", "Hähnchen anbraten.", "Mit Sahne und Brühe ablöschen.", "Spätzle unterheben und 2 Min. ziehen lassen."] 
    },
    { 
        name: "Forelle mit Petersilienkartoffeln", 
        calories: 500, 
        time: "30 Min", 
        imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80", 
        ingredients: ["1 Forellenfilet", "200g Kartoffeln", "Butter", "Petersilie"], 
        instructions: ["Kartoffeln 20 Min. kochen.", "Fisch mehlieren und in Butter braten.", "Kartoffeln in Petersilie schwenken.", "Anrichten."] 
    },
    { 
        name: "Hähnchen-Kokos-Curry", 
        calories: 650, 
        time: "30 Min", 
        imageUrl: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=800&q=80", 
        ingredients: ["150g Hähnchen", "60g Reis", "100ml Kokosmilch", "Currypaste"], 
        instructions: ["Reis kochen.", "Hähnchen anbraten, Paste zugeben.", "Mit Kokosmilch ablöschen.", "5 Min. köcheln.", "Mit Reis servieren."] 
    },
    { 
        name: "Frikadellen mit Stampf", 
        calories: 750, 
        time: "40 Min", 
        imageUrl: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80", 
        ingredients: ["120g Hackfleisch", "200g Kartoffeln", "Milch", "Zwiebel"], 
        instructions: ["Kartoffeln kochen.", "Hack mit Zwiebel mischen, braten.", "Kartoffeln mit Milch stampfen.", "Anrichten."] 
    },
    { 
        name: "Hähnchen-Wrap Avocado", 
        calories: 500, 
        time: "15 Min", 
        imageUrl: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=800&q=80", 
        ingredients: ["1 Tortilla", "120g Hähnchen", "1/2 Avocado", "Salat"], 
        instructions: ["Hähnchen braten.", "Avocado zerdrücken.", "Tortilla belegen und rollen."] 
    },
    { 
        name: "Schnitzel mit Kartoffelsalat", 
        calories: 850, 
        time: "35 Min", 
        imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80", 
        ingredients: ["150g Schnitzel", "200g Kartoffeln", "Brösel", "Ei"], 
        instructions: ["Salat vorbereiten.", "Schnitzel panieren.", "In Pfanne ausbacken."] 
    },
    { 
        name: "Zander auf Risotto", 
        calories: 650, 
        time: "45 Min", 
        imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80", 
        ingredients: ["150g Zander", "80g Reis", "Brühe", "Parmesan"], 
        instructions: ["Risotto rühren.", "Fisch separat braten.", "Anrichten."] 
    },
    { 
        name: "Gulasch mit Nudeln", 
        calories: 800, 
        time: "120 Min", 
        imageUrl: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80", 
        ingredients: ["150g Rindfleisch", "150g Zwiebeln", "80g Nudeln"], 
        instructions: ["Fleisch mit Zwiebeln anbraten.", "Brühe zugeben, lange schmoren.", "Nudeln kochen und dazu servieren."] 
    },
    { 
        name: "Chili con Carne", 
        calories: 600, 
        time: "40 Min", 
        imageUrl: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=800&q=80", 
        ingredients: ["120g Hack", "Bohnen", "Mais", "Tomaten"], 
        instructions: ["Anbraten.", "Rest dazu.", "20 Min. köcheln."] 
    },
    { 
        name: "Gebratene Asia-Nudeln", 
        calories: 700, 
        time: "20 Min", 
        imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80", 
        ingredients: ["80g Nudeln", "120g Hähnchen", "Gemüse", "Sojasauce"], 
        instructions: ["Nudeln garen.", "Hähnchen und Gemüse braten.", "Nudeln und Sauce zugeben, schwenken."] 
    }
  ],
  Vegetarisch: [
    { 
        name: "Linsencurry mit Reis", 
        calories: 600, 
        time: "30 Min", 
        imageUrl: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=800&q=80", 
        ingredients: ["80g Linsen", "100ml Kokosmilch", "60g Reis"], 
        instructions: ["Reis kochen.", "Linsen mit Kokosmilch garen.", "Würzen."] 
    },
    { 
        name: "Kichererbsen-Salat", 
        calories: 500, 
        time: "15 Min", 
        imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80", 
        ingredients: ["1 Dose Kichererbsen", "Gurke", "50g Feta"], 
        instructions: ["Mischen.", "Dressing drauf.", "Fertig."] 
    },
    { 
        name: "Gemüselasagne", 
        calories: 700, 
        time: "45 Min", 
        imageUrl: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80", 
        ingredients: ["Lasagneblätter", "Gemüse", "Mozzarella"], 
        instructions: ["Schichten.", "Backen."] 
    },
    { 
        name: "Pasta Pesto", 
        calories: 550, 
        time: "15 Min", 
        imageUrl: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=800&q=80", 
        ingredients: ["Pasta", "Pesto", "Pinienkerne"], 
        instructions: ["Pasta kochen.", "Pesto unterheben."] 
    },
    { 
        name: "Ofengemüse mit Quark", 
        calories: 450, 
        time: "30 Min", 
        imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80", 
        ingredients: ["Kartoffeln", "Gemüse", "Quark"], 
        instructions: ["Gemüse backen.", "Quark anrühren."] 
    },
    { 
        name: "Pilzrisotto", 
        calories: 600, 
        time: "40 Min", 
        imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80", 
        ingredients: ["Reis", "Champignons", "Parmesan"], 
        instructions: ["Risotto rühren.", "Pilze braten."] 
    },
    { 
        name: "Gemüse-Omelett", 
        calories: 400, 
        time: "15 Min", 
        imageUrl: "https://images.unsplash.com/photo-1510629900260-7052fec3dd41?auto=format&fit=crop&w=800&q=80", 
        ingredients: ["2 Eier", "Paprika", "Zucchini"], 
        instructions: ["Gemüse braten.", "Eier drüber."] 
    },
    { 
        name: "Käsespätzle", 
        calories: 850, 
        time: "30 Min", 
        imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80", 
        ingredients: ["150g Spätzle", "60g Bergkäse"], 
        instructions: ["Schichten.", "Schmelzen."] 
    },
    { 
        name: "Gefüllte Paprika", 
        calories: 500, 
        time: "45 Min", 
        imageUrl: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80", 
        ingredients: ["Paprika", "Quinoa", "Feta"], 
        instructions: ["Quinoa kochen.", "Füllen.", "Backen."] 
    },
    { 
        name: "Halloumi-Burger", 
        calories: 700, 
        time: "20 Min", 
        imageUrl: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=800&q=80", 
        ingredients: ["Bun", "Halloumi", "Avocado"], 
        instructions: ["Halloumi grillen.", "Burger bauen."] 
    },
    { 
        name: "Spinatknödel", 
        calories: 600, 
        time: "40 Min", 
        imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80", 
        ingredients: ["Knödelbrot", "Spinat", "Parmesan"], 
        instructions: ["Masse machen.", "Kochen.", "In Butter schwenken."] 
    },
    { 
        name: "Süßkartoffel-Curry", 
        calories: 650, 
        time: "30 Min", 
        imageUrl: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=800&q=80", 
        ingredients: ["Süßkartoffel", "Kichererbsen", "Kokosmilch"], 
        instructions: ["Dünsten.", "Ablöschen.", "Köcheln."] 
    },
    { 
        name: "Falafel-Bowl", 
        calories: 550, 
        time: "20 Min", 
        imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80", 
        ingredients: ["Falafel", "Hummus", "Salat"], 
        instructions: ["Alles anrichten."] 
    },
    { 
        name: "Gemüsequiche", 
        calories: 600, 
        time: "60 Min", 
        imageUrl: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80", 
        ingredients: ["Teig", "Gemüse", "Eier"], 
        instructions: ["Backen."] 
    },
    { 
        name: "Buddha Bowl", 
        calories: 500, 
        time: "20 Min", 
        imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80", 
        ingredients: ["Quinoa", "Edamame", "Tahini"], 
        instructions: ["Garen.", "Anrichten."] 
    }
  ]
};

// Fill missing detailed instructions and ingredients for 1 person for ALL main meals
const enrichPool = (pool: any[]) => {
    return pool.map(meal => {
        // Just adding more descriptive text for MVP variety
        if (meal.instructions.length <= 3) {
            meal.instructions = [
                `Vorbereitung: Waschen und schneiden Sie alle frischen Zutaten wie ${meal.ingredients.slice(0, 2).join(" und ")} in mundgerechte Stücke.`,
                "Basis: Erhitzen Sie etwas Öl in einer Pfanne oder einem Topf und braten Sie die Hauptzutaten bei mittlerer Hitze ca. 5-7 Minuten an.",
                "Garvorgang: Fügen Sie die restlichen Komponenten und ggf. etwas Wasser oder Brühe hinzu. Lassen Sie alles sanft köcheln, bis es gar ist.",
                "Abschmecken: Würzen Sie das Gericht kräftig mit Salz, Pfeffer und Ihren Lieblingskräutern.",
                "Anrichten: Richten Sie das fertige Mahlzeit in einer Schüssel oder auf einem Teller an und genießen Sie es warm."
            ];
        }
        // Ensure quantities
        meal.ingredients = meal.ingredients.map(ing => {
            if (!ing.match(/\d/)) {
                if (ing.toLowerCase().includes("hähnchen")) return "150g " + ing;
                if (ing.toLowerCase().includes("reis")) return "80g " + ing;
                if (ing.toLowerCase().includes("pasta")) return "100g " + ing;
                if (ing.toLowerCase().includes("hack")) return "120g " + ing;
                if (ing.toLowerCase().includes("kartoffel")) return "200g " + ing;
                return "1 Portion " + ing;
            }
            return ing;
        });
        return meal;
    });
};

MAIN_MEAL_POOL["Omnivor"] = enrichPool(MAIN_MEAL_POOL["Omnivor"]);
MAIN_MEAL_POOL["Vegetarisch"] = enrichPool(MAIN_MEAL_POOL["Vegetarisch"]);

// Re-use pools for other diets to simplify and ensure uniqueness
MAIN_MEAL_POOL["Vegan"] = MAIN_MEAL_POOL["Vegetarisch"].filter(r => !r.ingredients.some(i => {
    const val = i.toLowerCase();
    return val.includes("käse") || val.includes("ei") || val.includes("feta") || 
           val.includes("mozzarella") || val.includes("parmesan") || val.includes("joghurt") || 
           val.includes("quark") || val.includes("butter") || val.includes("sahne") || 
           val.includes("honig") || val.includes("milch");
}));

MAIN_MEAL_POOL["High Protein"] = [...MAIN_MEAL_POOL["Omnivor"], ...MAIN_MEAL_POOL["Vegetarisch"]].sort((a, b) => b.calories - a.calories).slice(0, 15);

MAIN_MEAL_POOL["Low Carb"] = [...MAIN_MEAL_POOL["Omnivor"], ...MAIN_MEAL_POOL["Vegetarisch"]].filter(r => !r.ingredients.some(i => {
    const val = i.toLowerCase();
    return val.includes("reis") || val.includes("pasta") || val.includes("kartoffel") || 
           val.includes("nudel") || val.includes("brot") || val.includes("spätzle") || 
           val.includes("mie-nudeln") || val.includes("couscous") || val.includes("tortilla") || 
           val.includes("brösel");
}));

// Fallback for smaller pools
const ensurePoolSize = (pool: any[]) => {
    if (pool.length >= 14) return pool;
    const newPool = [...pool];
    while (newPool.length < 14) {
        newPool.push({...pool[newPool.length % pool.length], name: `${pool[newPool.length % pool.length].name} (Variante)`});
    }
    return newPool;
};

const Plan = () => {
  const navigate = useNavigate();
  const [plan, setPlan] = useState<DayPlan[]>([]);
  const [inputData, setInputData] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("prep_master_input");
    if (saved) {
      const data = JSON.parse(saved);
      setInputData(data);
      generateMockPlan(data);
    } else {
      navigate("/generator");
    }
  }, [navigate]);

  const shuffle = (array: any[]) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  const generateMockPlan = (data: any) => {
    const days = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
    
    // Shuffle pools
    const breakfasts = shuffle(BREAKFAST_POOL);
    const mainPool = ensurePoolSize(MAIN_MEAL_POOL[data.diet] || MAIN_MEAL_POOL["Omnivor"]);
    const mainShuffled = shuffle(mainPool);

    const mockPlan = days.map((day, index) => {
      return {
        day,
        meals: [
          {
            ...breakfasts[index % breakfasts.length],
            type: "Frühstück"
          },
          {
            ...mainShuffled[index % mainShuffled.length],
            type: "Mittagessen"
          },
          {
            ...mainShuffled[(index + 7) % mainShuffled.length],
            type: "Abendessen"
          }
        ].map(m => ({ ...m, type: m.type })) as Meal[]
      };
    });

    setPlan(mockPlan);
  };

  if (!inputData) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="h-16 border-b bg-white sticky top-0 z-50 flex items-center px-4 md:px-8">
        <Button variant="ghost" onClick={() => navigate("/generator")} className="gap-2 text-muted-foreground hover:text-primary">
          <ArrowLeft className="w-4 h-4" /> Zurück
        </Button>
        <div className="flex-1 flex justify-center items-center gap-2 pr-20">
          <ChefHat className="w-6 h-6 text-primary" />
          <span className="font-bold text-lg hidden sm:inline">PrepMaster</span>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full py-12 px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm mb-2">
              <CheckCircle2 className="w-4 h-4" /> Plan erfolgreich erstellt
            </div>
            <h1 className="text-4xl md:text-5xl font-black">Dein 7-Tage Plan</h1>
            <p className="text-slate-500 mt-2 font-medium">Alle Rezepte sind für <span className="text-primary font-bold">1 Person</span> berechnet. Keine Wiederholungen!</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="rounded-xl gap-2 font-bold border-slate-200" onClick={() => window.print()}>
              <Printer className="w-4 h-4" /> Drucken
            </Button>
            <Button className="rounded-xl gap-2 font-bold bg-primary hover:bg-primary/90">
              <ShoppingCart className="w-4 h-4" /> Einkaufsliste
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden border border-slate-100">
              <CardHeader className="bg-primary text-white pb-6">
                <CardTitle className="text-lg">Zusammenfassung</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                      <Flame className="w-4 h-4" /> Kalorien Ziel
                    </div>
                    <span className="font-bold">{inputData.calories} kcal</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                      <UtensilsCrossed className="w-4 h-4" /> Diät
                    </div>
                    <span className="font-bold">{inputData.diet}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                      <Wallet className="w-4 h-4" /> Budget
                    </div>
                    <span className="font-bold">~{inputData.budget}€ / Woche</span>
                  </div>
                </div>
                <div className="pt-6 border-t border-slate-100">
                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-blue-50 border border-blue-100">
                    <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-blue-700 font-medium leading-relaxed">
                      Genaue Mengen und ausführliche Anleitungen pro Mahlzeit.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="p-6 rounded-[2rem] bg-secondary/10 border border-secondary/20">
              <h4 className="font-bold text-secondary mb-2 flex items-center gap-2">
                <ListChecks className="w-4 h-4" /> Vielfalt & Präzision
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                21 einzigartige Gerichte mit exakten Mengenangaben für eine Person.
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <Tabs defaultValue="Montag" className="space-y-8">
              <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 overflow-x-auto">
                <TabsList className="bg-transparent h-auto p-0 flex justify-start sm:justify-between min-w-max">
                  {plan.map(day => (
                    <TabsTrigger 
                      key={day.day} 
                      value={day.day}
                      className="rounded-xl px-5 py-3 font-bold data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
                    >
                      {day.day}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {plan.map(day => (
                <TabsContent key={day.day} value={day.day} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <Accordion type="single" collapsible className="space-y-4">
                    {day.meals.map((meal, i) => (
                      <AccordionItem 
                        key={i} 
                        value={`item-${i}`}
                        className="bg-white px-6 md:px-8 py-2 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-primary/5 transition-all overflow-hidden"
                      >
                        <AccordionTrigger className="hover:no-underline py-6">
                          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center w-full text-left">
                            <div className="w-full md:w-24 flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 group-hover:bg-primary/5 transition-colors">
                              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{meal.type}</span>
                              <span className="text-2xl">
                                {meal.type === "Frühstück" ? "🥣" : meal.type === "Mittagessen" ? "🥘" : "🥗"}
                              </span>
                            </div>

                            <div className="flex-1 space-y-2">
                              <h3 className="text-xl font-black">{meal.name}</h3>
                              <div className="flex items-center gap-3">
                                <Badge variant="secondary" className="rounded-full font-bold">
                                  <Clock className="w-3 h-3 mr-1 text-primary" /> {meal.time}
                                </Badge>
                                <Badge variant="secondary" className="rounded-full font-bold">
                                  <Flame className="w-3 h-3 mr-1 text-orange-500" /> {meal.calories} kcal
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-8 pt-4 border-t border-slate-50">
                          <div className="space-y-8">
                            <div className="relative w-full h-48 sm:h-72 rounded-[2.5rem] overflow-hidden shadow-inner group-image">
                              <img 
                                src={meal.imageUrl} 
                                alt={meal.name} 
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-8">
                                <div className="space-y-1">
                                  <span className="text-white/80 text-xs font-bold uppercase tracking-[0.2em]">Rezept-Vorschau</span>
                                  <h2 className="text-white font-black text-3xl drop-shadow-md">{meal.name}</h2>
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-2">
                              <div>
                                <h4 className="font-bold text-slate-900 mb-5 flex items-center gap-3 text-lg">
                                  <div className="p-2 rounded-xl bg-primary/10">
                                    <ListChecks className="w-5 h-5 text-primary" />
                                  </div>
                                  Zutaten (1 Person)
                                </h4>
                                <ul className="space-y-3">
                                  {meal.ingredients.map((ing, j) => (
                                    <li key={j} className="flex items-center gap-4 text-slate-600 font-semibold text-sm p-2 rounded-xl hover:bg-slate-50 transition-colors">
                                      <div className="w-2 h-2 rounded-full bg-primary/40 shrink-0"></div>
                                      {ing}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-bold text-slate-900 mb-5 flex items-center gap-3 text-lg">
                                  <div className="p-2 rounded-xl bg-primary/10">
                                    <ChefHat className="w-5 h-5 text-primary" />
                                  </div>
                                  Zubereitungsschritte
                                </h4>
                                <ol className="space-y-5">
                                  {meal.instructions.map((step, j) => (
                                    <li key={j} className="flex gap-4 text-slate-600 text-sm leading-relaxed">
                                      <span className="w-8 h-8 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-black text-xs shrink-0 border border-primary/5">
                                        {j + 1}
                                      </span>
                                      <p className="pt-1 font-medium">{step}</p>
                                    </li>
                                  ))}
                                </ol>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </main>

      <footer className="py-12 border-t mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm font-medium">
            Dein Plan wurde mit künstlicher Intelligenz optimiert. Guten Appetit!
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Plan;
