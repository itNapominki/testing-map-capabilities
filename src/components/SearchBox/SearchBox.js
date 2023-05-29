import React, { useState } from "react";
import marcer from "../../images/i.webp";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
const params = {
  q: "",
  format: "json",
  addressdetails: "addressdetails",
};

export default function SearchBox(props) {
  const { selectPosition, setSelectPosition } = props;
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", position: "absolute", zIndex: 2, top: "100px", left: "13px", backgroundColor: "#c8f9cc", padding: 15 }}
    >
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <input
            style={{ width: "100%" }}
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
          />
        </div>
        <div
          style={{ display: "flex", alignItems: "center", padding: "0px 20px" }}
        >
          <button
            variant="contained"
            color="primary"
            onClick={() => {
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
            }}
          >
            Search 
          </button> &emsp; <div>{`lat:   ${selectPosition?.boundingbox[0] == undefined ? "" : selectPosition?.boundingbox[0]}, lon: ${selectPosition?.boundingbox[2] == undefined ? '' : selectPosition?.boundingbox[2]}` }</div>
        </div>
      </div>
      <div>
        <div component="nav" aria-label="main mailbox folders">
          {listPlace.map((item) => {
            return (
              <div key={item?.place_id}>
                <div
                  button
                  onClick={() => {
                    setSelectPosition(item);
                    console.log(item);
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
}
