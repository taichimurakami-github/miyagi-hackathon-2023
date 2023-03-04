import React, { useState } from "react";
import { useNavigate } from "react-router";
import ReservationQRReader from "./reservation/ReservationQRReader";
import ReservationInput from "./reservation/ReservationInput";
import ReservationConfirmation from "./reservation/ReservationConfirmation";
import { AppFormData, AppUserData } from "../types/data";
import AppHeader from "../components/AppHeader";
import AppMainContainer from "../components/ui/AppMainContainer";

export default function ReservationIndex() {
  const [headerTitle, setHeaderTitle] = useState("QRコード読み取り(1 / 3)");
  const [activeComponentId, setActiveComponentId] = useState<
    "" | "input" | "confirmation"
  >("");
  const [data, setData] = useState<{
    ownerId: string;
    formData: AppFormData;
    userData: AppUserData;
  }>({
    ownerId: "",
    formData: {},
    userData: {},
  });
  const navigate = useNavigate();

  // handling data
  const setOwnerId = (value: string) => {
    setData((prev) => ({ ...prev, ownerId: value }));
  };

  const setFormData = (value: AppFormData) => {
    setData((prev) => ({ ...prev, formData: value }));
  };

  const setUserData = (value: AppUserData) => {
    setData((prev) => ({ ...prev, userData: value }));
  };

  // routing and handling children
  const handleGoToQRReader = () => {
    setHeaderTitle("QRコード読み取り(1 / 3)");
    setActiveComponentId("");
  };
  const handleGoInput = () => {
    setHeaderTitle("予約情報入力(2 / 3)");
    setActiveComponentId("input");
  };
  const handleGoConfirmation = () => {
    setHeaderTitle("予約情報確認(3 / 3)");
    setActiveComponentId("confirmation");
  };
  const handleGoBackToTop = () => {
    navigate("/");
  };

  const getComponent = () => {
    switch (activeComponentId) {
      case "input":
        return (
          <ReservationInput
            ownerId={data.ownerId}
            onHandleGoBack={handleGoToQRReader}
            onHandleGoNext={handleGoConfirmation}
            onSetFormData={setFormData}
          />
        );

      case "confirmation":
        return (
          <ReservationConfirmation
            ownerId={data.ownerId}
            formData={data.formData}
            userData={data.userData}
            onHandleGoBack={handleGoInput}
            onHandleGoToTop={handleGoBackToTop}
            onSetUserData={setUserData}
          />
        );

      default:
        return (
          <ReservationQRReader
            ownerId={data.ownerId}
            onHandleGoBack={handleGoBackToTop}
            onHandleGoNext={handleGoInput}
            onSetLoadedQRData={setOwnerId}
          />
        );
    }
  };

  return (
    <>
      <AppHeader headerTitle={headerTitle} />
      <AppMainContainer>{getComponent()}</AppMainContainer>
    </>
  );
}
