import { AppError } from "@errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/implementations/UsersRepositoryInMemory";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      name: "john Tester",
      email: "john.t3st3r@email.com",
      password: "123#tst$**",
      driver_license: "TESTE_SP1234123",
    };

    await createUserUseCase.execute(user);

    const catched_response = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(catched_response).toHaveProperty("token");
  });

  it("should not be able to authenticate a non existent user", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "fakeuser@gmail.com",
        password: "12344321",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("shoul not be able to authenticate a user if passowrd is incorrect", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: "Mary Tester",
        email: "Mary.t3st3r@email.com",
        password: "123#tst$**",
        driver_license: "TESTE_SP4321321 ",
      };

      await createUserUseCase.execute(user);

      const catched_response = await authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrect_password",
      });

      return catched_response;
    }).rejects.toBeInstanceOf(AppError);
  });
});
