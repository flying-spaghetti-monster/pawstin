export type Role = "USER" | "ADMIN";

export type UserLogin = {
  email: string;
  password: string;
};

export type UserLoginRegistration = UserLogin & {
  first_name: string,
  last_name: string,
  role: Role
};

export type UserAddressResponse = UserLoginRegistration & {
  address: string,
  city: string,
  region: string,
  postal_code: string,
  country: string,
  phone: string,
  isActive: true,
};

export type LoginResponse = {
  access_token: string;
};

export type PageDirection = "next" | "previous";

export type CategoryResponse = {
  id: number;
  category_name: string;
  slug: string;
  description: string;
  picture?: string;
  isActive: boolean;
};

export type Actions = "CREATE" | "EDIT" | "DELETE";

