let chart;
let hotspotData = [];

function initChart() {
  chart = new Chart(
    document.getElementById("forecastChart"),
    {
      type: "line",
      data: {
        labels: ["Now", "+1h", "+2h", "+3h", "+4h"],
        datasets: [{
          label: "Predicted Arrivals",
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

  const basePressure = Number(pressureInput.value);
  const ambulances = Number(ambulanceInput.value);

  const epi = Math.round(basePressure + ambulances * 1.5);
  document.getElementById("epi").innerText = epi;

  const loadDensity = Math.round(ambulances / 5);
  document.getElementById("loadDensity").innerText = loadDensity;

  let alert = "NORMAL";
  if (epi > 120) alert = "CRITICAL";
  else if (epi > 90) alert = "WARNING";

  document.getElementById("alertStatus").innerText = alert;

  chart.data.datasets[0].data = [
    ambulances,
    ambulances + 3,
    ambulances + 6,
    ambulances + 8,
    ambulances + 6
  ];
  chart.update();
}

function addHotspot() {

  const zone = zoneInput.value;
  const accidents = Number(accidentInput.value);

  if (!zone || !accidents) return;

  const score = accidents * 2;

  hotspotData.push({ zone, accidents, score });

  renderHotspots();
  zoneInput.value = "";
  accidentInput.value = "";
}

function renderHotspots() {
  hotspotTable.innerHTML = "";

  hotspotData.forEach(h => {
    hotspotTable.innerHTML += `
      <tr>
        <td>${h.zone}</td>
        <td>${h.accidents}</td>
        <td>${h.score}</td>
      </tr>
    `;
  });
}

function applyFilters() {
  alert(
    `Filters Applied:
City: ${cityFilter.value}
Hospital: ${hospitalFilter.value}
Date: ${dateFilter.value}`
  );
}

window.onload = initChart;
