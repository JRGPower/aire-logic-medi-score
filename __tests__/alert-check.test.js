const { mediScoreAlertCheck } = require("../utils/alert-check.js");

describe("mediScoreAlertCheck", () => {
  describe("correct behaviour with expected inputs: object with both required properties", () => {
    describe("mediScoreAvg", () => {
      it('avgAlertClass should be "alert-red" when mediscoreAvg >=8', () => {
        let results = [
          mediScoreAlertCheck({ mediScore: 0, mediScoreAvg: 15 }),
          mediScoreAlertCheck({ mediScore: 0, mediScoreAvg: 8 }),
        ];

        expect(results[0].avgAlertClass).toBe("alert-red");
        expect(results[1].avgAlertClass).toBe("alert-red");
      });
      it('avgAlertClass should be "alert-amber" when mediscoreAvg >=4', () => {
        let results = [
          mediScoreAlertCheck({ mediScore: 0, mediScoreAvg: 7 }),
          mediScoreAlertCheck({ mediScore: 0, mediScoreAvg: 4 }),
        ];

        expect(results[0].avgAlertClass).toBe("alert-amber");
        expect(results[1].avgAlertClass).toBe("alert-amber");
      });
      it('avgAlertClass should be "alert-yellow" when mediscoreAvg >=2', () => {
        let results = [
          mediScoreAlertCheck({ mediScore: 0, mediScoreAvg: 3 }),
          mediScoreAlertCheck({ mediScore: 0, mediScoreAvg: 2 }),
        ];

        expect(results[0].avgAlertClass).toBe("alert-yellow");
        expect(results[1].avgAlertClass).toBe("alert-yellow");
      });

      it('avgAlertClass should be "alert-green" when mediscoreAvg =0', () => {
        let result = mediScoreAlertCheck({ mediScore: 0, mediScoreAvg: 0 });
        expect(result.avgAlertClass).toBe("alert-green");
      });
    });
    describe("mediScoreAvg & mediscore comparisons", () => {
      it('scoreAlertClass should be "alert-red" for when mediScore is 3 greater than mediScoreAvg', () => {
        const result = mediScoreAlertCheck({ mediScore: 5, mediScoreAvg: 2 });
        expect(result.scoreAlertClass).toBe("alert-red");
      });

      it('scoreAlertClass be "alert-amber" when mediScore is 2 greater than mediScoreAvg', () => {
        const result = mediScoreAlertCheck({ mediScore: 4, mediScoreAvg: 2 });
        expect(result.scoreAlertClass).toBe("alert-amber");
      });

      it('scoreAlertClass be "alert-yellow" when mediScore is 1 greater than mediScoreAvg', () => {
        const result = mediScoreAlertCheck({ mediScore: 3, mediScoreAvg: 2 });
        expect(result.scoreAlertClass).toBe("alert-yellow");
      });
      it('scoreAlertClass be "alert-green" when mediScore is 2 less than mediScoreAvg', () => {
        const result = mediScoreAlertCheck({ mediScore: 2, mediScoreAvg: 5 });
        expect(result.scoreAlertClass).toBe("alert-green");
      });

      it('should return "alert-none" for scoreAlertClass when mediScore is equal to mediScoreAvg', () => {
        const result = mediScoreAlertCheck({ mediScore: 2, mediScoreAvg: 2 });
        expect(result.scoreAlertClass).toBe("alert-none");
      });
    });
  });
  describe("invalid inputs", () => {
    describe('should return "alert-none" as appropriate for invalid inputs', () => {
      test("no parameters on input object", () => {
        const result = mediScoreAlertCheck({});
        expect(result.scoreAlertClass).toBe("alert-none");
        expect(result.avgAlertClass).toBe("alert-none");
      });
      test("missing mediScore parameter on input object", () => {
        const result = mediScoreAlertCheck({ mediScoreAvg: 2 });
        expect(result.scoreAlertClass).toBe("alert-none");
        expect(result.avgAlertClass).toBe("alert-yellow");
      });
      test("missing mediScoreAvg parameter on input object", () => {
        const result = mediScoreAlertCheck({ mediScore: 2 });
        expect(result.scoreAlertClass).toBe("alert-none");
        expect(result.avgAlertClass).toBe("alert-none");
      });
    });
  });
});
