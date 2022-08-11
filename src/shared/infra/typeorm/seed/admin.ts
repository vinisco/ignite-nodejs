import { hash } from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const id = uuidv4();
  const password = await hash("qwerty", 8);

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
      'admin',
      'admin@rentx.com.br',
      '${password}',
      'MRR0B0T',
      true,
      'now()'
      )`
  );

  await connection.close;
}

create().then(() => console.log("admin created"));
