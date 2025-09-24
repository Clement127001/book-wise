import { IconType } from "@/types/common";

const GlitterButtonAdmin = ({
  label,
  Icon,
}: {
  label: string;
  Icon?: IconType;
}) => {
  return (
    <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px]">
      {" "}
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#d1fae5_0%,#10b981_50%,#d1fae5_100%)]" />{" "}
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 p-[22px] text-md font-medium text-white backdrop-blur-3xl space-x-2">
        {" "}
        <p>{label}</p>
        {Icon && <Icon size={18} />}
      </span>{" "}
    </button>
  );
};

export default GlitterButtonAdmin;
