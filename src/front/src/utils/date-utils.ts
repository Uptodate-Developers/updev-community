import dayjs from "dayjs";
import "dayjs/locale/fr";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc).locale("fr");

export const formatDate = (str: string): string => {
  if (!str) {
    return "";
  }
  return dayjs(str).format("DD-MMM-YYYY");
};

export const humanReadableDate = (str: string): string => {
  if (!str) {
    return "";
  }
  return dayjs(str)
    .local()
    .toDate()
    .toString();
};
