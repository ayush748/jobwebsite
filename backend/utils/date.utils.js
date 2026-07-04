export const isWeekend = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  return day === 0 || day === 6;
};

export const getWeekNumber = (date) => {
  const d = new Date(date);
  const oneJan = new Date(d.getFullYear(), 0, 1);
  const days = Math.floor((d - oneJan) / 86400000);
  return Math.ceil((days + oneJan.getDay() + 1) / 7);
};