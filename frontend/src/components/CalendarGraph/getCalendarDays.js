/**
 * @param {Date | string} start
 * @param {Date | string} end
 */
const getDays = (start, end) => {
  const dayMs = 86400000;
  const startDate = new Date(start);
  const startTimeStamp = startDate.getTime();
  const endDate = new Date(end);
  const dayCount = (endDate - startDate) / dayMs;
  const days = Array.from(
    { length: dayCount },
    (_, i) => new Date(startTimeStamp + dayMs * i)
  );
  return days;
};

/**
 * @param {Date[]} days
 */
const getWeekGroupedDays = days => {
  if (days.length <= 1) {
    return [];
  }

  const firstDayIndex = days[0].getDay();
  const rest = [...days];
  const firstWeek = rest.splice(0, 7 - firstDayIndex);
  const weeks = [firstWeek];

  while (rest.length) {
    const week = rest.splice(0, 7);
    weeks.push(week);
  }

  return weeks;
};

/**
 * @param {Date | string} start
 * @param {Date | string} end
 */
const getCalendarDays = (start, end) => {
  const days = getDays(start, end);
  const weekGroupedDays = getWeekGroupedDays(days);
  const firstWeekDaysCount = weekGroupedDays[0].length;
  if (firstWeekDaysCount < 7) {
    weekGroupedDays[0].splice(
      0,
      0,
      ...new Array(7 - firstWeekDaysCount).fill(null)
    );
  }

  return weekGroupedDays;
};

export default getCalendarDays;
