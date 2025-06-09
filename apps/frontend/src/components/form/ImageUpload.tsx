import { ChangeEvent, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { UploadCloud, X } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { usePageLoader } from "@/context/pageLoaderProvider";
import { uploadFile } from "@/utils/uploadFile";
import { useUserData } from "@/context/UserDataProvider";
import { UserRoleEnum } from "contract/enum";

const ImageUpload = ({
  name,
  label,
  required,
}: {
  name: string;
  label: string;
  required?: boolean;
}) => {
  const { userData } = useUserData();
  const { setValue, watch } = useFormContext();
  const fileUploadInputRef = useRef<HTMLInputElement | null>(null);
  const previewUrl = watch(name);

  const isAdmin = userData && userData.role === UserRoleEnum.ADMIN;

  const { showPageLoader, hidePageLoader } = usePageLoader();

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      showPageLoader();
      const uploadResponse = await uploadFile(file, "/upload/media");
      hidePageLoader();

      if (typeof uploadResponse === "string") {
        setValue(name, uploadResponse);
        toast.success("Media Uploaded", {
          description: "Image Uploaded successfullly",
          duration: 2000,
          action: {
            label: "close",
            onClick: () => {
              {
              }
            },
          },
        });
      } else {
        toast.error(uploadResponse.errorTitle, {
          description: uploadResponse.errorMessage,
          duration: 2000,
          action: {
            label: "close",
            onClick: () => {
              {
              }
            },
          },
        });
      }
    }
  };

  const handleUploadImage = () => {
    if (fileUploadInputRef.current) fileUploadInputRef.current.click();
  };

  const handleRemoveImage = () => {
    setValue(name, null);
  };

  return (
    <div className="w-full space-y-2">
      {label && (
        <Label
          htmlFor={name}
          className={` dark:text-app-primary-300 capitalize text-[16px] ${
            isAdmin ? "text-black" : "text-white"
          }`}
        >
          {label}
          {required ? (
            <span className="text-app-accent-error-500 ml-1">*</span>
          ) : (
            ""
          )}
        </Label>
      )}

      <div
        className={`relative flex justify-center items-center rounded-md border-2  border-dashed max-w-full h-[240px] cursor-pointer overflow-hidden p-2 ${
          isAdmin
            ? "bg-app-admin-primary-700/10 border-app-admin-primary-700/50"
            : "bg-app-user-primary/10  border-app-user-primary/60"
        }`}
      >
        {previewUrl ? (
          <>
            <img src={previewUrl} className="object-fit rounded-sm" />
            <X
              strokeWidth={3}
              className="absolute top-3 right-3 z-10 bg-red-500 text-white rounded-sm p-1"
              onClick={handleRemoveImage}
            />
          </>
        ) : (
          <>
            <div
              className={`w-full h-full flex flex-col justify-center items-center gap-2 outline-2 ${
                isAdmin ? "text-app-admin-primary-700" : "text-app-user-primary"
              }`}
              onClick={handleUploadImage}
            >
              <UploadCloud size={40} />
              <p className="text-[16px]">Upload {label}</p>
            </div>
            <input
              type="file"
              accept="image/*"
              className="text-white hidden"
              onChange={handleFileUpload}
              ref={fileUploadInputRef}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
