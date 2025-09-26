import { ReactNode } from "react";
import { IconType } from "@/types/common";

const GlitterButton = ({
  label,
  Icon,
  children,
  className,
  containerClassName,
}: {
  label?: string;
  Icon?: IconType;
  children?: ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  return (
    <button
      className={`relative inline-flex overflow-hidden rounded-full p-[2px] ${containerClassName}`}
    >
      {" "}
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />{" "}
      {label ? (
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 p-[12px] px-10 text-md font-medium text-white backdrop-blur-3xl space-x-2">
          {" "}
          <p>{label}</p>
          {Icon && <Icon size={18} />}
        </span>
      ) : (
        <div
          className={`bg-white z-50 overflow-hidden rounded-full ${className}`}
        >
          {children}
        </div>
      )}{" "}
    </button>
  );
};

export default GlitterButton;
