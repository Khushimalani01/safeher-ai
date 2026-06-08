
import { useState } from "react";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap
} from "react-leaflet";
function ChangeMapView({ center }) {
  const map = useMap();

  map.setView(center, 13);

  return null;
}

function App() {
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [backendResult, setBackendResult] = useState(null);
  const [showSOS, setShowSOS] = useState(false);
  const [travelTime, setTravelTime] = useState("");
  const [destination, setDestination] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [mapPosition, setMapPosition] = useState([
  23.0225,
  72.5714
]);
  // Safety Score Logic
  const getSafetyScore = () => {
    if (travelTime >= "06:00" && travelTime < "21:00") {
      return "84%";
    } else if (travelTime >= "21:00") {
      return "58%";
    } else {
      return "35%";
    }
  };

  // Risk Level Logic
  const getRiskLevel = () => {
    if (travelTime >= "06:00" && travelTime < "21:00") {
      return "Low Risk ✅";
    } else if (travelTime >= "21:00") {
      return "Medium Risk ⚠️";
    } else {
      return "High Risk 🚨";
    }
  };

  // AI Route Detection
  const getRouteWarning = () => {
    const lowerDestination = destination.toLowerCase();

    if (
      lowerDestination.includes("dark") ||
      lowerDestination.includes("isolated") ||
      lowerDestination.includes("forest") ||
      lowerDestination.includes("empty road")
    ) {
      return "🚨 Unsafe Route Detected";
    }

    if (
      lowerDestination.includes("highway") ||
      lowerDestination.includes("station")
    ) {
      return "⚠️ Moderate Risk Area";
    }

    return "✅ Safe Route";
  };
  const getCurrentLocation = () => {
  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(
      (position) => {

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setCurrentLocation(
          `Lat: ${latitude.toFixed(2)}, Lng: ${longitude.toFixed(2)}`
        );

        setMapPosition([
          latitude,
          longitude
        ]);
      },

      () => {
        alert("Unable to fetch location");
      }
    );

  }
};
  const handleSafetyCheck = async () => {

  setLoading(true);

  try {

    const response = await axios.post(
      "http://localhost:5000/api/safety-check",
      {
        destination,
        travelTime,
      }
    );

    setBackendResult(response.data);

    setTimeout(() => {
      setLoading(false);
      setShowResult(true);
    }, 2000);

  } catch (error) {

    console.log(error);
    alert("Backend connection failed");

    setLoading(false);
  }
};
  return (
  <div className="relative min-h-screen bg-[#081120] via-[#0A1628] to-[#141E30] text-white overflow-hidden">

    {/* Premium Glow Effects */}
    <div className="fixed top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] animate-pulse pointer-events-none"></div>

    <div className="fixed bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] animate-pulse pointer-events-none"></div>
      {/* Navbar */}
      <nav className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          <span className="text-cyan-400">
            SafeHer
          </span>{" "}
          AI
        </h1>

        <button className="bg-white/10 border border-white/10 px-5 py-2 rounded-2xl hover:bg-white/20 transition">
          Get Started
        </button>

      </nav>

      {/* Dashboard */}
      <div className="grid lg:grid-cols-2 gap-8">

        {/* LEFT PANEL */}
        <div className="bg-white/5 backdrop-blur-xl border border-cyan-500/10 rounded-[40px] p-8 shadow-2xl hover:scale-[1.01] transition duration-500">

          <span className="bg-cyan-500/20 text-cyan-300 px-5 py-2 rounded-full text-sm">
            Women Safety Platform
          </span>

          <h1 className="text-5xl font-bold mt-8 leading-tight animate-pulse">
  Your Smart
  <br />
  <span className="text-cyan-400">
    Travel Safety
  </span>
  <br />
  <span className="text-purple-400">
    Companion
  </span>
</h1>

          <p className="text-slate-400 mt-5 text-lg">
            Predict safer travel routes, assess risks, and stay protected with smart safety insights.
          </p>

          {/* Input Card */}
         <div className="bg-[#0D1625] border border-cyan-500/10 shadow-xl rounded-[30px] p-7 mt-8">

            <input
  type="text"
  placeholder="📍 Enter Starting Location"
  value={currentLocation}
  onChange={(e) =>
    setCurrentLocation(e.target.value)
  }
  className="w-full bg-slate-900 border border-slate-700 p-4 rounded-2xl mb-4 outline-none focus:border-cyan-400 hover:scale-[1.02] transition duration-300"
/>
             <button
             onClick={getCurrentLocation}
             className="w-full mb-4 bg-slate-800 hover:bg-slate-700 py-3 rounded-2xl transition"
            >
              📍 Use My Current Location
              </button>

            <input
              type="text"
              placeholder="📍 Enter Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 p-4 rounded-2xl mb-4 outline-none focus:border-cyan-400 hover:scale-[1.02] transition duration-300"
            />

            {/* Time Picker */}
            <div className="mb-5">

              <label className="block text-slate-400 mb-2">
                Select Travel Time
              </label>

              <input
                type="time"
                value={travelTime}
                onChange={(e) => setTravelTime(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 p-4 rounded-2xl mb-4 outline-none focus:border-cyan-400 hover:scale-[1.02] transition duration-300"
              />

            </div>

            {/* Buttons */}
            <button
              onClick={handleSafetyCheck}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 py-4 rounded-2xl text-lg font-semibold hover:scale-[1.02] transition"
            >
              Check Route Safety 🚀
            </button>

           <button
  onClick={() => setShowSOS(!showSOS)}
  className="w-full mt-4 bg-red-600 hover:bg-red-700 py-4 rounded-2xl text-lg font-semibold transition"
>
  🚨 Emergency SOS
</button>

          </div>

          {/* SOS Panel */}
          {showSOS && (
  <div className="bg-red-500/10 border border-red-500/20 rounded-[30px] p-6 mt-6">

    <h2 className="text-2xl font-bold text-red-400 mb-4">
      Emergency Help
    </h2>

    <div className="grid gap-4">

      <button
  onClick={() => alert("Demo Mode: Calling Police 🚔")}
  className="bg-[#0D1625] p-4 rounded-2xl border border-white/10 text-left hover:bg-slate-800 transition"
>
  👮 Police: 100
</button>

      <button
  onClick={() => alert("Demo Mode: Calling Ambulance 🚑")}
  className="bg-[#0D1625] p-4 rounded-2xl border border-white/10 text-left hover:bg-slate-800 transition"
>
  🚑 Ambulance: 108
</button>

      <div className="bg-[#0D1625] p-4 rounded-2xl border border-white/10">
        👩 Trusted Contact: Mom
      </div>

      <button
        onClick={() => {
          window.open(
            `https://wa.me/?text=🚨 Emergency! I need help. My location: ${currentLocation}`
          );
        }}
        className="bg-red-600 hover:bg-red-700 py-3 rounded-2xl font-semibold transition"
      >
        📍 Share Live Location
      </button>

    </div>

  </div>
)}

        </div>

        {/* RIGHT PANEL */}
        <div className="bg-white/5 backdrop-blur-xl border border-cyan-500/10 rounded-[40px] p-8 shadow-2xl hover:scale-[1.01] transition duration-500">

          <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-4 mb-5">

  <p className="text-cyan-300">
    📍 Active Route
  </p>

  <p className="text-white font-semibold mt-2">
    {currentLocation || "Starting Location"}
    {" → "}
    {destination || "Destination"}
  </p>

</div>

          {/* Route Map */}
          <div className="bg-[#0D1625]/80 backdrop-blur-lg rounded-[30px] p-5 border border-cyan-500/10 mb-6 shadow-xl hover:shadow-cyan-500/20 transition duration-500">

            <div className="flex justify-between items-center mb-4">

              <h3 className="font-semibold">
                Live Route Map
              </h3>

              <span className="text-green-400 text-sm">
                Safe Route Active 🟢
              </span>

            </div>

            <div className="h-64 rounded-3xl overflow-hidden">
               <MapContainer
                 center={mapPosition}
                 zoom={13}
                 scrollWheelZoom={true}
                 className="h-full w-full rounded-3xl"
                 >
                  <TileLayer
                  attribution='&copy; OpenStreetMap contributors'
                  url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                  />
                  <ChangeMapView center={mapPosition} />
                  <Marker position={mapPosition}>
                    <Popup>
  📍 Your Current Location
  <br />
  {currentLocation}
</Popup>
                      </Marker>
                      </MapContainer>

            </div>

          </div>

          {loading ? (

  <div className="flex flex-col items-center justify-center h-60 text-cyan-400">

    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mb-5"></div>

    <h2 className="text-2xl font-bold">
      Analyzing Route...
    </h2>

    <p className="text-slate-400 mt-2">
      AI is checking travel safety
    </p>

  </div>

) : !showResult ? (

  <div className="flex items-center justify-center h-60 text-slate-500">
    Enter route details to view AI analysis
  </div>

) : (

  <div className="grid md:grid-cols-2 gap-5">

    <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-3xl p-6 hover:-translate-y-2 hover:scale-[1.02] transition duration-300 shadow-lg hover:shadow-cyan-500/20">
      <h3 className="text-cyan-400">
        Safety Score
      </h3>

      <p className="text-5xl font-bold mt-3">
        {backendResult?.safetyScore}
      </p>
    </div>

    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-3xl p-6 hover:-translate-y-2 hover:scale-[1.02] transition duration-300 shadow-lg hover:shadow-yellow-500/20">
      <h3 className="text-yellow-400">
        Risk Level
      </h3>

      <p className="text-2xl font-bold mt-3">
        {backendResult?.riskLevel}
      </p>
    </div>

    <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-6 hover:-translate-y-2 hover:scale-[1.02] transition duration-300 shadow-lg hover:shadow-red-500/20">
      <h3 className="text-red-400">
        AI Route Detection
      </h3>

      <p className="text-2xl font-bold mt-3">
        {backendResult?.warning}
      </p>
    </div>

    <div className="bg-green-500/10 border border-green-500/20 rounded-3xl p-6">

      <h3 className="text-green-400 mb-3">
        Safety Tips
      </h3>

      <ul className="space-y-2 text-slate-300 text-sm">
        <li>✔ Share live location</li>
        <li>✔ Prefer main roads</li>
        <li>✔ Avoid isolated areas</li>
      </ul>

    </div>

  </div>

)}

        </div>

      </div>

    </div>
  );
}

export default App;