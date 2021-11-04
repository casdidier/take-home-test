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
    if (!super.isExpired()) {
      this.benefit--;
    } else {
      this.benefit = this.benefit - 2;
    }
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
      } else {
        if (drug.benefit < 50) {
          drug.benefit = drug.benefit + 1;
          if (drug.name == "Fervex") {
            if (drug.expiresIn < 11) {
              if (drug.benefit < 50) {
                drug.benefit = drug.benefit + 1;
              }
            }
            if (drug.expiresIn < 6) {
              if (drug.benefit < 50) {
                drug.benefit = drug.benefit + 1;
              }
            }
          }
        }
      }
      // if (drug.expiresIn < 0) {
      //   if (drug.name != "Herbal Tea") {
      //     if (drug.name != "Fervex") {
      //       if (drug.benefit > 0) {
      //         if (drug.name != "Magic Pill") {
      //           drug.benefit = drug.benefit - 1;
      //         }
      //       }
      //     } else {
      //       drug.benefit = drug.benefit - drug.benefit;
      //     }
      //   } else {
      //     if (drug.benefit < 50) {
      //       drug.benefit = drug.benefit + 1;
      //     }
      //   }
      // }
    });

    return this.drugs;
  }
}
