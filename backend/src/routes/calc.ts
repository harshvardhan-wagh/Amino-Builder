import { Router } from "express";

const router = Router();

// basic molecular weight map
const aminoMass: Record<string, number> = {
  A: 89.09, C: 121.15, D: 133.10, E: 147.13,
  F: 165.19, G: 75.07, H: 155.16, I: 131.17,
  K: 146.19, L: 131.17, M: 149.21, N: 132.12,
  P: 115.13, Q: 146.15, R: 174.20, S: 105.09,
  T: 119.12, V: 117.15, W: 204.23, Y: 181.19
};

router.post("/", (req, res) => {
  const { sequence } = req.body;
  if (!sequence || typeof sequence !== "string")
    return res.status(400).json({ error: "Sequence required" });

  const seq = sequence.toUpperCase().replace(/[^A-Z]/g, "");
  const mw = seq.split("").reduce((sum, aa) => sum + (aminoMass[aa] || 0), 0);
  res.json({ sequence: seq, molecularWeight: mw.toFixed(2) });
});

export default router;
