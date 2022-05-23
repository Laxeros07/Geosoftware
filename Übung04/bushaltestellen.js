/**
 * Variablen die ich global speichern musste, weils sonst nicht tut
 */

var meinStandort = []; //soll meinen aktuellen Standort speichern
var bushalten = []; //Array der die Bushaltestellenobjekte speichert
var abfahrtszeitpunkt; //speichert den Zeitpunkt der nächsten Abfahrt

/**
 * holt den Standort des Benutzers
 */
function getBushalte() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(setzeStandort);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
/**
 * Holt die Busahlten von einer API und parsed die JSON Datei
 * @param position
 */
function setzeStandort(position) {
  meinStandort[0] = position.coords.longitude; // speichert Standort als Array
  meinStandort[1] = position.coords.latitude;

  let xhttp = new XMLHttpRequest();
  xhttp.onerror = () => {
    alert("oh ups! try again"); //gitb Fehler wenn die API nicht erreicht werden kann
  };
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let res = JSON.parse(this.responseText);

      console.log(res);
      erstelleArray(res); // ruft erstelleArray auf um aus dem JSON einen Array zu machen

      bushalten.forEach((element) => {
        document.getElementById("bushaltenUndDistanzen").innerHTML += //gibt die Bushaltestellen und die Entfernungen auf der Website aus
          "<p>" +
          element.name +
          " " +
          element.name +
          " Entfernung: " +
          element.distanz.toFixed(0) +
          "m" +
          "</p>";
      });
    }
    if (this.readyState == 4 && this.status != 200) {
      alert("oh ups! try again");
    }
  };
  xhttp.open(
    "GET",
    "https://rest.busradar.conterra.de/prod/haltestellen",
    true
  );
  xhttp.send();
}
/**
 * Holt sich die Abfahrtszeiten der Busse von der API und speichert die nächste abfahrtszeit vom nahsten Bus
 */
function abfahrt() {
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let res = JSON.parse(this.responseText);
      console.log(res);
      if (res.length == 0) {
        document.getElementById("zeitpunkt").innerHTML +=
          "<p>" + "keine Abfahrtszeit in den nächsten 5 Minuten :(" + "</p>";
      }
      abfahrtszeitpunkt = res[0].abfahrtszeit;
      zeitumwandlung(); //ruft die Funktion der Zeitumwandlung auf, um die unix zeit in eine Uhrzeit umzuwandeln
      //und auf der website auszugeben
    }
  };
  xhttp.open(
    "GET",
    "https://rest.busradar.conterra.de/prod/haltestellen/" +
      bushalten[0].nummer +
      "/abfahrten?sekunden=300",
    true
  );
  xhttp.send();
}
function zeitumwandlung() {
  let unix_timestamp = abfahrtszeitpunkt;
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  var date = new Date(unix_timestamp * 1000);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();

  // Will display time in 10:30:23 format
  var formattedTime =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

  console.log(formattedTime);
  document.getElementById("zeitpunkt").innerHTML +=
    "<p>" + "Abfahrt an der nahsten Bushaltestelle: " + formattedTime + "</p>";
}

class Bushaltestellen {
  /**
   * Klasse mit dem Objekt Bus welches folgende Attribute hat:
   * @param {String} name
   * @param {int} nummer
   * @param {array} koordinaten
   * @param {float} distanz
   */
  constructor(name, nummer, koordinaten, distanz) {
    this.name = name;
    this.nummer = nummer;
    this.koordinaten = koordinaten;
    this.distanz = berechneDistanz(this.koordinaten, meinStandort);
  }

  getnummer() {
    return this.nummer;
  }

  getkoordinaten() {
    return this.koodinaten;
  }

  getabfahrtszeit() {
    return this.abfahrtszeit;
  }
}
/**
 * Erstellt nach Distanzen sortierten array mit Objekten Bushaltestellen
 * @param {JSON} res
 */
function erstelleArray(res) {
  res.features.forEach((element) => {
    bushalten.push(
      new Bushaltestellen(
        element.properties.lbez,
        element.properties.nr,
        element.geometry.coordinates
      )
    );
  });
  bushalten.sort(function (a, b) {
    return a.distanz - b.distanz;
  });
  console.log(bushalten);
  abfahrt();
}
