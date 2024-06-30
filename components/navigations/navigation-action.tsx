"use client";

import { Plus } from "lucide-react";
import ActionToolTip from "../action-tooltip";
import { useModal } from "@/hooks/use-modal-store";

function NavigationAction() {
  const { onOpen } = useModal();
  const handleClick = () => {
    onOpen("createServer");
  };

  return (
    <div>
      <ActionToolTip label="Add a server" side="right" align="center">
        <button onClick={handleClick} className="group flex items-center">
          <div className="border-none flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
            <Plus
              size={25}
              className="group-hover:text-white transition text-emerald-500"
            />
          </div>
        </button>
      </ActionToolTip>
    </div>
  );
}

export default NavigationAction;
