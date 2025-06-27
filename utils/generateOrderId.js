export const generateOrderId = () => {
  const prefix = "ORDER-";

  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let suffix = "";
  for (let i = 0; i < 6; i++) {
    suffix += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, ""); // e.g., 20250626

  return prefix + suffix + datePart; // e.g., ORDER-abc12320250626
};
