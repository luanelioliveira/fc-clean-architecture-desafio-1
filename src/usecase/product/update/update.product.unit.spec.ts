import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const MockProductRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test for product update use case", () => {
  it("should update a product", async () => {
    const product = ProductFactory.create("a", "Any", 999);
    const productRepository = MockProductRepository();
    productRepository.find.mockReturnValue(Promise.resolve(product));
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);
    const input = {
      id: product.id,
      name: "Any Updated",
      price: 998,
    };

    const output = await productUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
