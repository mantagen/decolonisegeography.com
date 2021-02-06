import format from "date-fns/format";
import isValid from "date-fns/isValid";

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);

  if (!isValid(date)) {
    console.error(new Error(`formatDate called with ${dateStr}`));

    return null;
  }

  if (date.getFullYear() === new Date().getFullYear()) {
    return format(date, "d MMM");
  }

  return format(date, "d MMM yyyy");
};

export default formatDate;
