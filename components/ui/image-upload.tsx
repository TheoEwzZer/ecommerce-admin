"use client";

import { ReactElement, useEffect, useState } from "react";

import { CldUploadWidget, CldUploadWidgetPropsChildren } from "next-cloudinary";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ImagePlus, Trash } from "lucide-react";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

function ImageUpload({
  disabled,
  onChange,
  onRemove,
  value,
}: ImageUploadProps): ReactElement | null {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect((): void => {
    setIsMounted(true);
  }, []);

  const onUpload: (result: any) => void = (result: any): void => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map(
          (url: string): ReactElement => (
            <div
              key={url}
              className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
            >
              <div className="z-10 absolute top-2 right-2">
                <Button
                  type="button"
                  onClick={(): void => onRemove(url)}
                  variant="destructive"
                  size="sm"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              <Image
                fill
                className="object-cover"
                alt="Image"
                src={url}
              />
            </div>
          )
        )}
      </div>
      <CldUploadWidget
        onUpload={onUpload}
        uploadPreset="puxirrlq"
      >
        {({ open }: CldUploadWidgetPropsChildren): ReactElement => {
          const onClick: () => void = (): void => {
            open();
          };

          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}

export default ImageUpload;
