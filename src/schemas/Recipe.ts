import type { StructuredData } from "../DynamicHead.types";

export interface RecipeProps {
  /** Nombre de la receta (requerido) */
  name: string;
  /** Descripción breve */
  description?: string;
  /** Imagen o imágenes */
  image?: string | string[];
  /** Cantidad de porciones, e.g. "4 porciones" */
  recipeYield?: string;
  /** Tiempo de preparación, e.g. "PT10M" */
  prepTime?: string;
  /** Tiempo de cocción, e.g. "PT20M" */
  cookTime?: string;
  /** Tiempo total, e.g. "PT30M" */
  totalTime?: string;
  /** Categoría, e.g. "Postre" */
  recipeCategory?: string;
  /** Cocina, e.g. "Mexicana" */
  recipeCuisine?: string;
  /** Palabras clave separadas por comas */
  keywords?: string | string[];
  /** Ingredientes */
  recipeIngredient: string[];
  /** Instrucciones: texto o pasos */
  recipeInstructions: Array<
    | string
    | {
        "@type": "HowToStep";
        text: string;
      }
  >;
  /** Autor: Person u Organization */
  author?:
    | { "@type": "Person" | "Organization"; name: string }
    | string;
  /** Fecha de publicación ISO 8601 */
  datePublished?: string;
  /** Información nutricional */
  nutrition?: {
    "@type": "NutritionInformation";
    [key: string]: any;
  };
}

export function recipe(opts: RecipeProps): StructuredData {
  return {
    type: "Recipe",
    data: {
      "@context": "https://schema.org",
      "@type": "Recipe",
      ...opts,
    },
  };
}
