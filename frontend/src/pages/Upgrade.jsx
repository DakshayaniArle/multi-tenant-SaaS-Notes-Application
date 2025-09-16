import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Upgrade() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const tenant = localStorage.getItem("tenant"); // slug like "acme"

  if (role.toLowerCase() !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h3 className="text-xl font-semibold text-red-600 bg-white p-6 rounded-lg shadow">
          Access Denied: Only Admins can upgrade.
        </h3>
      </div>
    );
  }

  const upgrade = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API}api/tenant/${tenant}/upgrade`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Tenant upgraded to Pro!");
      navigate("/notes");
    } catch (err) {
      alert("❌ Upgrade failed: " + (err.response?.data?.error || "Unknown error"));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">🚀 Upgrade Plan</h2>
        <p className="text-gray-600 mb-6">
          Upgrade your tenant to <span className="font-semibold">Pro Plan</span> and unlock more features!
        </p>
        <button
          onClick={upgrade}
          className="w-full px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition font-semibold"
        >
          Upgrade to Pro
        </button>
      </div>
    </div>
  );
}
