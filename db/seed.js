import { faker } from '@faker-js/faker'
import db from "#db/client";
import { createEmployee } from '#db/queries/employees';

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  for (let i = 0; i < 10; i++){
    const employee = {
      name: faker.person.firstName() + faker.person.lastName(),
      birthday: faker.date.birthdate(),
      salary: Math.floor(Math.random() * (45 - 12 + 1) + 12),
    }
    await createEmployee(employee)
  }
}
