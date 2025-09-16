export const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === "Admin") {
    return next();
  }
  return res.status(403).json({ error: "Admin access required" });
};
