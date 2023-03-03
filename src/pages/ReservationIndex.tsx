import React, { useState } from "react";
import { useNavigate } from "react-router";
import ReservationQRReader from "./reservation/ReservationQRReader";
import ReservationInput from "./reservation/ReservationInput";
import ReservationConfirmation from "./reservation/ReservationConfirmation";
import { AppFormData, AppUserData } from "../types/data";

export default function ReservationIndex() {
  const [activeComponentId, setActiveComponentId] = useState<
    "" | "input" | "confirmation"
  >("");
  const [data, setData] = useState<{
    ownerId: string;
    formData: AppFormData;
    userData: AppUserData;
  }>({
    ownerId: "test",
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
    setActiveComponentId("");
  };
  const handleGoInput = () => {
    setActiveComponentId("input");
  };
  const handleGoConfirmation = () => {
    setActiveComponentId("confirmation");
  };
  const handleGoBackToTop = () => {
    navigate("/");
  };

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
          onHandleGoBack={handleGoBackToTop}
          onHandleGoNext={handleGoInput}
          onSetLoadedQRData={setOwnerId}
        />
      );
  }
}
