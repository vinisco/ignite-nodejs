import { getRepository, Repository } from "typeorm";

import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepositoy";

import { CarImage } from "../entities/CarImage";

class CarsImagesRepository implements ICarsImagesRepository {
  private repositoy: Repository<CarImage>;

  constructor() {
    this.repositoy = getRepository(CarImage);
  }
  async create(car_id: string, image_name: string): Promise<CarImage> {
    const carImage = this.repositoy.create({
      car_id,
      image_name,
    });

    await this.repositoy.save(carImage);

    return carImage;
  }
}

export { CarsImagesRepository };
