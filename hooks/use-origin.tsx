import { useEffect, useState } from "react";

export function useOrigin(): string {
  const [mounted, setMounted] = useState<boolean>(false);
  const origin: string =
    typeof window !== "undefined" && window.location.origin ? window.location.origin : "";

  useEffect((): void => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return "";
  }

  return origin;
}
