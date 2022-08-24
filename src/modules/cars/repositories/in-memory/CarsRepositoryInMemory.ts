import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];
  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      id,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findByID(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }

  async findAvailable(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]> {
    const cars = this.cars.filter((car) => {
      if (!category_id && !brand && !name && car.available) {
        return car;
      }

      if (car.category_id === category_id && car.available) {
        return car;
      }

      if (car.brand === brand && car.available) {
        return car;
      }

      if (car.name === name && car.available) {
        return car;
      }

      return null;
    });

    return cars;
  }
}

export { CarsRepositoryInMemory };
