import { BookCheck, BookCopy, Home, User, Users } from "lucide-react";

export const adminSidebarLinks = [
  {
    redirectLink: "/admin/dashboard",
    Icon: Home,
    label: "home",
  },
  {
    redirectLink: "/admin/all-users",
    Icon: Users,
    label: "all users",
  },
  {
    redirectLink: "/admin/all-books",
    Icon: BookCopy,
    label: "all books",
  },
  {
    redirectLink: "/admin/borrow-request",
    Icon: BookCheck,
    label: "borrow requests",
  },
  {
    redirectLink: "/admin/account-request",
    Icon: User,
    label: "account requests",
  },
];
