import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create car specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationRepositoryInMemory
    );
  });

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
      name: "Tesla model X",
      description:
        "For those who need performance and utility, with standard AWD, first-class storage.",
      daily_rate: 70,
      license_plate: "ASDF8080",
      fine_amount: 60,
      brand: "tesla",
      category_id: "eletric",
    });

    const specification_test1 = await specificationRepositoryInMemory.create({
      name: "autopilot",
      description:
        "Tesla Autopilot is a suite of advanced driver-assistance system",
    });

    const specification_test2 = await specificationRepositoryInMemory.create({
      name: "Speed assist",
      description:
        "You can choose if and how ysou are warned when you exceed the speed limit",
    });

    const specifications_id = [specification_test1.id, specification_test2.id];

    const specifications_cars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specifications_cars).toHaveProperty("specifications");
    expect(specifications_cars.specifications.length).toBe(2);
  });
});
