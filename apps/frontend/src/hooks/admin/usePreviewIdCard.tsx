import { IdPreviewDataType } from "@/types/admin";
import { useState } from "react";

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
