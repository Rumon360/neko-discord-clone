"use client";

import { useSocket } from "./providers/socket-provider";
import { Badge } from "@/components/ui/badge";

function SocketIndicator() {
  const { isConnnected } = useSocket();
  if (!isConnnected)
    return (
      <Badge variant="outline" className="bg-yellow-600 text-white border-none">
        Offline
      </Badge>
    );
  return (
    <Badge variant="outline" className="bg-emerald-600 text-white border-none">
      Online
    </Badge>
  );
}

export default SocketIndicator;
