import type { StructuredData } from "../DynamicHead.types";

/** Representa un catálogo de datos al que pertenece el dataset */
export interface DataCatalogProps {
  "@type": "DataCatalog";
  name: string;
  url?: string;
}

/** Describe una descarga de datos específica */
export interface DataDownloadProps {
  "@type": "DataDownload";
  contentUrl: string;           // URL de descarga obligatoria
  encodingFormat?: string;      // e.g. "text/csv"
  name?: string;                // Nombre descriptivo
  description?: string;
}

/** Props principales para el Dataset */
export interface DatasetProps {
  name: string;                           // Nombre del dataset (requerido)
  description?: string;                   // Descripción del contenido
  url?: string;                           // Página canónica del dataset
  identifier?: string | string[];         // DOI u otros IDs
  keywords?: string[];                    // Palabras clave
  license?: string;                       // URL de la licencia :contentReference[oaicite:0]{index=0}
  citation?: string;                      // Referencia bibliográfica
  creator?: {
    "@type": "Person" | "Organization";
    name: string;
    url?: string;
  } | Array<{
    "@type": "Person" | "Organization";
    name: string;
    url?: string;
  }>;
  publisher?: {
    "@type": "Organization";
    name: string;
    url?: string;
  };
  datePublished?: string;                 // Fecha de publicación ISO-8601
  dateModified?: string;                  // Fecha de última modificación
  measurementTechnique?: string;
  variableMeasured?: string[];
  spatialCoverage?: string | {            // Cobertura geográfica
    "@type": "Place";
    name?: string;
    geo?: {
      "@type": "GeoCoordinates";
      latitude: number | string;
      longitude: number | string;
    };
  };
  temporalCoverage?: string;              // e.g. "2008" o "1950-01-01/2013-12-18"
  includedInDataCatalog?: DataCatalogProps;
  distribution: DataDownloadProps[];      // Formatos de descarga :contentReference[oaicite:1]{index=1}
}

/**
 * Generador de JSON-LD para Dataset.
 */
export function dataset(opts: DatasetProps): StructuredData {
  return {
    type: "Dataset",
    data: {
      "@context": "https://schema.org",
      "@type": "Dataset",
      ...opts,
    },
  };
}
