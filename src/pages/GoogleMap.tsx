import { GoogleMap as GoogleMapComponent } from "@react-google-maps/api";
import React, { FC } from "react";
import { useMap } from "./useMap";
import { MarkerF } from '@react-google-maps/api';
import { InfoWindowF } from '@react-google-maps/api';
import Text from 'react-text';
import Icon from "../assets/react.svg";
import windowStyles from "../styles/MapWindow.module.css";


const markerLabel: google.maps.MarkerLabel = {
    text: "うんこまん",
    fontFamily: "sans-serif",
    fontSize: "15px",
    fontWeight: "bold",
  };

const Component: FC = () => {
  const defaultPosition = {
    lat: 35.69079374035866,
    lng: 139.76594718293336,
  };

  const { isLoaded, onLoad } = useMap({
    defaultPosition,
  });

  const containerStyle = {
    height: "75vh",
    width: "100vw",
  };

  return (
    <>
      {isLoaded ? (
        <GoogleMapComponent
          mapContainerStyle={containerStyle}
          onLoad={onLoad}
        >
             <MarkerF position={defaultPosition} label={markerLabel} />
             <InfoWindowF position={defaultPosition}>
                <div className = {windowStyles.MapWindow}>
                    <Text
                        fontSize={16}
                        as={"p"}
                        align={"center"}
                        fontWeight={"bold"}
                        color={"green.400"}
                    >
                        うんこまん
                    </Text>
                    <img
                        width="100%"
                        src={Icon}
                        alt=""
                        className={windowStyles.mapImage}
                    />
                </div>
          </InfoWindowF>
          
        </GoogleMapComponent>
      ) : (
        "loading"
      )}
    </>
  );
};

export const GoogleMap = Component;