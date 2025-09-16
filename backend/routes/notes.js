import express from "express";
import Note from "../models/note.js";
import Tenant from "../models/tenant.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Create Note
router.post("/", authMiddleware, async (req, res) => {
  const { text } = req.body;

  try {
    const tenant = await Tenant.findById(req.user.tenantId);

    // free plan limit check
    if (tenant?.plan === "FREE") {
      const count = await Note.countDocuments({ tenantId: tenant._id });
      if (count >= 3) {
        return res
          .status(403)
          .json({ error: "Free plan limit reached. Upgrade to Pro." });
      }
    }

    const note = await Note.create({
      text,
      tenantId: req.user.tenantId,
      authorId: req.user.id,
    });

    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// List Notes (all tenant notes)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ tenantId: req.user.tenantId });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get Note by ID (tenant-isolated)
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      tenantId: req.user.tenantId,
    });

    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Update Note by ID (tenant-isolated)
router.put("/:id", authMiddleware, async (req, res) => {
  const { text } = req.body;

  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, tenantId: req.user.tenantId },
      { text },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete Note by ID (tenant-isolated)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      tenantId: req.user.tenantId,
    });

    if (!note) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
