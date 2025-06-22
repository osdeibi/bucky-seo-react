import type { StructuredData } from "../DynamicHead.types";

/**
 * Props para un Course individual, según Google Search Central.
 */
export interface CourseProps {
  /** Nombre de la materia o curso (required) */
  name: string;
  /** Descripción del curso */
  description?: string;
  /** URL canónica del curso */
  url?: string;
  /** Duración, e.g. "P6M" (ISO 8601 duration) */
  courseDuration?: string;
  /** Nivel de dificultad, e.g. "Beginner", "Advanced" */
  coursePrerequisites?: string;
  /** Formato del curso, e.g. "OnlineCourse", "OnSiteCourse" */
  courseMode?: string;
  /** Organización o institución que ofrece el curso */
  provider?: {
    "@type": "Organization" | "Person";
    name: string;
    url?: string;
  };
  /** Cualquier otra propiedad soportada por schema.org/Course */
  [key: string]: any;
}

/**
 * Generador de JSON-LD para Course.
 */
export function course(opts: CourseProps): StructuredData {
  return {
    type: "Course",
    data: {
      "@context": "https://schema.org",
      "@type": "Course",
      ...opts,
    },
  };
}
