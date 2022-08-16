import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create car specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory
    );
  });

  // fix promisse error

  it("should not be able to add a new specification to a non-existent car", async () => {
    const car_id = "2222";
    const specifications_id = ["3333"];

    await expect(
      createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to add a new specification to a car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "fusca",
      description: "fusca do didi",
      daily_rate: 70,
      license_plate: "ASDF8080",
      fine_amount: 60,
      brand: "volkswagen",
      category_id: "category",
    });

    const specifications_id = ["3333"];

    createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });
  });
});
