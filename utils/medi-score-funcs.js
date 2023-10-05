function oxygenScore(oxygen) {
  if (oxygen) {
    return 2;
  } else return 0;
}

function conciousnessScore(observed) {
  if (observed) {
    return 3;
  } else return 0;
}

function cbgScore(cbg) {
  if (!cbg) {
    return 0;
  }
  if (cbg.fasting === true) {
    if (cbg.value >= 6.0) {
      return 3;
    } else if (cbg.value >= 5.5 && cbg.value <= 5.9) {
      return 2;
    } else if (cbg.value >= 4.0 && cbg.value <= 5.4) {
      return 0;
    } else if (cbg.value >= 3.5 && cbg.value <= 3.9) {
      return 2;
    } else if (cbg.value > 0 && cbg.value <= 3.4) {
      return 3;
    } else {
      return 0;
    }
  } else if (cbg.fasting === false) {
    if (cbg.value >= 9.0) {
      return 3;
    } else if (cbg.value >= 7.9 && cbg.value <= 8.9) {
      return 2;
    } else if (cbg.value >= 5.9 && cbg.value <= 7.8) {
      return 0;
    } else if (cbg.value >= 4.5 && cbg.value <= 5.8) {
      return 2;
    } else if (cbg.value > 0 && cbg.value <= 4.5) {
      return 3;
    } else {
      return 0;
    }
  } else return 0;
}

function spo2Score(spo2, oxygen) {
  if (oxygen && spo2 >= 97) {
    return 3;
  } else if (oxygen && spo2 >= 95 && spo2 <= 96) {
    return 2;
  } else if (oxygen && spo2 >= 93 && spo2 <= 94) {
    return 1;
  } else if (!oxygen && spo2 >= 93) {
    return 0;
  } else if (spo2 >= 88 && spo2 <= 92) {
    return 0;
  } else if (spo2 >= 86 && spo2 <= 87) {
    return 1;
  } else if (spo2 >= 84 && spo2 <= 85) {
    return 2;
  } else if (spo2 > 0 && spo2 <= 83) {
    return 3;
  } else {
    return 0;
  }
}

function temperatureScore(temp) {
  if (temp >= 39.1) {
    return 2;
  } else if (temp >= 38.1 && temp <= 39.0) {
    return 1;
  } else if (temp >= 36.1 && temp <= 38.0) {
    return 0;
  } else if (temp >= 35.1 && temp <= 36.0) {
    return 1;
  } else if (temp > 0 && temp <= 35.0) {
    return 3;
  } else {
    return 0;
  }
}

function respirationScore(respRate) {
  if (respRate >= 25) {
    return 3;
  } else if (respRate >= 21 && respRate <= 24) {
    return 2;
  } else if (respRate >= 12 && respRate <= 20) {
    return 0;
  } else if (respRate >= 9 && respRate <= 11) {
    return 1;
  } else if (respRate > 0 && respRate <= 8) {
    return 3;
  } else {
    return 0;
  }
}

module.exports = {
  conciousnessScore,
  spo2Score,
  temperatureScore,
  respirationScore,
  cbgScore,
  oxygenScore,
};
