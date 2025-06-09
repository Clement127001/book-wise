import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IdPreviewDataType } from "@/types/admin";

const IdCardPreviewModal = ({
  opened,
  onClose,
  data,
}: {
  opened: boolean;
  onClose: () => void;
  data: IdPreviewDataType;
}) => {
  const { idCardUrl, fullName } = data;
  return (
    <Dialog open={opened} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader className="space-y-2">
          <DialogTitle>ID Card Preview</DialogTitle>
          <DialogDescription>{fullName} ID Card</DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start mt-4 w-full flex gap-3 h-[24vh] overflow-y-auto">
          <img
            src={idCardUrl}
            alt={fullName}
            className="border-[1px] rounded-sm"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default IdCardPreviewModal;
