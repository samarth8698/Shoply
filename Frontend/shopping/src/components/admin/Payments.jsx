import { useEffect, useState } from "react";
import { getPayments } from "../../services/paymentService";
import { CreditCard, Search } from "lucide-react";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      const data = await getPayments();
      setPayments(data);
    } catch (error) {
      console.error("Error loading payments:", error);
    }
  };

  const filteredPayments = payments.filter((payment) => {
    const paymentId = payment.razorpayPaymentId || "";
    const orderId = payment.razorpayOrderId || "";
    const status = payment.status || "";

    return (
      paymentId.toLowerCase().includes(search.toLowerCase()) ||
      orderId.toLowerCase().includes(search.toLowerCase()) ||
      status.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-3xl font-bold">
          <CreditCard size={30} />
          Payment Management
        </h1>

        <div className="relative">
          <Search
            className="absolute left-3 top-3 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search Payment..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-lg border py-2 pl-10 pr-4 outline-none"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border bg-white shadow">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Payment ID</th>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Currency</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment) => (
                <tr key={payment.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{payment.id}</td>

                  <td className="p-3">
                    {payment.razorpayPaymentId}
                  </td>

                  <td className="p-3">
                    {payment.razorpayOrderId}
                  </td>

                  <td className="p-3 font-semibold">
                    ₹{payment.amount}
                  </td>

                  <td className="p-3">
                    {payment.currency}
                  </td>

                  <td className="p-3">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="p-8 text-center text-gray-500"
                >
                  No Payments Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;