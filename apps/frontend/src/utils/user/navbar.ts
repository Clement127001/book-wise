import { Home, NotebookTabs, Search, User } from "lucide-react";

export const loggedUserNavItems = [
  {
    Icon: Home,
    path: "/user/home",
    label: "all blogs",
  },
  {
    Icon: Search,
    path: "/user/search",
    label: "create new blog",
  },
];

export const ProfileMenuItems = [
  {
    path: "/user/profile",
    label: "My Profile",
    Icon: User,
  },
  {
    path: "/user/notes",
    label: "Notes",
    Icon: NotebookTabs,
  },
];
