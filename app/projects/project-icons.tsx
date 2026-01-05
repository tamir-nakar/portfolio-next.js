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
  "bomber-man": { src: "/img/project-images/bomber-man.png", alt: "Bomber Man" },
  "flip-it": { src: "/img/project-images/flip-it.ico", alt: "flip-it!" },
};

export function ProjectIcon({ slug, className }: Props) {
  const icon = ICONS[slug];
  if (!icon) return null;

  return (
    <span className={`relative inline-block ${className ?? ""}`}>
      {icon.src.endsWith(".ico") ? (
        <img
          src={icon.src}
          alt={`${icon.alt} icon`}
          className="h-full w-full object-contain"
        />
      ) : (
        <Image
          src={icon.src}
          alt={`${icon.alt} icon`}
          fill
          sizes="32px"
          className="object-contain"
        />
      )}
    </span>
  );
}
