import React, { useState } from "react";
import { useNavigate } from "react-router";
import ReservationQRReader from "./reservation/ReservationQRReader";
import ReservationInput from "./reservation/ReservationInput";
import ReservationConfirmation from "./reservation/ReservationConfirmation";

export default function ReservationIndex() {
  const [activeComponentId, setActiveComponentId] = useState<
    "" | "input" | "confirmation"
  >("");
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
          ownerId=""
          onHandleGoBack={handleGoToQRReader}
          onHandleGoNext={handleGoConfirmation}
        />
      );

    case "confirmation":
      return (
        <ReservationConfirmation
          onHandleGoBack={handleGoInput}
          onHandleGoToTop={handleGoBackToTop}
        />
      );

    default:
      return (
        <ReservationQRReader
          onHandleGoBack={handleGoBackToTop}
          onHandleGoNext={handleGoInput}
        />
      );
  }
}
