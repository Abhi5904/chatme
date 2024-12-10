import ChatLayout from "@/components/layouts/chats/ChatLayout";
import { SocketProvider } from "@/context/socket";
import { UserProvider } from "@/context/user";
import React from "react";

const ChatMainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SocketProvider>
      <UserProvider>
        <ChatLayout>{children}</ChatLayout>
      </UserProvider>
    </SocketProvider>
  );
};

export default ChatMainLayout;
