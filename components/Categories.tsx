"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { categoryFilters } from "@/constants";
import Button from "./Button";

export default function Categories() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get("category");

  const handleTags = (filter: string) => {
    router.push(`${pathName}?category=${filter}`);
  };

  return (
    <div className=' flexBetween w-full gap-5 flex-wrap'>
      <ul className=' flex gap-2 overflow-auto'>
        {categoryFilters.map((filter, index) => (
          <Button
            key={index}
            title={filter}
            handleClick={() => handleTags(filter)}
            className={`whitespace-nowrap ${
              category === filter ? "bg-gray-100 font-semibold" : "font-normal"
            }`}
          />
        ))}
      </ul>
    </div>
  );
}
