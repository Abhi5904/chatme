"use client";
import { ModeToggle } from "@/components/common/ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/user";
import getShortUserName from "@/helper/getShortUserName";
import { IUserSidebar, TabType } from "@/types/chat";
import { MessageSquare, Settings } from "lucide-react";
import React from "react";

const UserSidebar = ({ setTab }: IUserSidebar) => {
  const { user } = useUser();
  return (
    <div className="relative w-fit h-full py-5 px-3 border-r">
      <div className="flex flex-col items-center justify-between w-full h-full">
        <div className="flex flex-col items-center justify-start gap-3">
          <ModeToggle dropdownAlign="start" />
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTab(TabType.CHAT)}
          >
            <MessageSquare size={18} color="currentColor" />
          </Button>
        </div>
        <div className="flex flex-col items-center justify-end w-full gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTab(TabType.SETTING)}
          >
            <Settings size={18} color="currentColor" />
          </Button>
          <Avatar
            className="cursor-pointer"
            onClick={() => setTab(TabType.PROFILE)}
          >
            <AvatarImage
              src={user?.profilePicture || ""}
              alt={user?.firstName}
            />
            <AvatarFallback>
              {getShortUserName(user?.firstName || "", user?.lastName)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
