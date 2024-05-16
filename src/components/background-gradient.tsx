"use client";

import { useTheme } from "next-themes";

export const BackgroundGradient = ({
  degrees = Math.random() * 360,
}: {
  degrees?: number;
}) => {
  const { theme } = useTheme();
  const hue = theme === "dark" ? 180 : 39;
  return (
    <div
      className="absolute -z-10 pointer-events-none inset-0 max-w-md mx-auto h-72 blur-[118px]"
      style={{
        background: `linear-gradient(${degrees}deg, hsla(${hue}, 25%, 75%, 0.2) 4.54%, hsla(${hue}, 75%, 70%, 0.26) 34.2%, hsla(${hue},  15%, 70%,  0.1) 77.55%)`,
      }}
    />
  );
};
