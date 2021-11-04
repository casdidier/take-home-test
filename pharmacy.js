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

  setHigherLimit(value, limit) {
    if (value > limit) {
      return limit;
    }
    return value;
  }

  setLowerLimit(value, limit) {
    if (value < limit) {
      return limit;
    }
    return value;
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
    newBenefit = super.setLowerLimit(newBenefit, 0);

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

    newBenefit = super.setHigherLimit(newBenefit, 50);
    // // cannot be negative
    this.benefit = newBenefit;
    this.expiresIn--;
  }
}

export class MetaDrug extends Drug {
  constructor(name, expiresIn, benefit) {
    super(name, expiresIn, benefit);
  }

  update() {
    return;
  }
}

export class SuperLimitedDrug extends SuperDrug {
  update() {
    let newBenefit = this.benefit;

    if (!super.isExpired()) {
      newBenefit = super.updateBenefit(newBenefit, 1);
    } else {
      newBenefit = super.updateBenefit(newBenefit, 2);
    }

    newBenefit = super.setHigherLimit(newBenefit, 50);
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
      switch (true) {
        case drug instanceof NormalDrug:
          drug.update();
          break;
        case drug instanceof SuperDrug:
          drug.update();
          break;
        case drug instanceof SuperLimitedDrug:
          drug.update();
          break;
        case drug instanceof MetaDrug:
          drug.update();
          break;
      }
    });

    return this.drugs;
  }
}
