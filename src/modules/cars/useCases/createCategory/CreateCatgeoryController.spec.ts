import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("Create category controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidv4();
    const password = await hash("asdfjkl", 8);

    await connection.query(
      `INSERT INTO USERS(
      id,
      name,
      email,
      password,
      driver_license,
      "isAdmin",
      created_at
    ) values (
      '${id}',
      'admin_test',
      'admin@rentx.test.com.br',
      '${password}',
      'elliot',
      true,
      'now()'
      )`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a new category", async () => {
    const responseToken = await request(app)
      .post("/sessions")
      .send({ email: "admin@rentx.test.com.br", password: "asdfjkl" });

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Superteste categoy name",
        description: "description for test",
      })
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(201);
  });
});
