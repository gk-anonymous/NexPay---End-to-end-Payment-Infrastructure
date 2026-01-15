"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";
import { z } from "zod";

const P2PSchema = z.object({
  to: z.string().length(10).regex(/^\d+$/),
  amount: z.number().positive().min(100).max(10000000), // in paise
});

export async function p2pTransfer(to: string, amount: number) {
  const session = await getServerSession(authOptions);
  const from = session?.user?.id;

  if (!from) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  // Server-side validation
  try {
    P2PSchema.parse({ to, amount });
  } catch (error) {
    return {
      success: false,
      message: "Invalid input",
    };
  }

  const toUser = await prisma.user.findFirst({
    where: {
      number: to,
    },
  });

  if (!toUser) {
    return {
      success: false,
      message: "User not found",
    };
  }

  // Prevent self-transfer
  if (Number(from) === toUser.id) {
    return {
      success: false,
      message: "Cannot transfer to yourself",
    };
  }

  try {
    await prisma.$transaction(async (tx) => {
      // Check balance
      const fromBalance = await tx.balance.findUnique({
        where: { userId: Number(from) },
      });

      if (!fromBalance || fromBalance.amount < amount) {
        throw new Error("Insufficient funds");
      }

      // Update sender balance
      await tx.balance.update({
        where: { userId: Number(from) },
        data: { amount: { decrement: amount } },
      });

      // Update receiver balance
      await tx.balance.update({
        where: { userId: toUser.id },
        data: { amount: { increment: amount } },
      });

      // Create p2p transfer record
      await tx.p2pTransfer.create({
        data: {
          fromUserId: Number(from),
          toUserId: toUser.id,
          amount,
          timestamp: new Date(),
        },
      });
    });

    return {
      success: true,
      message: "Transfer successful",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Transfer failed",
    };
  }
}
