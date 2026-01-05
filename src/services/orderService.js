export async function importOrders() {
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/orders/import`,
    {
      method: "GET",
      credentials: "include", // send cookies (JWT)
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to import orders");
  }

  return true; // or return res.json() if backend returns data
}
