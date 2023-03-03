import React, { useState } from "react";
import { useNavigate } from "react-router";
import SpotAuthConfirmation from "./spotauth/SpotAuthConfirmation";
import SpotAuthQRReader from "./spotauth/SpotAuthQRReader";
import { AppUserData, AppFormData } from "../types/data";
import SpotAuthSignUp from "./spotauth/SpotAuthSignUp";
import SpotAuthCompletion from "./spotauth/SpotAuthCompletion";

export default function SpotAuthIndex() {
  const [activeComponentId, setActiveComponentId] = useState<
    "" | "confirmation" | "signup" | "completion"
  >("");
  const [data, setData] = useState<{
    ownerId: string;
    userData: AppUserData;
    signed: boolean;
  }>({
    ownerId: "test",
    userData: {},
    signed: false,
  });
  const navigate = useNavigate();

  // handling data
  const setOwnerId = (value: string) => {
    setData((prev) => ({ ...prev, ownerId: value }));
  };
  const setUserData = (value: AppUserData) => {
    setData((prev) => ({ ...prev, userData: value, signed: true }));
  };

  // routing and handling children
  const handleGoToQRReader = () => {
    setActiveComponentId("");
  };
  const handleGoToSignUp = () => {
    setActiveComponentId("signup");
  };
  const handleGoToConfirmation = () => {
    setActiveComponentId("confirmation");
  };
  const handleGoToCompletion = () => {
    setActiveComponentId("completion");
  };
  const handleGoBackToTop = () => {
    navigate("/");
  };

  switch (activeComponentId) {
    case "completion":
      return (
        <SpotAuthCompletion data={data} onHandleGoToTop={handleGoBackToTop} />
      );
    case "signup":
      return (
        <SpotAuthSignUp
          onHandleGoBack={handleGoToQRReader}
          onHandleGoNext={handleGoToCompletion}
        />
      );
    case "confirmation":
      return (
        <SpotAuthConfirmation
          ownerId={data.ownerId}
          userData={data.userData}
          onSetUserData={setUserData}
          onHandleGoBack={handleGoToQRReader}
          onHandleGoNext={handleGoToSignUp}
        />
      );

    default:
      return (
        <SpotAuthQRReader
          onSetLoadedData={setOwnerId}
          onHandleGoBack={handleGoBackToTop}
          onHandleGoNext={handleGoToConfirmation}
        />
      );
  }
}
