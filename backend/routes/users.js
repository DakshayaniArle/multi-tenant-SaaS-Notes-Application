import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import Tenant from "../models/tenant.js";
import { authMiddleware } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/roles.js";

const router = express.Router();

// Admin invites new user to their tenant
router.post("/invite", authMiddleware, requireAdmin, async (req, res) => {
  const { email,password,role } = req.body;

  try {
    // check tenant from JWT
    const tenant = await Tenant.findOne({ slug: req.user.tenant?.slug }); 
    // console.log(tenant);
    if (!tenant) {
      return res.status(404).json({ error: "Tenant not found" });
    }

    // default password (could send email in real app)
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
      role,
      tenant: tenant._id, // reference tenant
    });

    await user.save();
    res.json({ message: "User invited successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
