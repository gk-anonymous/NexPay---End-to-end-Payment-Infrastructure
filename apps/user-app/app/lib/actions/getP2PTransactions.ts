// app/lib/actions/getP2PTransactions.ts
"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function getP2PTransactions() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return [];
  }

  const transactions = await prisma.p2pTransfer.findMany({
    where: {
      OR: [{ fromUserId: Number(userId) }, { toUserId: Number(userId) }],
    },
    include: {
      fromUser: {
        select: {
          id: true,
          name: true,
          number: true,
        },
      },
      toUser: {
        select: {
          id: true,
          name: true,
          number: true,
        },
      },
    },
    orderBy: {
      timestamp: "desc",
    },
    take: 20, // Limit to last 20 transactions
  });

  return transactions.map((txn) => ({
    id: txn.id,
    amount: txn.amount,
    timestamp: txn.timestamp,
    fromUser: txn.fromUser,
    toUser: txn.toUser,
    type:
      txn.fromUserId === Number(userId)
        ? ("sent" as const)
        : ("received" as const),
  }));
}
