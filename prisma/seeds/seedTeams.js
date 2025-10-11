import {prisma} from "@/prisma/client";

export async function seedTeams() {
  console.log("Seeding Teams...");

  await prisma.team.deleteMany(); // clear old data

  // Fetch existing users
  const users = await prisma.user.findMany();
  if (users.length < 3) {
    console.log("⚠️ Not enough users to make teams. Run seedUsers first.");
    return;
  }

  const createdTeams = [];

  // Create teams of 3 members
  for (let i = 0; i <= users.length - 3; i += 3) {
    const teamMembers = [users[i], users[i + 1], users[i + 2]];

    const team = await prisma.team.create({
      data: {
        memberIds: teamMembers.map(u => u.id),
        members: {
          connect: teamMembers.map(u => ({ id: u.id })),
        },
      },
    });

    createdTeams.push(team.id);
  }

  console.log("✅ Teams seeded:", createdTeams);
}
