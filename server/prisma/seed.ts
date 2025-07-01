import { PrismaClient, Status } from '@prisma/client';
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

type Customers = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

async function createRandomCustomers(): Promise<void> {
  const data = Array.from({ length: 10 }, () => ({
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  })) as Customers[];

  await prisma.customers.createMany({
    data: data,
    skipDuplicates: true,
  });

  console.log('✅ Customers inserted');
}

type Category = {
  category_name: string;
  description: string;
  slug: string;
  picture: string;
};

async function createRandomCategories(): Promise<void> {
  const data = Array.from({ length: 3 }, () => ({
    category_name: faker.commerce.department(),
    description: faker.commerce.productDescription(),
    slug: faker.helpers.slugify(faker.commerce.department().toLowerCase()),
    picture: faker.image.urlPicsumPhotos(), // або faker.image.imageUrl()
    isActive: true,
  })) as Category[];

  await prisma.categories.createMany({
    data: data,
    skipDuplicates: true,
  });

  console.log('✅ Categories inserted');
}

type Product = {
  product_name: string;
  description: string;
  slug: string;
  price: number;
  discont_price: number;
  in_stock: number;
  isActive: boolean;
  category_id: number;
};

async function createRandomProducts(): Promise<void> {
  const categories = await prisma.categories.findMany({ select: { id: true } });
  const categoryIds = categories.map(c => c.id);

  const data = Array.from({ length: 20 }, () => ({
    product_name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    slug: faker.helpers.slugify(faker.commerce.productName().toLowerCase() + '-' + faker.string.alpha(4)),
    price: Number(faker.commerce.price({ min: 10, max: 1000, dec: 0 })),
    discont_price: Number(faker.commerce.price({ min: 5, max: 900, dec: 0 })),
    in_stock: faker.number.int({ min: 0, max: 100 }),
    isActive: true,
    category_id: faker.helpers.arrayElement(categoryIds),
  })) as Product[];

  await prisma.products.createMany({
    data: data,
    skipDuplicates: true,
  });

  console.log('✅ Products inserted');
}

type Shippers = {
  company_name: string;
  phone: string;
  isActive: boolean;
};

async function createRandomShippers(): Promise<void> {
  const data = Array.from({ length: 3 }).map(() => ({
    company_name: faker.company.name(),
    phone: faker.phone.number(),
    isActive: true, // або faker.datatype.boolean() — якщо хочеш випадкове значення
  })) as Shippers[];

  await prisma.shippers.createMany({
    data: data,
    skipDuplicates: true,
  });

  console.log('✅ Shippers inserted');
}

type Order = {
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
};

async function createRandomOrders(): Promise<void> {
  const customers = await prisma.customers.findMany({ select: { id: true } });
  const customerIds = customers.map(c => c.id);

  const shippers = await prisma.shippers.findMany({ select: { id: true } });
  const shipperIds = shippers.map(c => c.id);

  const data = Array.from({ length: 20 }, () => ({
    ship_first_name: faker.person.firstName(),
    ship_last_name: faker.person.lastName(),
    ship_address: faker.location.streetAddress(),
    ship_city: faker.location.city(),
    ship_region: faker.location.state(),
    ship_postal_code: faker.location.zipCode(),
    ship_country: faker.location.country(),
    phone: faker.phone.number('+38 (0##) ###-##-##'),
    customer_id: faker.helpers.arrayElement(customerIds),
    shipper_id: faker.helpers.arrayElement(shipperIds),
    status: faker.helpers.arrayElement(Object.values(Status)),
  })) as Order[];

  await prisma.orders.createMany({
    data: data,
    skipDuplicates: true,
  });

  console.log('✅ Orders inserted');
}

type OrderDetails = {
  order_id: number;
  product_id: number;
  unit_price: number;
  quantity: number;
  discount: number;
};

async function createRandomOrderDetails(): Promise<void> {
  const orders = await prisma.orders.findMany({ select: { id: true } });
  const orderIds = orders.map(c => c.id);

  const products = await prisma.shippers.findMany({ select: { id: true } });
  const productIds = products.map(c => c.id);

  const data = Array.from({ length: 20 }, () => ({
    order_id: faker.helpers.arrayElement(orderIds),
    product_id: faker.helpers.arrayElement(productIds),
    unit_price: faker.number.int({ min: 10, max: 200 }), // в копійках або $ — залежно від формату
    quantity: faker.number.int({ min: 1, max: 10 }),
    discount: faker.number.int({ min: 0, max: 30 }), // знижка у відсотках
  })) as OrderDetails[];

  await prisma.orderDetails.createMany({
    data: data,
    skipDuplicates: true,
  });

  console.log('✅ OrderDetails inserted');
}

export async function main() {
  await createRandomCustomers();
  await createRandomCategories();
  await createRandomProducts();
  await createRandomShippers();
  await createRandomOrders();
  await createRandomOrderDetails();
}

main();
