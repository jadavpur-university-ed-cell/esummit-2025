"use server";
import { prisma } from "@/prisma/client";
import { EventTeam, TeamMember, UnstopData } from "@/types/admin";

export const getAllMerchOrders = async () => {
  const orders = await prisma.merchandiseOrder.findMany({
    select: {
      status: true,
      size: true,
      orderId: true,
      user: {
        select: {
          name: true,
          email: true,
          phone: true,
        },
      },
      amount: true,
    },
  });
  const filteredOrders = orders.map((order) => {
    const filtered = {
      status: order.status,
      name: order.user.name,
      phone: order.user.phone,
      email: order.user.email,
      size: order.size,
      amount: order.amount,
      orderId: order.orderId,
    };
    return filtered;
  });
  return filteredOrders;
};

export const getAllTeams = async (eventSlug: string) => {
  const teams = await prisma.team.findMany({
    where: {
      eventSlug,
    },
    select: {
      teamName: true,
      id: true,
      members: {
        select: {
          name: true,
          email: true,
          id: true,
        },
      },
    },
  });
  return teams.map((team) => ({ ...team, eventSlug }));
};

export const createTeamMaps = async (csvData: UnstopData[]) => {
  const teamNameMap = new Map<string, string>();
  const teamMembersMap = new Map<string, TeamMember[]>();

  await Promise.all(
    csvData.map(async (entry) => {
      teamNameMap.set(entry["Team ID"], entry["Team Name"]);

      const memberId = await prisma.user.findFirst({
        where: { email: entry["Candidate's Email"] },
        select: { id: true },
      });

      if (!memberId || !memberId.id) {
        return;
      }

      const tempMembers = teamMembersMap.get(entry["Team ID"]) ?? [];
      tempMembers.push({
        email: entry["Candidate's Email"],
        name: entry["Candidate's Name"],
        id: memberId.id,
      });

      teamMembersMap.set(entry["Team ID"], tempMembers);
    })
  );

  return { teamMembersMap, teamNameMap };
};

export const submitUnstopTeams = async (teams: EventTeam[]) => {
  try {
    await Promise.all(teams.map(async (team) => {
        await prisma.team.upsert({
            where: {
                id: team.id
            },
            update: {
                memberIds: team.members.map(member => member.id)
            },
            create: {
                teamName: team.teamName,
                id: team.id,
                eventSlug: team.eventSlug,
                memberIds: team.members.map(member => member.id)
            }
        })
    }))
  } catch {
    return "Failed to submit.";
  }
};
