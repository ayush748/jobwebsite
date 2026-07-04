import express from "express";
import { bookSeat, getBookings } from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/", bookSeat);
router.get("/:userId", getBookings);

export default router;