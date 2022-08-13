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
      category_id: "id_test",
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able list all availabes cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "saveiro",
      description: "vruum vruuuummmm",
      daily_rate: 90,
      license_plate: "WTF-3901",
      fine_amount: 80,
      brand: "volkswagen",
      category_id: "id_test",
    });

    const cars = await listCarsUseCase.execute({ name: "saveiro" });

    expect(cars).toEqual([car]);
  });

  it("should be able list all availabes cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Uno",
      description: "2, 3..",
      daily_rate: 90,
      license_plate: "WTF-1231",
      fine_amount: 80,
      brand: "fiat",
      category_id: "id_test",
    });

    const cars = await listCarsUseCase.execute({ brand: "fiat" });

    expect(cars).toEqual([car]);
  });

  it("should be able list all availabes cars by category_id", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Uno",
      description: "2, 3..",
      daily_rate: 90,
      license_plate: "WTF-1231",
      fine_amount: 80,
      brand: "fiat",
      category_id: "test_by_id",
    });

    const cars = await listCarsUseCase.execute({ category_id: "test_by_id" });

    expect(cars).toEqual([car]);
  });
});
