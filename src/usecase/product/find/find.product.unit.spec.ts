import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const MockProductRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test find product use case", () => {
  it("should find a product", async () => {
    const product = new Product("123", "Computer", 999);
    const productRepository = MockProductRepository();
    productRepository.find.mockReturnValue(Promise.resolve(product));
    const usecase = new FindProductUseCase(productRepository);

    const input = {
      id: "123",
    };

    const output = {
      id: "123",
      name: "Computer",
      price: 999
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it("should not find a product", async () => {
    const productRepository = MockProductRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("product not found");
    });
    const usecase = new FindProductUseCase(productRepository);

    const input = {
      id: "123",
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("product not found");
  });
});
