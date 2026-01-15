import express from "express";
import db from "@repo/db/client";
import z from "zod";
const app = express();

app.use(express.json());

// Zod validation schema
const hdfcWebhookSchema = z.object({
  token: z.string(),
  user_identifier: z.coerce.string().or(z.number().transform(String)),
  amount: z.string(),
  secret: z.string(),
});

const HDFC_SECRET = process.env.HDFC_WEBHOOK_SECRET || "your-secret-key";

app.post("/hdfcWebhook", async (req, res) => {
  // Validate request body
  const validation = hdfcWebhookSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({
      message: "Invalid request body",
      errors: validation.error,
    });
  }

  // Verify webhook secret
  if (req.body.secret !== HDFC_SECRET) {
    return res.status(403).json({
      message: "Unauthorized - Invalid secret",
    });
  }

  const paymentInformation: {
    token: string;
    userId: string;
    amount: string;
  } = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };

  try {
    // Check if OnRampTransaction exists and is in Processing status
    const onRampTransaction = await db.onRampTransaction.findFirst({
      where: {
        token: paymentInformation.token,
      },
    });

    if (!onRampTransaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    if (onRampTransaction.status !== "Processing") {
      return res.status(400).json({
        message: `Transaction is not in Processing state. Current status: ${onRampTransaction.status}`,
      });
    }

    // Update balance and transaction status
    await db.$transaction([
      db.balance.updateMany({
        where: {
          userId: Number(paymentInformation.userId),
        },
        data: {
          amount: {
            // You can also get this from your DB
            increment: Number(paymentInformation.amount),
          },
        },
      }),
      db.onRampTransaction.updateMany({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);

    res.json({
      message: "Captured",
    });
  } catch (e) {
    console.error(e);
    res.status(411).json({
      message: "Error while processing webhook",
    });
  }
});

app.listen(3003);
