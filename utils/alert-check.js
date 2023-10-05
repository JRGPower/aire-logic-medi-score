function mediScoreAlertCheck({ mediScore, mediScoreAvg }) {
  const scoreComparision = mediScore - mediScoreAvg;
  let scoreAlertClass = "";
  switch (true) {
    case scoreComparision >= 3:
      scoreAlertClass = "alert-red";
      break;
    case scoreComparision >= 2:
      scoreAlertClass = "alert-amber";
      break;
    case scoreComparision >= 1:
      scoreAlertClass = "alert-yellow";
      break;
    case scoreComparision <= -2:
      scoreAlertClass = "alert-green";
      break;
    default:
      scoreAlertClass = "alert-none";
  }

  let avgAlertClass = "";
  switch (true) {
    case mediScoreAvg >= 8:
      avgAlertClass = "alert-red";
      break;
    case mediScoreAvg >= 4:
      avgAlertClass = "alert-amber";
      break;
    case mediScoreAvg >= 2:
      avgAlertClass = "alert-yellow";
      break;
    case mediScoreAvg === 0:
      avgAlertClass = "alert-green";
      break;
    default:
      avgAlertClass = "alert-none";
  }
  return { avgAlertClass, scoreAlertClass };
}

module.exports = { mediScoreAlertCheck };
