import CreateProductUseCase from "./create.product.usecase";

const MockProductRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  it("should create a customer", async () => {
    const input = {
      name: "Any",
      price: 999,
    };

    const productRepository = MockProductRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    const output = await createProductUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should thrown an error when name is missing", async () => {
    const input = {
      name: "",
      price: 999,
    };

    const productRepository = MockProductRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    await expect(createProductUseCase.execute(input)).rejects.toThrow(
      "product: Name is required"
    );
  });

  it("should thrown an error when price is less than zero", async () => {
    const input = {
      name: "Any",
      price: -1,
    };

    const productRepository = MockProductRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    await expect(createProductUseCase.execute(input)).rejects.toThrow(
      "product: Price must be greater than zero"
    );
  });
});
