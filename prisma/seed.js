import { seedUsers } from "./seeds/seedUsers.js";
import { seedTeams } from "./seeds/seedTeams.js";
import { seedPayments } from "./seeds/seedPayments.js";
import { seedMerchandiseOrders } from "./seeds/seedMerchandiseOrders.js";

async function main() {
  await seedUsers();
  await seedTeams();
  await seedPayments();
  await seedMerchandiseOrders();
  console.log("🌍 All seeding complete!");
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("❌ Error while seeding:", e);
    process.exit(1);
  });
