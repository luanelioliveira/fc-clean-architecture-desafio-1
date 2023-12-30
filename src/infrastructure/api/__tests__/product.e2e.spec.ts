import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/products").send({
      name: "Any",
      price: 999,
    });

    expect(response.status).toBe(200);
    expect(response.body.id).not.toBeNull();
    expect(response.body.name).toBe("Any");
    expect(response.body.price).toBe(999);
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/products").send({
      name: "",
    });
    expect(response.status).toBe(500);
  });

  it("should list all products", async () => {
    const response = await request(app).post("/products").send({
      name: "Any 1",
      price: 999,
    });
    expect(response.status).toBe(200);

    const response2 = await request(app).post("/products").send({
      name: "Any 2",
      price: 998,
    });
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/products").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    const product1 = listResponse.body.products[0];
    expect(product1.name).toBe("Any 1");
    expect(product1.price).toBe(999);
    const product2 = listResponse.body.products[1];
    expect(product2.name).toBe("Any 2");
    expect(product2.price).toBe(998);

    const listResponseXML = await request(app)
      .get("/products")
      .set("Accept", "application/xml")
      .send();

    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain(
      `<?xml version="1.0" encoding="UTF-8"?>`
    );
    expect(listResponseXML.text).toContain(`<products>`);
    expect(listResponseXML.text).toContain(`<product>`);
    expect(listResponseXML.text).toContain(`<name>Any 1</name>`);
    expect(listResponseXML.text).toContain(`<price>999</price>`);
    expect(listResponseXML.text).toContain(`</product>`);
    expect(listResponseXML.text).toContain(`<product>`);
    expect(listResponseXML.text).toContain(`<name>Any 2</name>`);
    expect(listResponseXML.text).toContain(`<price>998</price>`);
    expect(listResponseXML.text).toContain(`</product>`);
    expect(listResponseXML.text).toContain(`</products>`);
  });
});
