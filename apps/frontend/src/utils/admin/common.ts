import { BookCheck, BookCopy, Home, User, Users } from "lucide-react";

export const adminSidebarLinks = [
  {
    path: "/admin/dashboard",
    Icon: Home,
    label: "home",
  },
  {
    path: "/admin/all-users",
    Icon: Users,
    label: "all users",
  },
  {
    path: "/admin/all-books",
    Icon: BookCopy,
    label: "all books",
  },
  {
    path: "/admin/borrow-request",
    Icon: BookCheck,
    label: "borrow requests",
  },
  {
    path: "/admin/account-request",
    Icon: User,
    label: "account requests",
  },
];
