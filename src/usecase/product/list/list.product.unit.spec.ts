import ProductFactory from "../../../domain/product/factory/product.factory";
import ListCustomerUseCase from "./list.product.usecase";

const MockProductRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
  };
};

describe("Unit test for listing price use case", () => {
  it("should list a customer", async () => {
    const product1 = ProductFactory.create("a", "Any 1", 999);
    const product2 = ProductFactory.create("a", "Any 2", 998);
    const repository = MockProductRepository();
    repository.findAll.mockReturnValue(Promise.resolve([product1, product2]));
    const useCase = new ListCustomerUseCase(repository);

    const output = await useCase.execute({});

    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toBe(product1.id);
    expect(output.products[0].name).toBe(product1.name);
    expect(output.products[0].price).toBe(product1.price);
    expect(output.products[1].id).toBe(product2.id);
    expect(output.products[1].name).toBe(product2.name);
    expect(output.products[1].price).toBe(product2.price);
  });
});
