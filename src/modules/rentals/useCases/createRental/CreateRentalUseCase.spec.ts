import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let dayjsDateProvider: DayjsDateProvider;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;

describe("Create Rental", () => {
  const oneDay = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    dayjsDateProvider = new DayjsDateProvider();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider
    );
  });

  it("should be able to create a new rental", async () => {
    const rental_test = {
      car_id: "car_id_test",
      user_id: "user_id_test",
      expected_return_date: oneDay,
    };

    const rental = await createRentalUseCase.execute(rental_test);

    expect(rental).toHaveProperty("id");
  });

  it("should not be able to create a new rental if the user already has a rental in progress", async () => {
    expect(async () => {
      const rental_test = {
        car_id: "car_id_test1",
        user_id: "user_id_test1",
        expected_return_date: oneDay,
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
        expected_return_date: oneDay,
      };
      const rental2_test = {
        car_id: "car_id_test2",
        user_id: "user_id_test222",
        expected_return_date: oneDay,
      };
      await createRentalUseCase.execute(rental_test);

      await createRentalUseCase.execute(rental2_test);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be possible to rent a car for less than 24 hours", async () => {
    expect(async () => {
      const insufficientTime = dayjs().add(23, "hours").toDate();
      const rental_test = {
        car_id: "car_id_test3",
        user_id: "user_id_test3",
        expected_return_date: insufficientTime,
      };

      await createRentalUseCase.execute(rental_test);
    }).rejects.toBeInstanceOf(AppError);
  });
});
