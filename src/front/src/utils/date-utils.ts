import dayjs from "dayjs";
import "dayjs/locale/fr";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc).locale("fr");

// export const formatDate = (str: string | Date): string => {
//   if (!str) {
//     return "";
//   }
//   return dayjs(str).format("DD-MMM-YYYY");
// };

export const formatDate = (
  date: string | Date,
  reversed: boolean = false,
  separator: string = "-"
) => {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  if (reversed) {
    return [day, month, year].join(separator);
  }
  return `${year}${separator}${month}${separator}${day}`;
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
