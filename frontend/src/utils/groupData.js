import {
  eachWeekOfInterval,
  endOfWeek,
  isWithinInterval,
  format,
} from "date-fns";

export const groupDataByWeeks = (data, monthStart, monthEnd) => {
  if (!data.length) return [];
  const weeks = eachWeekOfInterval({ start: monthStart, end: monthEnd });
  return weeks.map((weekStart) => {
    const weekEnd = endOfWeek(weekStart);
    const itemsInThisWeek = data.filter((item) =>
      isWithinInterval(new Date(item.createdAt), {
        start: weekStart,
        end: weekEnd,
      }),
    );
    return {
      weekLabel: `week of ${format(weekStart, "MMM do")}`,
      items: itemsInThisWeek.length,
    };
  });
};

export const groupDataByMonths = (data, monthStart, monthEnd) => {
  if (!data.length) return [];
  const itemsInThisMonth = data.filter((item) => {
    if (!item.createdAt) return false;
    return isWithinInterval(new Date(item.createdAt), {
      start: monthStart,
      end: monthEnd,
    });
  });

  return itemsInThisMonth;
};
