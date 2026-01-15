// components/P2PTransactions.tsx
import { Card } from "@repo/ui/card";

export const P2PTransactions = ({
  transactions,
}: {
  transactions: {
    id: number;
    amount: number;
    timestamp: Date;
    fromUser: {
      id: number;
      name: string | null;
      number: string;
    };
    toUser: {
      id: number;
      name: string | null;
      number: string;
    };
    type: "sent" | "received";
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8 text-slate-500">
          No Recent transactions
        </div>
      </Card>
    );
  }

  return (
    <Card title="Recent Transactions">
      <div className="pt-2 space-y-2">
        {transactions.map((t) => {
          const isSent = t.type === "sent";
          const otherUser = isSent ? t.toUser : t.fromUser;
          const displayName = otherUser.name || `User ${otherUser.number}`;

          return (
            <div
              key={t.id}
              className="flex justify-between items-center border-b py-3 last:border-b-0 hover:bg-slate-50 px-2 rounded transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {/* Icon based on transaction type */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isSent ? "bg-red-100" : "bg-green-100"
                    }`}
                  >
                    {isSent ? (
                      <svg
                        className="w-4 h-4 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 17l-5-5m0 0l5-5m-5 5h12"
                        />
                      </svg>
                    )}
                  </div>

                  <div>
                    <div className="text-sm font-semibold">
                      {isSent ? (
                        <span className="text-slate-800">
                          Sent to {displayName}
                        </span>
                      ) : (
                        <span className="text-slate-800">
                          Received from {displayName}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500">
                      {otherUser.number}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {new Date(t.timestamp).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <span
                  className={`text-base font-bold ${
                    isSent ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {isSent ? "- " : "+ "}₹{(t.amount / 100).toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
