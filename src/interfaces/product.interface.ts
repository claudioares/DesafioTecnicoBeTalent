export interface ICreateProduct {
  name: string;
  price: number;
  stock: number;
}

export interface IUpdateProduct {
  id: string;
  name?: string;
  price?: number;
  stock?: number;
  isDeleted?: boolean;
}

export interface IProduct {
  id: string;
  name: string;
  price: number;
  stock: number;
  isDeleted: boolean;
  createdAt: Date;
}

export interface IMethodsRepositoryProduct {
  create(data: ICreateProduct): Promise<IProduct>; // POST /products
  update(data: IUpdateProduct): Promise<IProduct>; // PUT /products/:id
  getById(id: string): Promise<IProduct>; // GET /products/:id
  getAll(): Promise<IProduct[]>; // GET /products
  delete(id: string): Promise<IProduct>; // DELETE /products/:id
}