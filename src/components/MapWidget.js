import React, { useContext } from "react";
import { AddressContext } from "../App";

function MapWidget() {
  // Récupérer l'adresse à partir du contexte
  const { address } = useContext(AddressContext);

  return (
      <iframe
        width="100%"
        height= "100%"
        frameborder="0"
        src={`https://maps.google.com/maps?q=${address}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
      />
  );
}

export default MapWidget;
