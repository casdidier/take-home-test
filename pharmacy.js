export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }

  isExpired() {
    return this.expiresIn <= 0;
  }

  updateBenefit(benefit, amount) {
    return benefit + amount;
  }
}

export class NormalDrug extends Drug {
  constructor(name, expiresIn, benefit) {
    super(name, expiresIn, benefit);
  }

  update() {
    let newBenefit = this.benefit;

    if (!super.isExpired()) {
      newBenefit = super.updateBenefit(newBenefit, -1);
    } else {
      newBenefit = super.updateBenefit(newBenefit, -2);
    }
    // cannot be negative
    if (newBenefit < 0) {
      newBenefit = 0;
    }
    this.benefit = newBenefit;
    this.expiresIn--;
  }
}

export class SuperDrug extends Drug {
  constructor(name, expiresIn, benefit) {
    super(name, expiresIn, benefit);
  }

  update() {
    let newBenefit = this.benefit;

    if (!super.isExpired()) {
      newBenefit = super.updateBenefit(newBenefit, -1);
    } else {
      newBenefit = super.updateBenefit(newBenefit, 2);
    }

    if (newBenefit > 50) {
      newBenefit = 50;
    }
    // // cannot be negative
    this.benefit = newBenefit;
    this.expiresIn--;
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }
  updateBenefitValue() {
    this.drugs.forEach((drug) => {
      if (drug instanceof NormalDrug) {
        drug.update();
      }
      if (drug instanceof SuperDrug) {
        drug.update();
      }
    });

    return this.drugs;
  }
}
