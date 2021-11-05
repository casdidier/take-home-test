import {
  MetaDrug,
  NormalDrug,
  SuperDrug,
  SuperLimitedDrug,
  Pharmacy,
  LesserNormalDrug,
} from "./pharmacy";

describe("Pharmacy", () => {
  describe("Normal drugs", () => {
    it("should decrease the benefit and expiresIn", () => {
      expect(
        new Pharmacy([new NormalDrug("test", 2, 3)]).updateBenefitValue()
      ).toEqual([new NormalDrug("test", 1, 2)]);
    });

    it("should all have an expiresIn date", () => {
      expect(new NormalDrug("test", 2, 3)).toHaveProperty("expiresIn");
    });

    it("should all have a benefit value", () => {
      expect(new NormalDrug("test", 2, 3)).toHaveProperty("benefit");
    });

    it("should decrease the benefit twice as fast when expiration date is passed", () => {
      expect(
        new Pharmacy([new NormalDrug("test", 0, 10)]).updateBenefitValue()
      ).toEqual([new NormalDrug("test", -1, 8)]);
    });
    it("should never have a negative benefit value", () => {
      expect(
        new Pharmacy([
          new NormalDrug("NotNegativeDrug", 0, 0),
        ]).updateBenefitValue()
      ).toEqual([new NormalDrug("NotNegativeDrug", -1, 0)]);
    });
  });

  describe("Special drugs", () => {
    describe("Drug which can only get better after expiration date", () => {
      it("should increase benefit twice as fast it gets older after expiration date", () => {
        expect(
          new Pharmacy([new SuperDrug("Fervex", 0, 10)]).updateBenefitValue()
        ).toEqual([new SuperDrug("Fervex", -1, 12)]);
      });
      it("should never go more than 50 for a benefit value", () => {
        expect(
          new Pharmacy([
            new SuperDrug("Herbal Tea", 0, 49),
          ]).updateBenefitValue()
        ).toEqual([new SuperDrug("Herbal Tea", -1, 50)]);
      });
    });

    describe("Drugs stay same as new over time", () => {
      it("should never expires nor decreases in benefit (e.g:  Magic Pill)", () => {
        expect(
          new Pharmacy([
            new MetaDrug("Magic Pill", 20, 20),
          ]).updateBenefitValue()
        ).toEqual([new MetaDrug("Magic Pill", 20, 20)]);
      });
    });

    describe("Drugs with higher efficiency as expiration date approaches (eg: Fervex", () => {
      it("should increase in benefit as expiration dates approaches ", () => {
        expect(
          new Pharmacy([
            new SuperLimitedDrug("Fervex", 21, 10),
          ]).updateBenefitValue()
        ).toEqual([new SuperLimitedDrug("Fervex", 20, 11)]);
      });
      it("should increase in benefit by 2 as expiration dates approaches within 10 days or less", () => {
        expect(
          new Pharmacy([
            new SuperLimitedDrug("Fervex", 10, 10),
          ]).updateBenefitValue()
        ).toEqual([new SuperLimitedDrug("Fervex", 9, 12)]);
      });
      it("should increase in benefit by 3 as expiration dates approaches within 5 days or less", () => {
        expect(
          new Pharmacy([
            new SuperLimitedDrug("Fervex", 5, 13),
          ]).updateBenefitValue()
        ).toEqual([new SuperLimitedDrug("Fervex", 4, 16)]);
      });
      it("should nullify in benefit as expiration dates reached", () => {
        expect(
          new Pharmacy([
            new SuperLimitedDrug("Fervex", 0, 15),
          ]).updateBenefitValue()
        ).toEqual([new SuperLimitedDrug("Fervex", -1, 0)]);
      });
    });

    describe("Normal Drugs that downgrades faster", () => {
      it("should degrades in benefit twice as fast as normal drugs for Dafalgan", () => {
        expect(
          new Pharmacy([
            new LesserNormalDrug("Dafalgan", 10, 10),
          ]).updateBenefitValue()
        ).toEqual([new LesserNormalDrug("Dafalgan", 9, 8)]);
      });
    });
  });
});
