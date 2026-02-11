let chart;

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


async function updateDashboard(event) {

  if(event) event.preventDefault();

  const btn = document.getElementById("updateBtn");
  btn.disabled = true;

  document.getElementById("alert").innerText = "Loading...";

  const pressure =
    Number(document.getElementById("pressureInput").value);

  const ambulances =
    Number(document.getElementById("ambulanceInput").value);

  try {

    const res = await fetch("http://127.0.0.1:8000/predict-pressure", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({pressure, ambulances})
    });

    const data = await res.json();

    if(data.error){
      alert(data.error);
      btn.disabled = false;
      return;
    }

    document.getElementById("epi").innerText = data.epi;
    document.getElementById("alert").innerText = data.alert;
    document.getElementById("loadDensity").innerText =
        data.load_density;

    const forecastRes = await fetch("http://127.0.0.1:8000/forecast", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({pressure, ambulances})
    });

    const forecastData = await forecastRes.json();

    chart.data.datasets[0].data = forecastData.forecast;
    chart.update();

  }
  catch(err){
    alert("Backend not running. Start FastAPI server.");
  }

  btn.disabled = false;
}

window.onload = initChart;
