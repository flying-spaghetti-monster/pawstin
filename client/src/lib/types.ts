import cartStorage from '../helper/cartHelper';

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
  id?: number;
  category_name: string;
  slug: string;
  description?: string;
  picture?: string;
  isActive?: boolean;
};

export type ShipperResponse = {
  id: number;
  company_name: string;
  phone: string;
  isActive: boolean;
}

export type ProductResponse = {
  id: number;
  product_name: string;
  description: string;
  slug: string;
  price: number;
  discont_price: number;
  in_stock: number;
  isActive: boolean;
  category_slug: string;
}

// CREATED	Замовлення створене, але ще не оброблено
// PENDING	Очікує підтвердження або оплати
// CONFIRMED	Підтверджено (клієнтом або системою)
// PROCESSING	У процесі обробки
// INPROGRESS	Виконується
// SHIPPED	Відправлено
// DELIVERED	Доставлено
// CANCELLED	Скасовано користувачем або системою
// RETURNED	Товар повернуто
// FAILED	Помилка виконання (наприклад, оплати)
// REFUNDED	Гроші повернено
// ONHOLD	Призупинено з певної причини

enum Status {
  CREATED,
  PENDING,
  CONFIRMED,
  PROCESSING,
  INPROGRESS,
  SHIPPED,
  DELIVERED,
  CANCELLED,
  RETURNED,
  FAILED,
  REFUNDED,
  ONHOLD,
}

export type OrderResponse = {
  id: number;
  ship_first_name: string;
  ship_last_name: string;
  ship_address: string;
  ship_city: string;
  ship_region: string;
  ship_postal_code: string;
  ship_country: string;
  phone: string;
  customer_id: number;
  shipper_id: number;
  status: Status;
}

export type pli = {
  id: number,
  quantity: number
}

export type prevCart = {
  plis: pli[],
  quantity: number
}

export enum Actions {
  CREATE = 'Create',
  EDIT = 'Edit',
  DELETE = 'Delete'
}