export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }

  isExpired() {
    return this.expiresIn <= 0;
  }
}

export class NormalDrug extends Drug {
  constructor(name, expiresIn, benefit) {
    super(name, expiresIn, benefit);
  }

  update() {
    let newBenefit = this.benefit;

    if (!super.isExpired()) {
      newBenefit--;
    } else {
      newBenefit = newBenefit - 2;
    }
    // cannot be negative
    if (newBenefit < 0) {
      newBenefit = 0;
    }
    this.benefit = newBenefit;
    this.expiresIn--;
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }
  updateBenefitValue() {
    console.log("called here");

    this.drugs.forEach((drug) => {
      if (drug instanceof NormalDrug) {
        console.log("updating");
        drug.update();
      }
    });

    return this.drugs;
  }
}
