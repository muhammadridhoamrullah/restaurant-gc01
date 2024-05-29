const request = require("supertest");
const app = require("../../app");
const { sequelize } = require("../../models/index");
const { User } = require("../../models/index");
const { signToken } = require("../../helper/jwt");

let accessTokenAdmin;
let accessTokenUser;

beforeAll(async () => {
  const seedAdmin = {
    username: "admin",
    email: "admin@mail.com",
    password: "1234567890",
    role: "Admin",
    phoneNumber: "085363508580",
    address: "Jalan Pemuda",
  };

  //   const seedUser = {
  //     username: "ridhoamrullah",
  //     email: "ridhoamrullah99@gmail.com",
  //     password: "1234567890",
  //     role: "Admin",
  //     phoneNumber: "085363508580",
  //     address: "Jalan Pemuda",
  //   };

  const newAdmin = await User.create(seedAdmin);
  accessTokenAdmin = signToken({ id: newAdmin.id });
  console.log(accessTokenAdmin);

  //   const newUser = await User.create(seedUser);
  //   accessTokenUser = signToken({ id: newUser.id });
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});

describe("POST /add-user", () => {
  //SUCCESS
  test("Berhasil menambahkan user", async () => {
    const body = {
      username: "ridhoamrullah",
      email: "ridhoamrullah99@gmail.com",
      password: "1234567890",
      role: "Staff",
      phoneNumber: "085363508580",
      address: "Jalan Pemuda",
    };

    const response = await request(app)
      .post("/add-user")
      .send(body)
      .set("authorization", `Bearer ${accessTokenAdmin}`);

    // console.log(response.body, "<<< bodyyyy add user");
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("username", body.username);
    expect(response.body).toHaveProperty("email", body.email);
    expect(response.body).toHaveProperty("role", body.role);
    expect(response.body).toHaveProperty("phoneNumber", body.phoneNumber);
    expect(response.body).toHaveProperty("address", body.address);
    expect(response.body).toHaveProperty("createdAt", response.body.createdAt);
    expect(response.body).toHaveProperty("updatedAt", response.body.updatedAt);
  });

  //FAILED
  test("Email tidak diberikan / tidak diinput", async () => {
    const body = {
      username: "ridhoamrullah",
      password: "1234567890",
      role: "Staff",
      phoneNumber: "085363508580",
      address: "Jalan Pemuda",
    };

    const response = await request(app)
      .post("/add-user")
      .send(body)
      .set("authorization", `Bearer ${accessTokenAdmin}`);

    // console.log(response.body, "<<< HAI");
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("errors", ["Email harus diisi!"]);
  });

  test("Password tidak diberikan / tidak diinput", async () => {
    const body = {
      username: "ridhoamrullah",
      email: "ridhoamrullah99@gmail.com",
      role: "Staff",
      phoneNumber: "085363508580",
      address: "Jalan Pemuda",
    };

    const response = await request(app)
      .post("/add-user")
      .send(body)
      .set("authorization", `Bearer ${accessTokenAdmin}`);

    // console.log(response.body, "<< ini erorr");
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("errors", ["Password harus diisi!"]);
  });
});
