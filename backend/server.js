const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("SafeHer AI Backend Running 🚀");
});

app.post("/api/safety-check", (req, res) => {

  const { destination, travelTime } = req.body;

  let safetyScore = "85%";
  let riskLevel = "Low Risk ✅";
  let warning = "✅ Safe Route";
  let recommendation =
    "Safe to travel.";

  const lowerDestination =
    destination.toLowerCase();

  // AI Logic
  if (
    lowerDestination.includes("market")
  ) {
    safetyScore = "60%";
    riskLevel =
      "Medium Risk ⚠️";

    warning =
      "⚠️ Moderate Risk Area";

    recommendation =
      "Stay alert and share location.";
  }

  if (
    lowerDestination.includes("station") ||
    lowerDestination.includes("isolated")
  ) {
    safetyScore = "35%";

    riskLevel =
      "High Risk 🚨";

    warning =
      "🚨 Unsafe Route Detected";

    recommendation =
      "Avoid travelling alone.";
  }

  // Night travel risk
  if (
    travelTime >= "22:00"
  ) {
    safetyScore = "50%";
    riskLevel =
      "Medium Risk ⚠️";
  }

  res.json({
    safetyScore,
    riskLevel,
    warning,
    recommendation,
  });
});

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});