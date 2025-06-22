import type { StructuredData } from "../DynamicHead.types";

export interface MathSolverProps {
  /** Tipo de CreativeWork, por ejemplo "WebPage" o "Article" */
  type?: string;
  /** URL de la página donde se resuelve el problema */
  url: string;
  /** Título o pregunta matemática */
  headline: string;
  /** Descripción o enunciado del problema */
  description?: string;
  /** Expresión matemática en LaTeX o MathML */
  mathExpression: string;
  /** Paso a paso de la solución */
  stepByStep: string[];
  /** Fecha de publicación */
  datePublished?: string;
  /** Autor o sistema que genera la solución */
  author?: {
    "@type": "Organization" | "Person";
    name: string;
    url?: string;
  };
}

/**
 * Generador de JSON-LD para Math Solvers basado en Google Search Central.
 * https://developers.google.com/search/docs/appearance/structured-data/math-solvers
 */
export function mathSolver(opts: MathSolverProps): StructuredData {
  const workType = opts.type ?? "WebPage";
  const {
    type: _ignored,
    stepByStep,
    mathExpression,
    ...rest
  } = opts;

  return {
    type: workType,
    data: {
      "@context": "https://schema.org",
      "@type": workType,
      ...rest,
      solverType: "MathSolver",           // etiquetamos como MathSolver
      mathExpression,
      stepByStep,
    },
  };
}
