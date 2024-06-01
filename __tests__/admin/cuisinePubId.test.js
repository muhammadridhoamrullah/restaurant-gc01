const request = require("supertest");
const app = require("../../app");
const { sequelize } = require("../../models/index");
const { User, Cuisine, Category } = require("../../models/index");
const { signToken } = require("../../helper/jwt");

let accessTokenAdmin;
let accessTokenStaff;
let accessTokenStaff2;
let categoryId;
let userId;
let cuisineId;

beforeAll(async () => {
  const seedAdmin = {
    username: "admin",
    email: "admin@mail.com",
    password: "1234567890",
    role: "Admin",
    phoneNumber: "085363508580",
    address: "Jalan Pemuda",
  };

  const seedCategory = {
    name: "Goreng",
  };

  const seedCuisine = {
    name: "Ikan Salai 1",
    description: "Ikan salai yang di asapi",
    price: 20000,
    imgUrl:
      "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/07/31040437/ini-resep-bumbu-rendang-daging-sapi-untuk-acara-spesial.jpg",
    categoryId: 1,
    authorId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await Category.create(seedCategory);
  //   await sequelize.queryInterface.bulkInsert("Categories", seedCategory);

  await User.create(seedAdmin);

  await Cuisine.create(seedCuisine);
  //   await sequelize.queryInterface.bulkInsert("Cuisines", seedCuisine);
  //   await Cuisine.bulkCreate(seedCuisine);
});

// afterAll(async () => {
//     await sequelize.queryInterface.bulkDelete("Cuisines", null, {
//       truncate: true,
//       restartIdentity: true,
//       cascade: true,
//     });

//     await sequelize.queryInterface.bulkDelete("Users", null, {
//       truncate: true,
//       restartIdentity: true,
//       cascade: true,
//     });

//     await sequelize.queryInterface.bulkDelete("Categories", null, {
//       truncate: true,
//       restartIdentity: true,
//       cascade: true,
//     });
//   });

describe("GET /cuisines/pub", () => {
  test("Berhasil mendapatkan entitas utama tanpa menggunakan query filter parameter", async () => {
    // const params = 1
    const response = await request(app).get(`/cuisines/pub`);

    console.log(response.body, "<<< HAI");
    expect(response.status).toBe(200);
  });
});
