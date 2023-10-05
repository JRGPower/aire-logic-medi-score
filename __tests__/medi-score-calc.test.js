const {
  calculateMediScore,
  calculateMediScoreAvg,
} = require("../utils/medi-score-calc.js");

describe("calculateMediScore function", () => {
  describe("test example cases from instructions", () => {
    test("Example 1", () => {
      const observation = {
        oxygen: false,
        cvpu: false,
        respirationRate: 15,
        spO2: 95,
        temperature: 37.1,
      };
      expect(calculateMediScore(observation)).toBe(0);
    });

    test("Example 2", () => {
      const observation = {
        oxygen: true,
        cvpu: false,
        respirationRate: 17,
        spO2: 95,
        temperature: 37.1,
      };
      expect(calculateMediScore(observation)).toBe(4);
    });
    test("Example 3", () => {
      const observation = {
        oxygen: 2,
        cvpu: 1,
        respirationRate: 23,
        spO2: 88,
        temperature: 38.5,
      };
      expect(calculateMediScore(observation)).toBe(8);
    });
  });
  describe("additional test cases", () => {
    test("should score 8", () => {
      const observation = {
        oxygen: "true",
        cvpu: "true",
        respirationRate: "4",
        spo2: "",
        temperature: "",
        cbg: { value: "" },
      };

      expect(calculateMediScore(observation)).toBe(8);
    });
    test("should score 5", () => {
      const observation = {
        oxygen: "true",
        cvpu: "true",
        respirationRate: "",
        spo2: "",
        temperature: "",
        cbg: { value: "" },
      };

      expect(calculateMediScore(observation)).toBe(5);
    });
  });
  describe("test cases where data is missing or partial", () => {
    test("No properties passed on object", () => {
      const observation = {};
      expect(calculateMediScore(observation)).toBe(0);
    });
    test("One valid property passed on object", () => {
      const observation = { cvpu: true };
      expect(calculateMediScore(observation)).toBe(3);
    });
    test("One valid property with additional invalid", () => {
      const observation = {
        cvpu: true,
        respirationRate: "string",
        NotaProp: "true",
        oxygen: 0,
      };
      expect(calculateMediScore(observation)).toBe(3);
    });
    test("No argument", () => {
      expect(calculateMediScore()).toBe(0);
    });
  });
});

describe("calculateMediScore && calculateMediScoreAvg function", () => {
  describe("Test cases where data has all expected properties", () => {
    it("should return 0 for cases where each inputs score is 0", () => {
      const data = [
        {
          patientId: "001",
          observation: {
            oxygen: false,
            cvpu: false,
            respirationRate: 14,
            spO2: 98,
            temperature: 36.4,
            cbg: {
              value: 0,
              fasting: false,
            },
            time: "2023-10-03T22:20:31.341Z",
            comments: "",
          },
        },
        {
          patientId: "001",
          observation: {
            oxygen: false,
            cvpu: false,
            respirationRate: 18,
            spO2: 96,
            temperature: 36.7,
            cbg: {
              value: 0,
              fasting: false,
            },
            time: "2023-10-03T20:00:39.898Z",
            comments: "",
          },
        },
        {
          patientId: "001",
          observation: {
            oxygen: false,
            cvpu: false,
            respirationRate: 17,
            spO2: 99,
            temperature: 36.6,
            cbg: {
              value: 0,
              fasting: false,
            },
            time: "2023-10-03T18:01:56.707Z",
            comments: "",
          },
        },
      ];
      data.forEach((obs) => {
        const result = calculateMediScore(obs);
        expect(result).toBe(0);
      });

      expect(calculateMediScoreAvg(data)).toBe(0);
    });
  });
  describe("test cases where data is missing or partial", () => {
    //TODO maybe function should throw an error in some cases of bad data?
    test("empty array should return 0", () => {
      expect(calculateMediScoreAvg([])).toBe(0);
    });
    test("No argument should return 0", () => {
      expect(calculateMediScoreAvg()).toBe(0);
    });
    test("one object with one property should return correct score", () => {
      const data = [{ observation: { respirationRate: 4 } }];
      const expectedScores = [3];
      const expectedAvg = 3;

      data.forEach((record, index) => {
        const result = calculateMediScore(record.observation);
        expect(result).toBe(expectedScores[index]);
      });

      expect(calculateMediScoreAvg(data)).toBe(expectedAvg);
    });
    test("two object with one property should return correct average score", () => {
      const data = [
        { observation: { respirationRate: 4 } },
        { observation: { spO2: 97 } },
      ];
      const expectedScores = [3, 0];
      const expectedAvg = 1.5;
      data.forEach((record, index) => {
        const result = calculateMediScore(record.observation);
        expect(result).toBe(expectedScores[index]);
      });

      expect(calculateMediScoreAvg(data)).toBe(expectedAvg);
    });
    test("complex example", () => {
      const data = [
        { observation: { respirationRate: 4 } },
        { observation: { spO2: 97 } },
        {
          patientId: "001",
          observation: {
            oxygen: false,
            cvpu: false,
            respirationRate: 18,
            spO2: 96,
            temperature: 36.7,
            cbg: {
              value: 0,
              fasting: false,
            },
            time: "2023-10-03T20:00:39.898Z",
            comments: "",
          },
        },
        {
          observation: {
            spO2: 97,
            oxygen: true,
            cvpu: true,
            respirationRate: 18,
            spO2: 96,
            temperature: 36.7,
          },
        },
      ];
      const expectedScores = [3, 0, 0, 7];
      const expectedAvg = 2.5;
      data.forEach((record, index) => {
        const result = calculateMediScore(record.observation);
        expect(result).toBe(expectedScores[index]);
      });

      expect(calculateMediScoreAvg(data)).toBe(expectedAvg);
    });
  });
});
