import Spinner from "@/components/common/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat } from "@/context/chat";
import { EllipsisVertical } from "lucide-react";
import React from "react";

const ConversationSidebar = () => {
  const { isConversationLoading, conversations } = useChat();
  console.log(isConversationLoading, "isConversationLoading");
  console.log(conversations, "conversations");
  return (
    <div className="relative max-w-[400px] w-full min-w-[300px] border-r h-full overflow-y-auto">
      {isConversationLoading ? (
        <div className="flex items-center justify-center h-full w-full text-white">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="flex flex-col items-start w-full gap-5 px-4 border-b pb-2 pt-5">
            <div className="flex items-center justify-between w-full">
              <h1 className="text-2xl font-semibold">Chats</h1>
              <div className="size-8 hover:bg-accent rounded-full cursor-pointer flex items-center justify-center">
                <EllipsisVertical size={18} />
              </div>
            </div>
            <div className="w-full">
              <Input
                type="text"
                placeholder="Search conversation..."
                disabled={conversations?.length === 0 || !conversations}
              />
            </div>
          </div>
          {!isConversationLoading &&
            (conversations?.length === 0 || !conversations) && (
              <div className="flex items-center justify-center w-full h-[calc(100%-117px)]">
                <div className="flex flex-col items-center justify-center w-full px-4 gap-2">
                  <p className="text-xl font-semibold">No Conversations Yet!</p>
                  <p className="text-center text-sm text-secondary-foreground">
                    It seems you haven’t started any conversations or made any
                    new friends yet. Start connecting now to chat and make new
                    friends!
                  </p>
                  <div className="mt-3">
                    <Button>Make Friends</Button>
                  </div>
                </div>
              </div>
            )}
        </>
      )}
    </div>
  );
};

export default ConversationSidebar;
