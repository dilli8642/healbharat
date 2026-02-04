let chart;
function initChart() {
  const ctx = document.getElementById("forecastChart").getContext("2d");

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Now", "1Hr", "2Hr", "3Hr", "4Hr", "5Hr", "6Hr"],
      datasets: [{
        label: "Forecast Arrivals",
        data: [0, 0, 0, 0, 0, 0, 0],
        borderWidth: 3,
        tension: 0.4
      }]
    },
    options: {
      responsive: true
    }
  });
}

function updateDashboard() {

  let pressure = Number(document.getElementById("pressureInput").value);
  let ambulance = Number(document.getElementById("ambulanceInput").value);

  document.getElementById("pressureScore").innerText = pressure + "%";
  document.getElementById("ambulanceCount").innerText = ambulance;

  let risk = "LOW";
  if (pressure >= 70) risk = "HIGH";
  else if (pressure >= 40) risk = "MEDIUM";

  document.getElementById("riskStatus").innerText = risk;

  let forecast = [
    ambulance,
    ambulance + 3,
    ambulance + 6,
    ambulance + 8,
    ambulance + 6,
    ambulance + 4,
    ambulance + 2
  ];

  chart.data.datasets[0].data = forecast;
  chart.update();
}

function addHotspot() {

  let zone = document.getElementById("zoneInput").value;
  let accidents = document.getElementById("accidentInput").value;
  let risk = document.getElementById("riskInput").value;

  if (!zone || !accidents) {
    alert("Please fill all fields!");
    return;
  }

  document.getElementById("hotspotTable").innerHTML += `
    <tr>
      <td>${zone}</td>
      <td>${accidents}</td>
      <td>${risk}</td>
    </tr>
  `;

  document.getElementById("zoneInput").value = "";
  document.getElementById("accidentInput").value = "";
}

window.onload = initChart;
