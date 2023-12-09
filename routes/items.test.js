process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");

let items = require("../shoppingList_Db")
let item = { name: "food", price: 50 }

beforeEach(async () => {
  items.push(item)
});

afterEach(async () => {
  items = []
});


// Get items and expect a return

describe("GET /items", async function () {
  test("Gets a list of items", async function () {
    const response = await request(app).get(`/items`);
    const { items } = response.body;
    expect(response.statusCode).toBe(200);
    expect(items).toHaveLength(1);
  });
});

// Get item's name and expect a return

describe("GET /items/:name", async function () {
  test("Gets a single item", async function () {
    const response = await request(app).get(`/items/${item.name}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.item).toEqual(item);
  });

  test("Responds with 404 if can't find item", async function () {
    const response = await request(app).get(`/items/0`);
    expect(response.statusCode).toBe(404);
  });
});

// Post items and expect to add a new item to shopping list

describe("POST /items", async function () {
  test("Creates a new item", async function () {
    const response = await request(app)
      .post(`/items`)
      .send({
        name: "Drink",
        price: 10
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.item).toHaveProperty("name");
    expect(response.body.item).toHaveProperty("price");
    expect(response.body.item.name).toEqual("Drink");
    expect(response.body.item.price).toEqual(10);
  });
});

//  Update the item's name

describe("PATCH /items/:name", async function () {
  test("Updates a single item", async function () {
    const response = await request(app)
      .patch(`/items/${item.name}`)
      .send({
        name: "Snack"
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.item).toEqual({
      name: "Snack"
    });
  });

  test("Responds with 404 if can't find item", async function () {
    const response = await request(app).patch(`/items/0`);
    expect(response.statusCode).toBe(404);
  });
});

// Delete items by name

describe("DELETE /items/:name", async function () {
  test("Deletes an item", async function () {
    const response = await request(app)
      .delete(`/items/${item.name}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Deleted" });
  });
});

