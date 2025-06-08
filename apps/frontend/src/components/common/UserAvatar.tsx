import { cn } from "@/lib/utils";

const UserAvatar = ({ src, name }: { src?: string | null; name: string }) => {
  const fallBack = name
    .split(" ")
    .map((item) => item[0])
    .join("");

  return (
    <div className="relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full shadow-md">
      {src && (
        <img
          src={src}
          className={cn(
            "relative flex h-full w-full shrink-0 overflow-hidden rounded-full"
          )}
        />
      )}
      <p className="flex h-full w-full items-center justify-center rounded-full bg-muted font-semibold">
        {fallBack}
      </p>
    </div>
  );
};

export default UserAvatar;
