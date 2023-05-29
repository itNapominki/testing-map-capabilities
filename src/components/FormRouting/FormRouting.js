import React, { useState } from "react";
import styles from "./FormRouting.module.css";
import marcer from "../../images/i.webp";

export const FormRouting = (props) => {
  
  const {setFirstMarker, setSecondMarker, firstMarker, secondMarker } = props;
  const [searchTextInpuA, setSearchTextInpuA] = useState("");
  const [searchTextInpuB, setSearchTextInpuB] = useState("");
  const [listPlace, setListPlace] = useState([]);

  //ставим точки

  

  const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
  const params = {
    q: "",
    format: "json",
    addressdetails: "addressdetails",
  };

  function handleSearch(searchText) {
    // Search
    const params = {
      q: searchText,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 0,
    };
    const queryString = new URLSearchParams(params).toString();
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(JSON.parse(result));
        setListPlace(JSON.parse(result));
      })
      .catch((err) => console.log("err: ", err));
  }

  // установка позиции
  /** в начале устанавливаем первую точку, потом обновляем только вторую */
  function selectPositionAllMarcer(item) {

    console.log(item);
    if (firstMarker == null) {
      setFirstMarker(item);
    } else {
      setSecondMarker(item);

    }
  }

  return (
    <div className={styles.wrapper}>
      <div>
        <h2>Построить маршрут</h2>
        <div style={{ marginBottom: "20px" }}>
          <input
            style={{ width: "100%" }}
            value={searchTextInpuA}
            onChange={(event) => {
              setSearchTextInpuA(event.target.value);
            }}
          />

          <button
            variant="contained"
            color="primary"
            onClick={() => handleSearch(searchTextInpuA)}
          >
            Точка А
          </button>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <input
            style={{ width: "100%" }}
            value={searchTextInpuB}
            onChange={(event) => {
              setSearchTextInpuB(event.target.value);
            }}
          />

          <button
            variant="contained"
            color="primary"
            onClick={() => handleSearch(searchTextInpuB)}
          >
            Точка В
          </button>
        </div>
      </div>

      <div style={{ padding: 15 }}>
        <div component="nav" aria-label="main mailbox folders">
          {listPlace.map((item) => {
            return (
              <div key={item?.place_id}>
                <div
                  button
                  onClick={() => {
                    selectPositionAllMarcer(item);
                  }}
                >
                  <div style={{ fontSize: 12 }}>
                    <img
                      src={marcer}
                      alt="Placeholder"
                      style={{ width: 12, height: 10, borderRadius: "5px" }}
                    />
                    {item?.display_name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
