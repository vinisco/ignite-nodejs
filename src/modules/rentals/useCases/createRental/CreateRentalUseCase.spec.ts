import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it("should be able to create a new rental", async () => {
    const rental_test = {
      car_id: "car_id_test",
      user_id: "user_id_test",
      expected_return_date: new Date(),
    };

    const rental = await createRentalUseCase.execute(rental_test);

    console.log(rental);

    expect(rental).toHaveProperty("id");
  });

  it("should not be able to create a new rental if the user already has a rental in progress", async () => {
    expect(async () => {
      const rental_test = {
        car_id: "car_id_test1",
        user_id: "user_id_test1",
        expected_return_date: new Date(),
      };

      await createRentalUseCase.execute(rental_test);

      await createRentalUseCase.execute(rental_test);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if the car is already rented", async () => {
    expect(async () => {
      const rental_test = {
        car_id: "car_id_test2",
        user_id: "user_id_test2",
        expected_return_date: new Date(),
      };
      const rental2_test = {
        car_id: "car_id_test2",
        user_id: "user_id_test222",
        expected_return_date: new Date(),
      };
      await createRentalUseCase.execute(rental_test);

      await createRentalUseCase.execute(rental2_test);
    }).rejects.toBeInstanceOf(AppError);
  });
});
