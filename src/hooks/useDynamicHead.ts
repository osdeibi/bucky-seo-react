import { useEffect } from "react";

export interface HeadConfig {
  title?: string;
  metas?: Array<{ name: string; content: string }>;
  ogs?: Array<{ property: string; content: string }>;
  jsonLd?: any[];
}

export function useDynamicHead(cfg: HeadConfig) {
  useEffect(() => {
    const metaElements: HTMLElement[] = [];
    const ogElements: HTMLElement[] = [];
    const scriptElements: HTMLElement[] = [];

    // Title
    if (cfg.title) {
      document.title = cfg.title;
    }

    // Generic metas
    (cfg.metas || []).forEach(({ name, content }) => {
      const m = document.createElement("meta");
      m.setAttribute("name", name);
      m.setAttribute("content", content);
      document.head.appendChild(m);
      metaElements.push(m);
    });

    // Open Graph
    (cfg.ogs || []).forEach(({ property, content }) => {
      const m = document.createElement("meta");
      m.setAttribute("property", property);
      m.setAttribute("content", content);
      document.head.appendChild(m);
      ogElements.push(m);
    });

    // JSON-LD
    (cfg.jsonLd || []).forEach((obj) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.text = JSON.stringify(obj);
      document.head.appendChild(s);
      scriptElements.push(s);
    });

    return () => {
      metaElements.forEach((el) => document.head.removeChild(el));
      ogElements.forEach((el) => document.head.removeChild(el));
      scriptElements.forEach((el) => document.head.removeChild(el));
    };
  }, [
    cfg.title,
    JSON.stringify(cfg.metas),
    JSON.stringify(cfg.ogs),
    JSON.stringify(cfg.jsonLd),
  ]);
}
