"use client";

import { cn } from "@/lib/utils";
import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { FC } from "react";
import ActionToolTip from "../action-tooltip";
import { ModalType, useModal } from "@/hooks/use-modal-store";

interface ServerChannelProps {
  channel: Channel;
  server: Server;
  role?: MemberRole;
}

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VIDEO]: Video,
};

const ServerChannel: FC<ServerChannelProps> = ({ channel, server, role }) => {
  const params = useParams();
  const router = useRouter();
  const Icon = iconMap[channel.type];
  const { onOpen } = useModal();

  const onClick = () => {
    router.push(`/servers/${params?.serverId}/channels/${channel?.id}`);
  };

  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action, { channel, server });
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "group p-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        {
          "bg-zinc-700/20 dark:bg-zinc-700": params?.channelId === channel.id,
        }
      )}
    >
      <Icon className="flex-shrink-0 size-5 text-zinc-500 dark:text-zinc-400" />
      <p
        className={cn(
          "line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
          {
            "text-primary dark:text-zinc-200 dark:group-hover:text-white":
              params?.channelId === channel.id,
          }
        )}
      >
        {channel.name}
      </p>
      {channel.name !== "General" &&
        channel.name !== "general" &&
        role !== MemberRole.GUEST && (
          <div className="ml-auto flex items-center gap-x-2">
            <ActionToolTip label="Edit">
              <Edit
                onClick={(e) => {
                  onAction(e, "editChannel");
                }}
                className="hidden group-hover:block size-4 text-zinc-500 hover:text-zinc-400 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
              />
            </ActionToolTip>
            <ActionToolTip label="Delete">
              <Trash
                onClick={(e) => {
                  onAction(e, "deleteChannel");
                }}
                className="hidden group-hover:block size-4 text-zinc-500 hover:text-zinc-400 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
              />
            </ActionToolTip>
          </div>
        )}
      {(channel.name === "General" || channel.name === "general") && (
        <Lock className="ml-auto size-4 text-zinc-500 hover:text-zinc-400 dark:text-zinc-400 dark:hover:text-zinc-300 transition" />
      )}
    </button>
  );
};

export default ServerChannel;
