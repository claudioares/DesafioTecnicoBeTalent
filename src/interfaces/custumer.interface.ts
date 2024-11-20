// Interfaces e métodos para Customer
export interface ICreateCustomer {
  name: string;
  email: string;
  phone?: string | null;
  userId: string;
}

export interface IUpdateCustomer {
  id: string;
  name?: string;
  email?: string;
  phone: string | null;
}

export interface ICustomer {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  userId: string;
  createdAt: Date;
}

export interface IMethodsRepositoryCustomer {
  create(data: ICreateCustomer): Promise<ICreateCustomer>; // POST /customers
  update(data: IUpdateCustomer): Promise<ICustomer>; // PUT /customers/:id
  getById(id: string): Promise<ICustomer>; // GET /customers/:id
  getAll(): Promise<ICustomer[]>; // GET /customers
  delete(id: string): Promise<ICustomer>; // DELETE /customers/:id
}

