import { useState } from "react";
import axios from "axios";

const InviteUserPage = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Member");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleInvite = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${import.meta.env.VITE_API}api/users/invite`,
        { email, password, role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(`✅ User invited: ${res.data.user.email}`);
      setEmail("");
      setRole("Member");
      setPassword("");
    } catch (err) {
      setMessage("❌ Error inviting user or user already exists");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          👥 Invite User (Admin)
        </h2>
        <form onSubmit={handleInvite} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="User email"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Admin">Admin</option>
            <option value="Member">Member</option>
          </select>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl shadow hover:bg-indigo-700 transition font-semibold"
          >
            Invite
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default InviteUserPage;
