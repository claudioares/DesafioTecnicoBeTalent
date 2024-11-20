export interface ICreateSale {
  customerId: string;
  productId: string;
  quantity: number;
  price: number;
}

export interface ISale {
  id: string;
  customerId: string;
  productId: string;
  quantity: number;
  price: number;
  createdAt: Date;
}

export interface IMethodsRepositorySale {
  create(data: ICreateSale): Promise<ISale>; // POST /sales
  getById(id: string): Promise<ISale>; // GET /sales/:id
  getAll(): Promise<ISale[]>; // GET /sales
}