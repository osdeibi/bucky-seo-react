import type { StructuredData } from "../DynamicHead.types";

/**
 * Props para speakable: permite webs o artículos con secciones TTS.
 * Basado en el ejemplo oficial :contentReference[oaicite:0]{index=0}.
 */
export interface SpeakableProps {
  /** El tipo de CreativeWork: "WebPage", "Article", etc. */
  type?: string;
  /** Nombre o título del contenido */
  name?: string;
  /** URL canónica */
  url?: string;
  /** Secciones que Google Assistant leerá en voz */
  speakable: {
    "@type": "SpeakableSpecification";
    xPath: string[];
  };
}

export function speakable(opts: SpeakableProps): StructuredData {
  const workType = opts.type ?? "WebPage";
  const { speakable, type, ...rest } = opts;

  return {
    type: workType,
    data: {
      "@context": "https://schema.org",
      "@type": workType,
      ...rest,
      speakable,
    },
  };
}
