// src/DynamicHead.tsx
import React from "react";
import { useDynamicHead, HeadConfig } from "./hooks/useDynamicHead";
import { MetaTags, StructuredData } from "./DynamicHead.types"; // si tienes tipos separados

export function DynamicHead({
  metaTags,
  structuredData,
}: {
  metaTags?: MetaTags;
  structuredData?: StructuredData[];
}) {
  // Construir arrays para el hook
  const metas = [
    metaTags?.description && { name: "description", content: metaTags.description },
    metaTags?.canonicalUrl && { name: "canonical", content: metaTags.canonicalUrl },
    metaTags?.robots && { name: "robots", content: metaTags.robots },
  ].filter(Boolean) as Array<{ name: string; content: string }>;

  const ogs = Object.entries(metaTags?.og || {}).map(([key, val]) => ({
    property: `og:${key}`,
    content: val!,
  }));

  const jsonLd = (structuredData || []).map((sd) => ({
    "@context": "https://schema.org",
    "@type": sd.type,
    ...sd.data,
  }));

  // Invocación del hook
  useDynamicHead({
    title: metaTags?.title,
    metas,
    ogs,
    jsonLd,
  });

  // No renderiza nada en el DOM
  return null;
}
