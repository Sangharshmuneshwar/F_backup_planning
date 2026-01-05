import { useState } from "react";
import { importOrders } from "../services/orderService";
import { useNotification } from "../contexts/NotificationContext"

export default function ImportOrdersButton() {
  const [loading, setLoading] = useState(false);
  
const { notify } = useNotification();

  const handleClick = async () => {
    try {
      setLoading(true);
      await importOrders();
     notify({
      type: "success",
      title: "Import complete",
      message: "Orders imported successfully into planning.",
    });
    } catch (err) {
     notify({
      type: "error",
      title: "Error importing orders",
      message: "Error occurred while importing orders. Please try again.",
    });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-full border border-sky-500 bg-sky-500 px-3 py-1.5 text-xs md:text-sm text-white hover:bg-sky-600 disabled:opacity-60 transition"
    >
      {loading ? "Importing..." : "⬇ Import Orders"}
    </button>
  );
}
