export type MediaType = 'Bild' | 'Video';

export type CameraType = 'Retro' | 'Analog' | 'Digital' | 'Spiegellos' | 'Spiegelreflex' | 'Vintage' | '35mm Film' | 'Mittelformat' | 'Großformat' | 'GoPro' | 'iPhone';

export type FilmStock = 'Kodak Portra 400' | 'Fujifilm Superia' | 'Schwarz-Weiß' | 'CineStill 800T' | 'Polaroid' | 'Technicolor' | 'Ektachrome' | 'Standard Digital' | 'VHS-Stil' | 'Super 8' | 'Kodak Gold 200' | 'Ilford HP5';

export type Perspective = 'Weitwinkel' | 'Nahaufnahme' | 'Vogelperspektive' | 'Froschperspektive' | 'Draufsicht' | 'Augenhöhe' | 'Schräger Winkel' | 'Makro' | 'Extreme Nahaufnahme' | 'Totale' | 'Halbtotale' | 'Ego-Perspektive';

export type Lighting = 'Goldene Stunde' | 'Cinematisch' | 'Neon-Licht' | 'Weiches Licht' | 'Hartes Licht' | 'Studio-Beleuchtung' | 'Natürliches Licht' | 'Düster' | 'Bewölkt';

export type Mood = 'Nostalgisch' | 'Futuristisch' | 'Raw/Authentisch' | 'Ätherisch' | 'Traumhaft' | 'Professionell' | 'Dunkel' | 'Lebhaft';

export interface Prompt {
  id: string;
  title: string;
  content: string;
  mediaType: MediaType;
  cameraType: CameraType;
  filmStock: FilmStock;
  perspective: Perspective;
  lighting?: Lighting;
  mood?: Mood;
  isFavorite?: boolean;
  aperture?: string;
  shutterSpeed?: string;
  iso?: string;
  focalLength?: string;
  aspectRatio?: string;
  negativePrompt?: string;
  imageUrl?: string;
  tags: string[];

  createdAt: string;
}
