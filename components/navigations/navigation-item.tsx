"use client";

import { FC } from "react";
import ActionToolTip from "../action-tooltip";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface navigationItemProps {
  id: string;
  imageUrl: string;
  name: string;
}

const NavigationItem: FC<navigationItemProps> = ({ id, imageUrl, name }) => {
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    router.push(`/servers/${id}`);
  };

  return (
    <ActionToolTip side="right" align="center" label={name}>
      <button onClick={onClick} className="group relative flex items-center">
        <div
          className={cn(
            "absolute left-0 top-1/2 -translate-y-1/2 bg-primary rounded-r-full transition-all w-[4px]",
            params?.serverId !== id && "group-hover:h-[20px]",
            params?.serverId === id ? "h-[36px]" : "h-[8px]"
          )}
        ></div>
        <div
          className={cn(
            "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
            params?.serverId === id &&
              "bg-primary/10 text-primary rounded-[16px]"
          )}
        >
          <Image
            fill
            className="object-cover"
            src={imageUrl}
            alt="server-image"
          />
        </div>
      </button>
    </ActionToolTip>
  );
};

export default NavigationItem;
