import React from "react";
import Image from "next/image";

type Props = {
  slug: string;
  /** Tailwind sizing classes, e.g. "h-6 w-6" */
  className?: string;
};

const ICONS: Record<string, { src: string; alt: string }> = {
  ato: { src: "/img/project-images/ato.svg", alt: "ATO" },
  hive: { src: "/img/project-images/hive.png", alt: "Hive" },
  "tamir-nakar-dev-portfolio": { src: "/favicon.png", alt: "Dev-Portfolio" },
};

export function ProjectIcon({ slug, className }: Props) {
  const icon = ICONS[slug];
  if (!icon) return null;

  return (
    <span className={`relative inline-block ${className ?? ""}`}>
      <Image
        src={icon.src}
        alt={`${icon.alt} icon`}
        fill
        sizes="32px"
        className="object-contain"
      />
    </span>
  );
}
