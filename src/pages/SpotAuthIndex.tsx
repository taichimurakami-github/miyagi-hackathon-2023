import React, { useState } from "react";
import { useNavigate } from "react-router";
import SpotAuthConfirmation from "./spotauth/SpotAuthConfirmation";
import SpotAuthQRReader from "./spotauth/SpotAuthQRReader";
import { AppUserData, AppFormData } from "../types/data";
import SpotAuthSignUp from "./spotauth/SpotAuthSignUp";
import SpotAuthCompletion from "./spotauth/SpotAuthCompletion";
import SpotAuthSelphy from "./spotauth/SpotAuthSelphy";
import AppHeader from "../components/AppHeader";
import AppMainContainer from "../components/ui/AppMainContainer";

export default function SpotAuthIndex() {
  const [headerTitle, setHeaderTitle] = useState("QRコード読み取り(1 / 4)");
  const [activeComponentId, setActiveComponentId] = useState<
    "" | "confirmation" | "selphy" | "signup" | "completion"
  >("");
  const [data, setData] = useState<{
    ownerId: string;
    userData: AppUserData;
    signed: boolean;
  }>({
    ownerId: "",
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
    setHeaderTitle("QRコード読み取り(1 / 4)");
  };
  const handleGoToSelphy = () => {
    setActiveComponentId("selphy");
    setHeaderTitle("顔写真の撮影(2 / 4)");
  };
  const handleGoToConfirmation = () => {
    setActiveComponentId("confirmation");
    setHeaderTitle("ご予約内容の確認(3 / 4)");
  };
  const handleGoToSignUp = () => {
    setActiveComponentId("signup");
    setHeaderTitle("ご予約者様の署名(4 / 4)");
  };
  const handleGoToCompletion = () => {
    setActiveComponentId("completion");
  };
  const handleGoBackToTop = () => {
    navigate("/");
  };

  const getComponent = () => {
    switch (activeComponentId) {
      case "completion":
        return (
          <SpotAuthCompletion data={data} onHandleGoToTop={handleGoBackToTop} />
        );
      case "signup":
        return (
          <SpotAuthSignUp
            onHandleGoBack={handleGoToConfirmation}
            onHandleGoNext={handleGoToCompletion}
          />
        );

      case "confirmation":
        return (
          <SpotAuthConfirmation
            ownerId={data.ownerId}
            userData={data.userData}
            onSetUserData={setUserData}
            onHandleGoBack={handleGoToSelphy}
            onHandleGoNext={handleGoToSignUp}
          />
        );

      case "selphy":
        return (
          <SpotAuthSelphy
            onHandleGoBack={handleGoToQRReader}
            onHandleGoNext={handleGoToConfirmation}
          />
        );

      default:
        return (
          <SpotAuthQRReader
            ownerId={data.ownerId}
            onSetLoadedData={setOwnerId}
            onHandleGoBack={handleGoBackToTop}
            onHandleGoNext={handleGoToSelphy}
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
