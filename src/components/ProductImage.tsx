import { ImageOff } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface ProductImageProps {
  src?: string | undefined;
  alt: string;
  className?: string;
  eager?: boolean;
}

export function ProductImage({ src, alt, className, eager = false }: ProductImageProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    src ? "loading" : "error",
  );

  useEffect(() => {
    setStatus(src ? "loading" : "error");
  }, [src]);

  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      {status === "loading" && <div className="absolute inset-0 animate-pulse bg-muted" />}
      {status === "error" || !src ? (
        <div className="absolute inset-0 grid place-items-center text-muted-foreground">
          <ImageOff className="h-6 w-6" aria-hidden="true" />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={cn(
            "h-full w-full object-cover transition-all duration-500",
            status === "loaded" ? "opacity-100" : "opacity-0",
          )}
        />
      )}
    </div>
  );
}
