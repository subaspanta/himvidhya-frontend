"use client";

import { useIsFetching } from "@tanstack/react-query";

export const TopLoader = () => {
  const isFetching = useIsFetching();

  if (!isFetching) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-blue-500 animate-pulse z-50" />
  );
};
