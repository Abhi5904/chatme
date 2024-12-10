import { Dispatch, ReactNode, SetStateAction } from "react";

export interface IChatLayout {
  children: ReactNode;
}

export enum TabType {
  CHAT = "chat",
  SETTING = "setting",
  PROFILE = "profile",
}

export interface IUserSidebar {
  setTab: Dispatch<SetStateAction<TabType>>;
}
