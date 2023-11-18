"use client";

import { ReactElement } from "react";

import { Loader } from "@/components/ui/loader";

export function Loading(): ReactElement {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Loader />
    </div>
  );
}

export default Loading;
