import {
  format,
  formatDistance,
  formatRelative,
  differenceInHours,
  differenceInDays
} from "date-fns";

export const htmlStringToText = (html: string): string => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || "";
};

export const formatDateByDistance = (d: Date) => {
  const date = new Date(d);
  const now = new Date();
  if (differenceInDays(now, date) > 3) {
    return format(date, "MMM dd");
  } else if (differenceInHours(now, date) > 24) {
    return formatDistance(date, now, { addSuffix: true });
  } else {
    return formatRelative(date, now);
  }
};
