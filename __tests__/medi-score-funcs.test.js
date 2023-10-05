const {
  respirationScore,
  temperatureScore,
  conciousnessScore,
  spo2Score,
  cbgScore,
  oxygenScore,
} = require("../utils/medi-score-funcs.js");

describe("conciousnessScore function", () => {
  describe("returns correct score for Bool inputs", () => {
    it("should return 0 when passed false", () => {
      expect(conciousnessScore(false)).toBe(0);
    });
    it("should return 2 when passed true", () => {
      expect(conciousnessScore(true)).toBe(3);
    });
  });
  describe("handle invalid inputs", () => {
    it("should return 0 for undefined input", () => {
      expect(conciousnessScore()).toBe(0);
    });
    it("should return 0 for null input", () => {
      expect(conciousnessScore(null)).toBe(0);
    });
  });
});

describe("oxygenScore function", () => {
  describe("returns correct score for Bool inputs", () => {
    it("should return 0 when passed false", () => {
      expect(oxygenScore(false)).toBe(0);
    });
    it("should return 2 when passed true", () => {
      expect(oxygenScore(true)).toBe(2);
    });
  });
  describe("handle invalid inputs", () => {
    it("should return 0 for undefined input", () => {
      expect(oxygenScore()).toBe(0);
    });
    it("should return 0 for null input", () => {
      expect(oxygenScore(null)).toBe(0);
    });
  });
});

describe("respirationScore function", () => {
  describe("returns correct score for number inputs in expected range", () => {
    it("should return 3 for respRate >= 25", () => {
      expect(respirationScore(25)).toBe(3);
      expect(respirationScore(30)).toBe(3);
    });

    it("should return 2 for respRate between 21 and 24 (inclusive)", () => {
      expect(respirationScore(21)).toBe(2);
      expect(respirationScore(24)).toBe(2);
    });

    it("should return 0 for respRate between 12 and 20 (inclusive)", () => {
      expect(respirationScore(12)).toBe(0);
      expect(respirationScore(20)).toBe(0);
    });

    it("should return 1 for respRate between 9 and 11 (inclusive)", () => {
      expect(respirationScore(9)).toBe(1);
      expect(respirationScore(11)).toBe(1);
    });

    it("should return 3 for respRate <= 8", () => {
      expect(respirationScore(8)).toBe(3);
      expect(respirationScore(1)).toBe(3);
    });
  });
  describe("handle invalid inputs", () => {
    it("should return 0 for undefined input", () => {
      expect(respirationScore()).toBe(0);
    });
    it("should return 0 for null input", () => {
      expect(respirationScore(null)).toBe(0);
    });
    // it("should return 0 for invalid input type", () => {
    //   expect(respirationScore("test string")).toBe(0);
    //   expect(respirationScore(true)).toBe(0);
    //   expect(respirationScore([])).toBe(0);
    // });
  });
});

describe("temperatureScore function", () => {
  describe("returns correct score for number inputs in expected range", () => {
    it("should return 2 for temp >= 39.1", () => {
      expect(temperatureScore(39.1)).toBe(2);
      expect(temperatureScore(40)).toBe(2);
    });

    it("should return 1 for temp between 38.1 and 39.0 (inclusive)", () => {
      expect(temperatureScore(38.1)).toBe(1);
      expect(temperatureScore(39)).toBe(1);
    });

    it("should return 0 for temp between 36.1 and 38.0 (inclusive)", () => {
      expect(temperatureScore(36.1)).toBe(0);
      expect(temperatureScore(38)).toBe(0);
    });

    it("should return 1 for temp between 35.1 and 36.0 (inclusive)", () => {
      expect(temperatureScore(35.1)).toBe(1);
      expect(temperatureScore(36)).toBe(1);
    });

    it("should return 3 for temp <= 35.0", () => {
      expect(temperatureScore(35.0)).toBe(3);
      expect(temperatureScore(34)).toBe(3);
    });
  });
  describe("handle invalid inputs", () => {
    it("should return 0 for undefined input", () => {
      expect(temperatureScore()).toBe(0);
    });
    it("should return 0 for null input", () => {
      expect(temperatureScore(null)).toBe(0);
    });
  });
});

describe("spo2Score function", () => {
  describe("returns correct scores for inputs in expected range", () => {
    it("should return correct scores when oxygen is true", () => {
      expect(spo2Score(97, true)).toBe(3);
      expect(spo2Score(100, true)).toBe(3);

      expect(spo2Score(95, true)).toBe(2);
      expect(spo2Score(96, true)).toBe(2);

      expect(spo2Score(93, true)).toBe(1);
      expect(spo2Score(94, true)).toBe(1);
    });
    it("should return correct scores when oxygen is false", () => {
      expect(spo2Score(93, false)).toBe(0);
      expect(spo2Score(100, false)).toBe(0);

      expect(spo2Score(88, true)).toBe(0);
      expect(spo2Score(92, true)).toBe(0);

      expect(spo2Score(86, true)).toBe(1);
      expect(spo2Score(87, true)).toBe(1);

      expect(spo2Score(84, true)).toBe(2);
      expect(spo2Score(85, true)).toBe(2);

      expect(spo2Score(83, true)).toBe(3);
      expect(spo2Score(80, true)).toBe(3);
    });
  });
  describe("handle invalid inputs", () => {
    it("should return 0 for undefined input", () => {
      expect(spo2Score()).toBe(0);
    });
    it("should return 0 for null input", () => {
      expect(spo2Score(null)).toBe(0);
    });
  });
});

describe("cbgScore", () => {
  describe("returns correct scores for number inputs in expected range", () => {
    test("fasting CBG values", () => {
      expect(cbgScore({ fasting: true, value: 6.0 })).toBe(3);
      expect(cbgScore({ fasting: true, value: 5.5 })).toBe(2);
      expect(cbgScore({ fasting: true, value: 4.0 })).toBe(0);
      expect(cbgScore({ fasting: true, value: 3.5 })).toBe(2);
      expect(cbgScore({ fasting: true, value: 3.4 })).toBe(3);
    });

    test("non-fasting CBG values", () => {
      expect(cbgScore({ fasting: false, value: 9.0 })).toBe(3);
      expect(cbgScore({ fasting: false, value: 7.9 })).toBe(2);
      expect(cbgScore({ fasting: false, value: 5.9 })).toBe(0);
      expect(cbgScore({ fasting: false, value: 4.5 })).toBe(2);
      expect(cbgScore({ fasting: false, value: 4.0 })).toBe(3);
    });
  });
  describe("handle invalid inputs", () => {
    describe("should return 0 for invalid cbg.value or invalid cbg.fasting", () => {
      test("case 1", () => {
        expect(cbgScore({ fasting: true, value: -1 })).toBe(0);
        expect(cbgScore({ fasting: false, value: -1 })).toBe(0);
      });
      test("case 2", () => {
        expect(cbgScore({ fasting: true, value: "string" })).toBe(0);
        expect(cbgScore({ fasting: false, value: "string" })).toBe(0);
      });
      test("case 3", () => {
        expect(cbgScore({ fasting: true, value: undefined })).toBe(0);
        expect(cbgScore({ fasting: false, value: undefined })).toBe(0);
      });
      test("case 4", () => {
        expect(cbgScore({ fasting: null, value: null })).toBe(0);
      });
      test("case 5", () => {
        expect(cbgScore({})).toBe(0);
      });
      test("case 6", () => {
        expect(cbgScore()).toBe(0);
      });
      test("case 7", () => {
        expect(cbgScore(null)).toBe(0);
      });
    });
  });
});
