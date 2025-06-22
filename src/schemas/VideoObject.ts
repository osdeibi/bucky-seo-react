import type { StructuredData } from "../DynamicHead.types";


export interface BroadcastEventProps {
  name: string;
  startDate: string;
  endDate: string;
  isLiveBroadcast: boolean;
}

export interface ClipProps {
  name: string;
  startOffset: number;
  url: string;
  endOffset?: number;
}

export interface SeekToActionProps {
  target: string;
  /** Placeholder variable name, e.g. "seek_to_second_number" */
  placeholderName: string;
}

export interface VideoObjectProps {
  /** Required */
  name: string;
  thumbnailUrl: string[];
  uploadDate: string;
  /** Recommended */
  description?: string;
  contentUrl?: string;
  duration?: string;
  embedUrl?: string;
  expires?: string;
  /** Live badge support */
  publication?: BroadcastEventProps;
  /** Key moments support */
  hasPart?: ClipProps[];
  potentialAction?: SeekToActionProps;
  /** Region restrictions */
  regionsAllowed?: string[];
  ineligibleRegion?: string[];
  /** Interaction stats */
  interactionStatistic?: number;
}

export function videoObject(data: VideoObjectProps): StructuredData {
  const obj: any = {
    name: data.name,
    thumbnailUrl: data.thumbnailUrl,
    uploadDate: data.uploadDate,
    ...(data.description && { description: data.description }),
    ...(data.contentUrl && { contentUrl: data.contentUrl }),
    ...(data.duration && { duration: data.duration }),
    ...(data.embedUrl && { embedUrl: data.embedUrl }),
    ...(data.expires && { expires: data.expires }),
    // BroadcastEvent for LIVE badge
    ...(data.publication && {
      publication: {
        "@type": "BroadcastEvent",
        ...data.publication,
      },
    }),
    // InteractionCounter instead of legacy interactionCount
    ...(data.interactionStatistic && {
      interactionStatistic: {
        "@type": "InteractionCounter",
        interactionType: { "@type": "WatchAction" },
        userInteractionCount: data.interactionStatistic,
      },
    }),
    // Clip markup for key moments
    ...(data.hasPart && {
      hasPart: data.hasPart.map((clip) => ({
        "@type": "Clip",
        ...clip,
      })),
    }),
    // SeekToAction for automatic key moments
    ...(data.potentialAction && {
      potentialAction: {
        "@type": "SeekToAction",
        target: data.potentialAction.target,
        "startOffset-input": `required name=${data.potentialAction.placeholderName}`,
      },
    }),
    // Regions allowed or ineligible
    ...(data.regionsAllowed && { regionsAllowed: data.regionsAllowed }),
    ...(data.ineligibleRegion && { ineligibleRegion: data.ineligibleRegion }),
  };

  return {
    type: "VideoObject",
    data: obj,
  };
}
