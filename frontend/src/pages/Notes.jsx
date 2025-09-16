import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [singleNote, setSingleNote] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!token) return navigate("/");
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API}api/notes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  const fetchNoteById = async (id) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API}api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSingleNote(res.data);
    } catch (err) {
      console.error("Error fetching single note:", err);
    }
  };

  const addNote = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API}api/notes`,
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setText("");
      fetchNotes();
    } catch (err) {
      if (err.response?.status === 403) {
        navigate("/upgrade");
      }
    }
  };

  const startEdit = (note) => {
    setEditId(note._id);
    setEditText(note.text);
  };

  const saveEdit = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API}api/notes/${id}`,
        { text: editText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditId(null);
      setEditText("");
      fetchNotes();
    } catch (err) {
      console.error("Error updating note:", err);
    }
  };

  const deleteNote = async (id) => {
    await axios.delete(`${import.meta.env.VITE_API}api/notes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchNotes();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">📝 Notes</h2>

        {/* Admin buttons */}
        {role?.toLowerCase() === "admin" && (
          <div className="flex gap-3 mb-6 justify-center">
            <button
              onClick={() => navigate("/upgrade")}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
            >
              Upgrade Plan
            </button>
            <button
              onClick={() => navigate("/invite")}
              className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
            >
              Invite Users
            </button>
          </div>
        )}

        {/* Add Note */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Write a new note..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <button
            onClick={addNote}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>

        {/* Notes List */}
        <ul className="space-y-4">
          {notes.map((note) => (
            <li
              key={note._id}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition"
            >
              {editId === note._id ? (
                <div className="flex-1 flex gap-3">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <button
                    onClick={() => saveEdit(note._id)}
                    className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="px-3 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <span className="text-gray-700 flex-1">{note.text}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(note)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteNote(note._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => fetchNoteById(note._id)}
                      className="px-3 py-1 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
                    >
                      View
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>

        {/* Single Note Details */}
        {singleNote && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-50 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">📄 Note Details</h3>
            <p><span className="font-semibold">ID:</span> {singleNote._id}</p>
            <p><span className="font-semibold">Text:</span> {singleNote.text}</p>
            <p><span className="font-semibold">Author:</span> {singleNote.authorId}</p>
          </div>
        )}
      </div>
    </div>
  );
}
