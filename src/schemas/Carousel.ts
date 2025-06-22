import type { StructuredData } from "../DynamicHead.types";

/**
 * Props para generar un carrusel.
 *
 * Para **summary pages**, cada elemento incluye solo `position` y `url` :contentReference[oaicite:0]{index=0}.
 * Para **all-in-one pages**, incluye `item` con `item.name`, `item.url` y las props requeridas
 * del tipo de contenido (Recipe, Movie, Course, Restaurant) :contentReference[oaicite:1]{index=1}.
 */
export interface CarouselItem {
  /** Posición en la lista (1-based) */
  position: number;
  /** URL de la página de detalles (summary page) */
  url?: string;
  /** Para all-in-one: objeto con al menos `item.name` y `item.url` */
  item?: {
    name: string;
    url: string;
    [key: string]: any;  // más props de schema según tipo de contenido
  };
}

export interface CarouselProps {
  /** Array de elementos del carrusel */
  items: CarouselItem[];
}

export function carousel(opts: CarouselProps): StructuredData {
  return {
    type: "ItemList",
    data: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: opts.items.map(({ position, url, item }) => {
        const base: any = { "@type": "ListItem", position };
        if (item) {
          return { ...base, item };
        } else {
          return { ...base, url };
        }
      }),
    },
  };
}
