import { createBooking, getUserBookings } from "../services/booking.service.js";
import { isEligible } from "../services/eligibility.service.js";
import { getUser } from "../services/user.service.js";

export const bookSeat = async (req, res) => {
  try {
    const { userId, date } = req.body;

    const user = await getUser(userId);
    const allowed = await isEligible(user, date);

    if (!allowed) {
      return res.status(400).json({ message: "Not allowed" });
    }

    const booking = await createBooking(userId, date);

    if (!booking) {
      return res.status(400).json({ message: "Already booked" });
    }

    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getBookings = async (req, res) => {
  const bookings = await getUserBookings(req.params.userId);
  res.json(bookings);
};