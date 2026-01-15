"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import { z } from "zod";

const P2PSchema = z.object({
  number: z
    .string()
    .length(10, "Phone number must be exactly 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  amount: z.coerce
    .number({ error: "Amount must be a number" })
    .positive("Amount must be positive")
    .min(1, "Minimum amount is ₹1")
    .max(100000, "Maximum amount is ₹1,00,000"),
});

export default function P2pPage() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [amountError, setAmountError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [formKey, setFormKey] = useState(0); // Add key for re-rendering

  // Real-time validation for amount
  const validateAmount = (value: string) => {
    if (!value) {
      setAmountError("");
      return false;
    }

    const num = Number(value);

    if (isNaN(num)) {
      setAmountError("Please enter a valid number");
      return false;
    }

    if (num <= 0) {
      setAmountError("Please enter positive number");
      return false;
    }

    if (num < 1) {
      setAmountError("Minimum amount is ₹1");
      return false;
    }

    if (num > 100000) {
      setAmountError("Maximum amount is ₹1,00,000");
      return false;
    }

    setAmountError("");
    return true;
  };

  // Real-time validation for number
  const validateNumber = (value: string) => {
    if (!value) {
      setNumberError("");
      return false;
    }

    if (value.length !== 10) {
      setNumberError("Phone number must be 10 digits");
      return false;
    }

    if (!/^\d+$/.test(value)) {
      setNumberError("Only digits allowed");
      return false;
    }

    setNumberError("");
    return true;
  };

  const isFormValid = () => {
    return (
      number.length === 10 &&
      /^\d+$/.test(number) &&
      amount !== "" &&
      Number(amount) > 0 &&
      Number(amount) >= 1 &&
      Number(amount) <= 100000 &&
      !amountError &&
      !numberError
    );
  };

  const handleTransfer = async () => {
    try {
      setError("");
      setSuccess("");
      setLoading(true);

      // Client-side validation
      const validatedData = P2PSchema.parse({
        number,
        amount,
      });

      const amountInPaise = validatedData.amount * 100;

      // Perform transfer
      const result = await p2pTransfer(validatedData.number, amountInPaise);

      if (!result?.success) {
        setError(result?.message || "Transfer failed");
        return;
      }

      // Success - reset everything
      setSuccess(result.message);
      setNumber("");
      setAmount("");
      setAmountError("");
      setNumberError("");
      setError("");
      setFormKey((prev) => prev + 1); // Force re-render to clear inputs
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Transfer failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[90vh]">
      <Center>
        <Card title="Send">
          <div className="min-w-72 pt-2" key={formKey}>
            <TextInput
              placeholder="Number"
              label="Number"
              onChange={(value) => {
                // Only allow digits
                const sanitized = value.replace(/\D/g, "").slice(0, 10);
                setNumber(sanitized);
                validateNumber(sanitized);
                setError("");
                setSuccess("");
              }}
            />
            {numberError && (
              <div className="text-red-500 text-sm mt-1">{numberError}</div>
            )}

            <TextInput
              placeholder="Amount"
              label="Amount"
              onChange={(value) => {
                // Check if user tried to enter negative
                if (value.includes("-")) {
                  setAmountError("Please enter positive number only");
                  setAmount("");
                  return;
                }

                // Block any non-numeric except decimal point
                let sanitized = value.replace(/[^0-9.]/g, "");

                // Prevent multiple decimal points
                const parts = sanitized.split(".");
                if (parts.length > 2) {
                  sanitized = parts[0] + "." + parts.slice(1).join("");
                }

                // Prevent starting with decimal
                if (sanitized.startsWith(".")) {
                  sanitized = "0" + sanitized;
                }

                setAmount(sanitized);
                validateAmount(sanitized);
                setError("");
                setSuccess("");
              }}
            />
            {amountError && (
              <div className="text-red-500 text-sm mt-1">{amountError}</div>
            )}

            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

            {success && (
              <div className="text-green-500 text-sm mt-2">{success}</div>
            )}

            <div className="pt-4 flex justify-center">
              <Button
                onClick={handleTransfer}
                //@ts-ignore
                disabled={loading || !isFormValid()}
              >
                {loading ? "Sending..." : "Send"}
              </Button>
            </div>
          </div>
        </Card>
      </Center>
    </div>
  );
}
