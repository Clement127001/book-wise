import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";

const BackButton = ({
  className,
  url,
}: {
  className?: string;
  url?: string;
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (url) {
      router.push(url);
      return;
    }

    router.back();
  };

  return (
    <div
      onClick={handleBack}
      className={`flex gap-2 items-center group w-fit cursor-pointer text-[14px] font-normal bg-white shadow-md px-4 py-2 rounded-md  ${className}`}
    >
      <ArrowLeft
        size={18}
        className="group-hover:scale-[1.1] group-hover:-translate-x-1 ease-linear transition-[300ms]"
      />
      <p className="hidden sm:flex">Back</p>
    </div>
  );
};

export default BackButton;
