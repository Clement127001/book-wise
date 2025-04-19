import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import { AlertTriangle, CircleCheck, Info, XCircle } from "lucide-react";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group flex select-none gap-2"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:!text-muted-foreground",
          actionButton:
            "group-[.toast]:!bg-primary group-[.toast]:!text-primary-foreground",
          cancelButton:
            "group-[.toast]:!bg-muted group-[.toast]:!text-muted-foreground",
        },
      }}
      icons={{
        success: (
          <CircleCheck
            strokeWidth={2.3}
            className="w-[22px] h-[22px] text-green-500"
          />
        ),
        info: (
          <Info strokeWidth={2.3} className="w-[22px] h-[22px] text-blue-500" />
        ),
        warning: (
          <AlertTriangle
            strokeWidth={2.3}
            className="w-[22px] h-[22px] text-amber-500"
          />
        ),
        error: (
          <XCircle
            strokeWidth={2.3}
            className="w-[22px] h-[22px] text-red-500"
          />
        ),
        loading: (
          <div className="w-6 h-6 border-[3px] border-app-admin-primary-700 border-t-transparent rounded-full animate-spin"></div>
        ),
      }}
      {...props}
    />
  );
};

export { Toaster };
