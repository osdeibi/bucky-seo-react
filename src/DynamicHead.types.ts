export interface MetaTags {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  robots?: string;
  og?: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
  };
}

export interface StructuredData {
  type: string;
  data: Record<string, any>;
}
