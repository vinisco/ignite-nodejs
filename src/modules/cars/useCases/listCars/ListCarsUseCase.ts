import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

class ListCarsUseCase {
  constructor(private carsRepository: CarsRepositoryInMemory) {
    /*  */
  }

  async execute(): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable();

    return cars;
  }
}
export { ListCarsUseCase };
