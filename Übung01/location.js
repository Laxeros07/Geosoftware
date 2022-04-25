document.title = "Uebung2";

var metadaten = document.createElement("meta");
metadaten.setAttribute("name", "author");
metadaten.setAttribute("content", "Anne Staskiewicz");

let element = document.getElementById("standort");

var x = document.getElementById("demo");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
function showPosition(position) {
  x.innerHTML =
    "Latitude: " +
    position.coords.latitude +
    "<br>Longitude: " +
    position.coords.longitude;

  let input = document.getElementById("textfeld");

  input.value = JSON.stringify({
    type: "Feature",
    properties: {
      shape: "Marker",
      name: "Botanischer Garten",
      category: "default",
    },
    geometry: {
      type: "Point",
      coordinates: [position.coords.longitude, position.coords.latitude],
    },
  });
}
function berechneAbstand() {
  var poiCoordinates = [];

  poi.features.forEach((element) => {
    poiCoordinates.push(element.geometry.coordinates);
  });
  var standort = JSON.parse(textfeld.value);
  var standortCoordinates = standort.geometry.coordinates;

  var abstand = [];
  poiCoordinates.forEach((element) => {
    abstand.push(berechneDistanz(element, standortCoordinates));
  });

  abstand.sort(function (a, b) {
    return a - b;
  });
  document.getElementById("abstandPOI").innerHTML = "";
  abstand.forEach((element) => {
    document.getElementById("abstandPOI").innerHTML += "<p>" + element + "</p>";
  });

  console.log(poiCoordinates);
  console.log(standortCoordinates);
  console.log(abstand);

  console.log(berechneDistanz([51.9695313, 7.5955495], [51.969422, 7.595725]));
}
