import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "fusca",
      description: "fusca do didi",
      daily_rate: 70,
      license_plate: "ASDF8080",
      fine_amount: 60,
      brand: "volkswagen",
      category_id: "category",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a new car with an existing license plate ", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "fusca",
        description: "fusca do didi",
        daily_rate: 70,
        license_plate: "ASDF8080",
        fine_amount: 60,
        brand: "volkswagen",
        category_id: "category",
      });

      await createCarUseCase.execute({
        name: "Astra",
        description: "Nave do azaghal",
        daily_rate: 70,
        license_plate: "ASDF8080",
        fine_amount: 60,
        brand: "chevrolet",
        category_id: "category",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a car with availability setted true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Astra",
      description: "Nave do azaghal",
      daily_rate: 70,
      license_plate: "ASDF9090",
      fine_amount: 60,
      brand: "chevrolet",
      category_id: "category",
    });

    expect(car.available).toBe(true);
  });
});
