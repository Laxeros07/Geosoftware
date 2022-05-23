/**
 * Ausgabe der Karte
 */
var map = L.map("map").setView([51.975, 7.61], 13);
/**
 *Standortabfrage
 */
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    standort = [position.coords.latitude, position.coords.longitude];
    var marker = new L.marker(standort).addTo(map);
    loadBushaltestellenAsyncAwait();
  });
} else {
  x.innerHTML = "Geolocation is not supported by this browser.";
}

// add an OpenStreetMap tile layer and keep reference in variable
var osmLayer = new L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
});
osmLayer.addTo(map);

/**
 * Kontrollleiste zum zeichnen auf der Karte hinzufügen
 */
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);
var drawControl = new L.Control.Draw({
  edit: {
    featureGroup: drawnItems,
  },
});
map.addControl(drawControl);
/**
 * Event listener. Wenn ein Rechteck gezeichnet wird, werden nur noch die Bushaltestellen innerhalb des Rechtecks angezeigt.
 */
map.on(L.Draw.Event.CREATED, function (e) {
  var type = e.layerType,
    layer = e.layer;
  if (type === "marker") {
    // Do marker specific actions
  }
  map.addLayer(layer);

  //speichert die Koordinaten des Plygons
  let polygonCoords = [];
  polygonCoords.push(e.layer.getLatLngs());
  console.log(e.layer.getLatLngs());
  var poly = turf.polygon([
    [
      [polygonCoords[0][0].lat, polygonCoords[0][0].lng],
      [polygonCoords[0][1].lat, polygonCoords[0][1].lng],
      [polygonCoords[0][2].lat, polygonCoords[0][2].lng],
      [polygonCoords[0][3].lat, polygonCoords[0][3].lng],
      [polygonCoords[0][0].lat, polygonCoords[0][0].lng],
    ],
  ]);

  //iteriert durch alle Bushaltestellen und guckt, ob sie im Polygon liegen
  bushaltestellenArray.forEach((element) => {
    let d = element.getLatLng();
    var pt = turf.point([d.lat, d.lng]);

    console.log(turf.booleanPointInPolygon(pt, poly));

    if (turf.booleanPointInPolygon(pt, poly) == false) {
      map.removeLayer(element); //löscht alle marker die nicht im Polygon liegen
      //console.log(element);
    }
  });
});

/** 
loadBushaltestellenPromises();
var BushaltestellenPromise;
function loadBushaltestellenPromises() {
  fetch("https://rest.busradar.conterra.de/prod/haltestellen")
    .then((response) => {
      let res = response.json(); // return a Promise as a result
      console.log(res);
      res.then((data) => {
        // get the data in the promise result
        console.log(data);
        BushaltestellenPromise = data;
        console.log(BushaltestellenPromise);
        erstelleMarker();
      });
    })
    .catch((error) => console.log(error));
}
*/
/**
 * icon für Marker
 */
var shrekIcon = L.icon({
  iconUrl: "marker.png",
  iconSize: [30, 30],
});

var bushaltestellenArray = [];
/**
 * Lädt die Bushaltestellen mit Hilfe der fetch API
 */
var bushaltestellenPromise;
async function loadBushaltestellenAsyncAwait() {
  let res = await fetch("https://rest.busradar.conterra.de/prod/haltestellen");
  let data = await res.json();
  bushaltestellenPromise = data;
  console.log(data);

  bushaltestellenPromise.features.forEach((element) => {
    // erstellt für jede Bushaltestelle einen Marker
    bushaltestellenArray.push(
      L.marker(
        [element.geometry.coordinates[1], element.geometry.coordinates[0]],
        { icon: shrekIcon }
      )
        //erstellt ein Popup für jede Busehaltestelle mit Namen und Distanz zum Nutzer
        .bindPopup(
          element.properties.lbez +
            " " +
            "Distanz:" +
            Math.round(
              berechneDistanz(standort, [
                element.geometry.coordinates[1],
                element.geometry.coordinates[0],
              ])
            ) +
            "m"
        )
        .addTo(map)
    );
  });
}
