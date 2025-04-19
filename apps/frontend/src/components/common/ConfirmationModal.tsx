import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ConfirmationModal = ({
  opened,
  onClose,
  onClickConfirm,
  title,
  description,
  confirmText,
  confirmClassname,
}: {
  opened: boolean;
  onClose: () => void;
  onClickConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  confirmClassname?: string;
}) => {
  return (
    <Dialog open={opened} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-3">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start mt-4 w-full flex gap-3">
          <DialogClose asChild>
            <Button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="h-[44px] md:h-[48px] bg-white shadow-sm text-app-black-300 text-[16px] 
              border-[1px] border-app-gray-100 w-full hover:bg-gray-50 rounded-[10px]"
            >
              Close
            </Button>
          </DialogClose>
          <Button
            className={`bg-red-600 hover:bg-red-700 text-white border-[1px] border-red-600 rounded-[10px] h-[44px] md:h-[48px] text-[16px] w-full ${confirmClassname}`}
            onClick={onClickConfirm}
          >
            {confirmText ?? "Yes Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;
