import logo from "./logo.svg";
import "./App.css";
import { MapLeaflet } from "./components/MapLeaflet";
import SearchBox from "./components/SearchBox/SearchBox";
import { useState } from "react";
import { FormRouting } from "./components/FormRouting/FormRouting";

function App() {
  const [selectPosition, setSelectPosition] = useState(null);

  // модуль роутинга
  const [firstMarker, setFirstMarker] = useState(null);
  const [secondMarker, setSecondMarker] = useState(null);

  return (
    <div className="App">
      <MapLeaflet
        selectPosition={selectPosition}
        setFirstMarker={setFirstMarker}
        setSecondMarker={setSecondMarker}
        firstMarker={firstMarker}
        secondMarker={secondMarker}
      ></MapLeaflet>
      <div style={{ width: "50vw" }}></div>
      <SearchBox
        selectPosition={selectPosition}
        setSelectPosition={setSelectPosition}
      />
      <FormRouting
        setFirstMarker={setFirstMarker}
        setSecondMarker={setSecondMarker}
        firstMarker={firstMarker}
        secondMarker={secondMarker}
      ></FormRouting>
    </div>
  );
}

export default App;
