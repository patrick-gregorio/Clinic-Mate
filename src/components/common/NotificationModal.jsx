import { Check, XCircle, X as CloseIcon, ChevronRight } from "lucide-react";

export default function NotificationModal({
  isOpen,
  onClose,
  appointments = [],
}) {
  if (!isOpen) return null;

  // keep only approved / rejected, newest first
  const items = appointments
    .filter((appt) => {
      const status = (appt.status || "").toLowerCase();
      return status === "approved" || status === "rejected";
    })
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose}></div>

      <div className="absolute right-0 mt-2 z-50">
        <div className="w-72 sm:w-80 rounded-2xl bg-white shadow-xl border border-sky-100 overflow-hidden">
          {/* header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
            <span className="text-sm font-semibold text-gray-900">
              Notifications
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <CloseIcon className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* body */}
          {items.length === 0 ? (
            <div className="px-4 py-6 text-sm text-gray-500">
              No notifications yet.
            </div>
          ) : (
            <ul className="max-h-64 overflow-y-auto divide-y divide-gray-100">
              {items.map((item) => {
                const status = (item.status || "").toLowerCase();
                const isApproved = status === "approved";

                const message = isApproved
                  ? "Your appointment was approved!"
                  : "Your appointment was rejected.";

                const iconBg = isApproved
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600";

                return (
                  <li
                    key={item.id}
                    className="px-4 py-3 flex items-center justify-between hover:bg-sky-50 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${iconBg}`}
                      >
                        {isApproved ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <XCircle className="w-4 h-4" />
                        )}
                      </span>
                      <p className="text-sm text-gray-800">{message}</p>
                    </div>

                    {/* just like your design – nav arrow but no action */}
                    <ChevronRight className="w-4 h-4 text-black" />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
