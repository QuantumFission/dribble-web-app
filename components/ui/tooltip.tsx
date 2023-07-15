"use client";

import { motion as m } from "framer-motion";

type Props = {
  tip: string;
  className?: string;
};

export function ToolTip({ tip, className }: Props) {
  return (
    <m.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={` whitespace-nowrap bg-gray-100 text-gray-700 font-base text-xs absolute  px-2 left-4
      hidden group-hover:block bottom-[-25px]  ${className}`}
    >
      <span>{tip}</span>
    </m.div>
  );
}
