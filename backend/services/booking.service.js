import Booking from "../models/booking.model.js";

export const createBooking = async (userId, date) => {
  try {
    const booking = await Booking.create({ userId, date });
    return booking;
  } catch (err) {
    return null; // handles duplicate booking
  }
};

export const getUserBookings = async (userId) => {
  return await Booking.find({ userId });
};