import { Router } from "express";
import { calculateAllProperties } from "../services/aminoCalc";

const router = Router();

router.post("/", (req, res) => {
  const { sequence } = req.body;

  if (!sequence || typeof sequence !== "string") {
    return res.status(400).json({ error: "Sequence required" });
  }
  
  const normalizedSeq = sequence.toUpperCase().replace(/[^A-Z]/g, "");

  const result = calculateAllProperties(normalizedSeq);

  return res.json(result);
});

export default router;
