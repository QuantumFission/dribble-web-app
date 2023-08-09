import { SyntheticEvent } from "react";

export function preventBubbling() {
  return (e: SyntheticEvent): void => {
    e.stopPropagation();
    e.preventDefault();
  };
}

export function FormattedTag(string: string) {
  const tagLimit = 10;
  if (string.length > tagLimit) {
    const shortTag = string.slice(0, tagLimit) + " ...";
    return shortTag;
  }
  return string;
}

export function FormattedString(title: string) {
  const tagLimit = 13;
  if (title?.length > tagLimit) {
    const shortTag = title.slice(0, tagLimit) + " ...";
    return shortTag;
  }
  return title;
}

export function FormatNumber(num: number) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  } else {
    return num.toString();
  }
}

export function FormatNumberToLS(num: number) {
  return num.toLocaleString();
}
