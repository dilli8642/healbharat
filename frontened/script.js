let chart;
let hotspots = [];

/* ---------- INIT FORECAST CHART ---------- */
function initChart() {
  chart = new Chart(
    document.getElementById("forecastChart"),
    {
      type: "line",
      data: {
        labels: ["Now","+1h","+2h","+3h","+4h"],
        datasets: [{
          label: "Predicted Ambulance Arrivals",
          data: [0,0,0,0,0],
          borderWidth: 3,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  );
}


/* ---------- UPDATE DASHBOARD ---------- */
async function updateDashboard() {

  const pressure = Number(document.getElementById("pressureInput").value);
  const ambulances = Number(document.getElementById("ambulanceInput").value);

  if (pressure < 0 || ambulances < 0) {
      alert("Invalid input");
      return;
  }

  /* ---- PRESSURE PREDICTION ---- */
  const pressureRes = await fetch("http://127.0.0.1:8000/predict-pressure", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
          pressure: pressure,
          ambulances: ambulances
      })
  });

  const pressureData = await pressureRes.json();

  document.getElementById("epi").innerText = pressureData.epi;
  document.getElementById("alert").innerText = pressureData.alert;
document.getElementById("loadDensity").innerText =
    pressureData.load_density;


  /* ---- FORECAST API ---- */
  const forecastRes = await fetch("http://127.0.0.1:8000/forecast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
          pressure: pressure,
          ambulances: ambulances
      })
  });

  const forecastData = await forecastRes.json();

  chart.data.datasets[0].data = forecastData.forecast;
  chart.update();
}


/* ---------- HOTSPOT ADD ---------- */
function addHotspot() {

  const zone = zoneInput.value;
  const accidents = Number(accidentInput.value);

  if (!zone || accidents <= 0) return;

  const score = accidents * 2;

  hotspots.push({zone, accidents, score});

  hotspotTable.innerHTML += `
    <tr>
      <td>${zone}</td>
      <td>${accidents}</td>
      <td>${score}</td>
    </tr>
  `;

  zoneInput.value="";
  accidentInput.value="";
}


/* ---------- FILTERS ---------- */
function applyFilters(){
  alert("Filters applied (Phase-2 MVP logic)");
}


window.onload = initChart;
