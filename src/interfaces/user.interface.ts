export interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

export interface ILoginUser {
  email: string,
  password: string,
}

export interface IUpdateUser {
  id: string;
  name?: string;
  email?: string;
  password?: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  token?: string;
}


export interface IMethodsRepositoryUser {
  create(data: ICreateUser): Promise<IUser>; // POST /users
  login(data: ILoginUser): Promise<IUser>; // POST /users
  update(data: IUpdateUser): Promise<IUser>; // PUT /users/:id
  getById(id: string): Promise<IUser>; // GET /users/:id
  getAll(): Promise<IUser[]>; // GET /users
  delete(id: string): Promise<IUser>; // DELETE /users/:id
}

