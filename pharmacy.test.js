import { Drug, NormalDrug, SuperDrug, Pharmacy, drugs } from "./pharmacy";

describe("Pharmacy", () => {
  let pharmacy;

  beforeEach(() => {
    pharmacy = new Pharmacy(drugs);
  });

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
      it.todo("should never go more than 50 for a benefit value");
    });

    describe("Drugs stay same as new over time", () => {
      it.todo(
        "should never expires nor decreases in Benefit (e.g:  Magic Pill)"
      );
    });

    describe("Drugs with higher efficiency as expiration date approaches (eg: Fervex", () => {
      it.todo("should increase in benefit as expiration dates approaches ");
      it.todo(
        "should increase in benefit by 2 as expiration dates approaches within 10 days or less"
      );
      it.todo(
        "should increase in benefit by 3as expiration dates approaches within 5 days or less"
      );
      it.todo("should nullify in benefit as expiration dates reached");
    });

    describe("Drugs with higher efficiency downgrades", () => {
      it.todo(
        "should degrades in benefit twice as fast as normal drugs for Dafalgan"
      );
    });
  });
});
