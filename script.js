let chart;
let hotspots = [];

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
      options: { responsive: true }
    }
  );
}

function updateDashboard() {

  const pressure = Number(pressureInput.value);
  const ambulances = Number(ambulanceInput.value);

  const epi = Math.round(pressure + ambulances * 1.5);
  epi.innerText = epi;

  const density = Math.round(ambulances / 5);
  document.getElementById("density").innerText = density;

  let alertStatus = "NORMAL";
  if (epi > 120) alertStatus = "CRITICAL";
  else if (epi > 90) alertStatus = "WARNING";

  document.getElementById("alert").innerText = alertStatus;

  chart.data.datasets[0].data =
    [ambulances, ambulances+2, ambulances+4, ambulances+5, ambulances+3];

  chart.update();
}

function addHotspot() {

  const zone = zoneInput.value;
  const accidents = Number(accidentInput.value);

  if(!zone || !accidents) return;

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

function applyFilters(){
  alert("Filters applied (MVP logic)");
}

window.onload = initChart;
