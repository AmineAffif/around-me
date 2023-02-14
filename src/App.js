import React, { useState, useEffect } from "react";
import { createContext } from "react";
import MapWidget from "./components/MapWidget";
import WeatherWidget from "./components/WeatherWidget";
import "./styles/App.css";

// Créer un contexte pour stocker l'adresse
export const AddressContext = createContext();

// Liste des widgets
const widgets = [MapWidget, WeatherWidget];

function App() {
  // Etat pour stocker l'adresse
  const [address, setAddress] = useState("");

  // Etat pour stocker les widgets à afficher
  const [displayedWidgets, setDisplayedWidgets] = useState([MapWidget]);

  const [showModal, setShowModal] = useState(false);

  // Logique pour ajouter un widget
  const addWidget = (widget) => {
    setDisplayedWidgets([...displayedWidgets, widget]);
    setShowModal(false);
  };

  // Logique pour supprimer un widget
  const removeWidget = (widget) => {
    const newWidgets = displayedWidgets.filter((w) => w !== widget);
    setDisplayedWidgets(newWidgets);
  };

  return (
    <AddressContext.Provider
      value={{ address, setAddress, widgets, addWidget, removeWidget }}
    >
      {/* Champ de saisie pour l'adresse */}
      <div className="addressContainer box">
        <input
          className="range"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onKeyPress={(e) => {
            if (e.keyCode === 13) {
              setAddress(e.target.value);
            }
          }}
        />
      </div>

      {/* Afficher les widgets */}
      <div className="widgetsContainer">
        {displayedWidgets.map((Widget, index) => (
          <div className="widget" key={index}>
            <Widget />
            <span
              className="remove-widget"
              onClick={() => removeWidget(Widget)}
            >
              &times;
            </span>
          </div>
        ))}

        {displayedWidgets.length !== widgets.length ? (
          <div className="dropdown widget">
            <button className="addButton" onClick={() => setShowModal(true)}>
              +
            </button>
            {showModal && (
              <div className="modal">
                <div className="dropdown-content">
                  <h2>Select a widget</h2>
                  <div className="widgetList">
                    {widgets.map((Widget, index) => {
                      if (!displayedWidgets.some((w) => w === Widget)) {
                        return (
                          <p
                            className="widgetElement"
                            key={index}
                            onClick={() => addWidget(Widget)}
                          >
                            {Widget.name}
                          </p>
                        );
                      }
                      return null;
                    })}
                  </div>
                  <button onClick={() => setShowModal(false)}>&times;</button>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </AddressContext.Provider>
  );
}

export default App;
