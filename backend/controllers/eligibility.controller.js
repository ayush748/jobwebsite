import Holiday from "../models/holiday.model.js";
import { isWeekend, getWeekNumber } from "../utils/date.utils.js";

export const isEligible = async (user, date) => {
  if (!user) return false;

  if (isWeekend(date)) return false;

  const holiday = await Holiday.findOne({ date });
  if (holiday) return false;

  const hour = new Date().getHours();
  if (hour < 15) return false;

  if (user.teamType === "nonDesignation") return true;

  const week = getWeekNumber(date);
  const day = new Date(date).getDay();

  if (user.batch === 1) {
    if (week % 2 === 1) return day >= 1 && day <= 3;
    return day >= 4 && day <= 5;
  }

  if (user.batch === 2) {
    if (week % 2 === 1) return day >= 4 && day <= 5;
    return day >= 1 && day <= 3;
  }

  return false;
};