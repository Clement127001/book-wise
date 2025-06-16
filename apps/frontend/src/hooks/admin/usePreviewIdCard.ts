import { useState } from "react";
import { IdPreviewDataType } from "@/types/admin/user";

const usePreviewIdCard = () => {
  const [activeIdCardData, setActiveIdCardData] =
    useState<IdPreviewDataType | null>(null);

  const openIdPreview = (data: IdPreviewDataType) => {
    setActiveIdCardData(data);
  };

  const hideIdPreviewModal = () => {
    setActiveIdCardData(null);
  };

  return { activeIdCardData, openIdPreview, hideIdPreviewModal };
};

export default usePreviewIdCard;
