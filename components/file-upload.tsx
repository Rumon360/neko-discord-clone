"use client";

import { FileIcon, X } from "lucide-react";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import { FC } from "react";

interface FileUploadProps {
  value: string;
  onChange: (url?: string) => void;
  endpoint: "messageFile" | "serverImage";
  isLoading: boolean;
}

const FileUpload: FC<FileUploadProps> = ({
  endpoint,
  onChange,
  value,
  isLoading,
}) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative size-20 rounded-full">
        <Image
          fill
          src={value}
          alt="Upload"
          className="rounded-full object-cover"
        />
        <button
          disabled={isLoading}
          type="button"
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm "
          onClick={() => {
            if (!isLoading) {
              onChange("");
            }
          }}
        >
          <X className="size-4" />
        </button>
      </div>
    );
  }

  if (value && fileType === "pdf") {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="size-10 stroke-indigo-400 fill-indigo-200" />
        <a
          href={value}
          target="_blank"
          className="ml-2 text-sm hover:underline text-indigo-500 dark:text-indigo-400"
        >
          {value}
        </a>
        <button
          type="button"
          className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm "
          onClick={() => {
            if (!isLoading) {
              onChange("");
            }
          }}
        >
          <X className="size-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      className="ut-button:bg-indigo-500 ut-button:text-xs ut-button:h-10"
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};

export default FileUpload;
