import express from "express";
import Tenant from "../models/tenant.js";
import { authMiddleware } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/roles.js";

const router = express.Router();

router.post("/:slug/upgrade", authMiddleware, requireAdmin, async (req, res) => {
  const tenant = await Tenant.findOne({ slug: req.params.slug });
  if (!tenant) return res.status(404).json({ error: "Tenant not found" });
  if (tenant._id.toString() !== req.user.tenantId) {
    return res.status(403).json({ error: "Cannot upgrade other tenants" });
  }
  tenant.plan = "PRO";
  await tenant.save();
  res.json({ message: "Upgraded to Pro" });
});

export default router;
