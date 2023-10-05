//Format DateTime string from db for easier reading: hh:mm - Day, dd, Month
function formatDateTime(dateTimeString) {
  const dateTime = new Date(dateTimeString);
  console.log(dateTime);
  const dateOptions = {
    weekday: "short",
    day: "2-digit",
    month: "short",
  };

  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };

  const formattedDate = dateTime.toLocaleDateString("en-UK", dateOptions);
  const formattedTime = dateTime.toLocaleTimeString("en-UK", timeOptions);
  console.log(
    "return from formatteddate time",
    `${formattedTime} - ${formattedDate}`
  );
  return `${formattedTime} - ${formattedDate}`;
}

module.exports = { formatDateTime };
