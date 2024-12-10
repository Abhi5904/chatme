"use client";
import { IChatLayout, TabType } from "@/types/chat";
import React, { useState } from "react";
import UserSidebar from "./UserSidebar";
import ConversationSidebar from "./ConversationSidebar";
import ProfileSidebar from "./ProfileSidebar";
import Setting from "./Setting";

const ChatLayout = ({ children }: IChatLayout) => {
  const [tab, setTab] = useState<TabType>(TabType.PROFILE);
  return (
    <div className="relative w-full h-screen flex items-start">
      <UserSidebar setTab={setTab} />
      {tab === TabType.CHAT && <ConversationSidebar />}
      {tab === TabType.PROFILE && <ProfileSidebar />}
      {tab === TabType.SETTING && <Setting />}
      <div className="w-full relative">{children}</div>
    </div>
  );
};

export default ChatLayout;
