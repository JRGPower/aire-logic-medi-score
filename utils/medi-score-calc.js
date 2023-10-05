const {
  conciousnessScore,
  spo2Score,
  temperatureScore,
  respirationScore,
  cbgScore,
  oxygenScore,
} = require("./medi-score-funcs");

function calculateMediScoreAvg(arrayOfRecords) {
  const mediScoreSum = arrayOfRecords?.reduce((acc, curr) => {
    const mediScore = calculateMediScore(curr.observation);
    return (acc += mediScore);
  }, 0);
  const mediScoreAvg = mediScoreSum ? mediScoreSum / arrayOfRecords.length : 0;
  const mediScoreAvgRounded = Math.round(mediScoreAvg * 100) / 100;
  return mediScoreAvgRounded;
}

function calculateMediScore(obs) {
  const score =
    respirationScore(obs?.respirationRate) +
    spo2Score(obs?.spO2, !!obs?.oxygen) +
    temperatureScore(Math.round(obs?.temperature * 10) / 10) +
    conciousnessScore(obs?.cvpu) +
    cbgScore(obs?.cbg) +
    oxygenScore(obs?.oxygen);
  return score;
}

module.exports = {
  calculateMediScore,
  calculateMediScoreAvg,
};
