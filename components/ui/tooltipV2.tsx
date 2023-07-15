"use client";

import { motion as m } from "framer-motion";

type Props = {
  tip: string;
  className?: string;
};

export function ToolTipV2({ tip, className }: Props) {
  return (
    <m.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`font-base text-xs p-2 rounded-md
      hidden group-hover:block absolute ${className}`}
    >
      <span>{tip}</span>
    </m.div>
  );
}