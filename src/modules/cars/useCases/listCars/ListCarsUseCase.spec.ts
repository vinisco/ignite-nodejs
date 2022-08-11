import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able list all availabes cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "gol",
      description: "só gol de placa",
      daily_rate: 90,
      license_plate: "WTF-3301",
      fine_amount: 80,
      brand: "volkswagen",
      category_id: "b3b5b870-37e1-4c57-8bb9-729de60ddc50",
    });

    const cars = await listCarsUseCase.execute();

    expect(cars).toEqual([car]);
  });
});
