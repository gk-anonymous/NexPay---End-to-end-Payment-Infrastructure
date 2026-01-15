// app/p2p/page.tsx
import { getP2PTransactions } from "../../lib/actions/getP2PTransactions";
import { P2PTransactions } from "../../../components/P2PTransactions";
import SendCard from "../../../components/SendCard";

export default async function P2pPage() {
  const transactions = await getP2PTransactions();

  return (
    <div className="w-full min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
          P2P Transfer
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 pb-8">
          <div>
            <SendCard />
          </div>
          <div>
            <P2PTransactions transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}
