export const generateOrderId = () => {
  const prefix = "ORDER-";

  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let suffix = "";
  for (let i = 0; i < 6; i++) {
    suffix += chars.charAt(Math.floor(Math.random() * chars.length)); // abc123
  }

  const now = new Date();
  const datePart = now.toISOString().slice(2, 10).replace(/-/g, ""); // 250628

  let alternated = "";

  for (let i = 0; i < 6; i++) {
    if (i < suffix.length) alternated += suffix[i];
    if (i < datePart.length) alternated += datePart[i];
  }

  return prefix + alternated; // e.g., ORDER-a2b5c0162238
};
