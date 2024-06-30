"use client";

import React from "react";
import qs from "query-string";
import ActionToolTip from "../action-tooltip";
import { Video, VideoOff } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function ChatVideoButton() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isVideo = searchParams?.get("video");
  const Icon = isVideo ? VideoOff : Video;
  const toolTipLabel = isVideo ? "End Video Call" : "Start Video Call";

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname || "",
        query: {
          video: isVideo ? undefined : true,
        },
      },
      { skipNull: true }
    );
    router.push(url);
  };

  return (
    <ActionToolTip side="bottom" label={toolTipLabel}>
      <button onClick={onClick} className="hover:opacity-75 transition mr-4">
        <Icon className="size-6 text-zinc-500 dark:text-zinc-400" />
      </button>
    </ActionToolTip>
  );
}

export default ChatVideoButton;
