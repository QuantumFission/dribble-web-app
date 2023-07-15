import React from "react";
import Image from "next/image";

type Props = {
  src: string;
  className?: string;
  width: number;
  height: number;
};

export default function UserProfile({ src, className, width, height }: Props) {
  return src ? (
    <Image
      alt='user-img'
      src={src}
      width={width}
      height={height}
      priority
      className=' object-contain rounded-full'
    />
  ) : (
    <div className={` w-[${width}px] h-[${height}px] bg-gray-200 animate-pulse rounded-full` } />
  );
}
