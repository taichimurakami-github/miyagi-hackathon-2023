import React, { useState } from "react";
import { useNavigate } from "react-router";
import SpotAuthConfirmation from "./spotauth/SpotAuthConfirmation";
import SpotAuthQRReader from "./spotauth/SpotAuthQRReader";

export default function SpotAuthIndex() {
  const [activeComponentId, setActiveComponentId] = useState<"" | "agreement">(
    ""
  );
  const [data, setData] = useState<{
    ownerId: string;
    formData: { [dataKey: string]: string };
  }>({
    ownerId: "",
    formData: {},
  });
  const navigate = useNavigate();

  // handling data

  // routing and handling children
  const handleGoToQRReader = () => {
    setActiveComponentId("");
  };
  const handleGoToAgreement = () => {
    setActiveComponentId("agreement");
  };
  const handleGoBackToTop = () => {
    navigate("/");
  };

  switch (activeComponentId) {
    case "agreement":
      return (
        <SpotAuthConfirmation
          onHandleGoBack={handleGoToQRReader}
          onHandleGoToTop={handleGoBackToTop}
        />
      );

    default:
      return (
        <SpotAuthQRReader
          onHandleGoBack={handleGoBackToTop}
          onHandleGoNext={handleGoToAgreement}
        />
      );
  }
}
