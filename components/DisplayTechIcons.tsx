import React from "react";
import { cn, getTechLogos } from "@/lib/utils";
import Image from "next/image";

const DisplayTechIcons = async ({ techStack }: TechIconProps) => {
  const techIcons = await getTechLogos(techStack);
  return (
    <div className={"flex flex-row"}>
      {techIcons.slice(0, 3).map((logo, index) => (
        <div
          key={index}
          className={cn(
            "relative group bg-dark-300 rounded-full p-2 flex-center",
            index >= 1 && "-ml-3",
          )}
        >
          <span className={"tech-tooltip"}>{logo.tech}</span>
          <Image
            key={logo.tech}
            src={logo.url}
            alt={logo.tech}
            width={100}
            height={100}
            className={"size-5"}
          />
        </div>
      ))}
    </div>
  );
};
export default DisplayTechIcons;
