"use client";

import { ReactElement } from "react";
import { ClipLoader } from "react-spinners";

export function Loader(): ReactElement {
  return (
    <ClipLoader
      color="#3498db"
      size={50}
    />
  );
}
