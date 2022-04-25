/**
 * DOM-Manipulation Titel
 */
document.title = "Uebung2";
/**
 * DOM-Manipulation Metadaten
 */
var metadaten = document.createElement("meta");
metadaten.setAttribute("name", "author");
metadaten.setAttribute("content", "Anne Staskiewicz");
/**
 * Speicherung von dem HTML-Element als Variable
 */
let element = document.getElementById("standort");

var x = document.getElementById("demo");
/**
 * Funktion zur Standortermittlung
 */
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
/**
 * speichert longitude und latitude
 */
function showPosition(position) {
  x.innerHTML =
    "Latitude: " +
    position.coords.latitude +
    "<br>Longitude: " +
    position.coords.longitude;

  let input = document.getElementById("textfeld");

  input.value = JSON.stringify({
    // wandelt Coordinaten des Standorts in String in JSON um
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
/**
 * berechnet bzw sollte den Abstand zwischen meinem Standort und den POI berechnen
 */
function berechneAbstand() {
  var poiCoordinates = [];
  //tut die Koordinaten von den poi in einen array
  poi.features.forEach((element) => {
    poiCoordinates.push(element.geometry.coordinates);
  });
  //wandelt die Standortkoordinaten in einen Array um
  var standort = JSON.parse(textfeld.value);
  var standortCoordinates = standort.geometry.coordinates;
  //berechnet den Abstand zw. dem Standort und den poi Koordinaten
  var abstand = [];
  poiCoordinates.forEach((element) => {
    abstand.push(berechneDistanz(element, standortCoordinates));
  });
  //sortiert die Abstaende nach Groeße
  abstand.sort(function (a, b) {
    return a - b;
  });
  //abstaende auf der website ausgeben
  document.getElementById("abstandPOI").innerHTML = "";
  abstand.forEach((element) => {
    document.getElementById("abstandPOI").innerHTML += "<p>" + element + "</p>";
  });

  console.log(poiCoordinates);
  console.log(standortCoordinates);
  console.log(abstand);

  console.log(berechneDistanz([51.9695313, 7.5955495], [51.969422, 7.595725]));
}
