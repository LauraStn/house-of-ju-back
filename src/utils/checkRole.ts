import { ForbiddenException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Roles } from './const/const';

const prisma = new PrismaClient();

export async function checkRoleLevel(userId: number, level: string) {
  if (!userId || !level) {
    throw new ForbiddenException('Access to resources denied');
  }

  checkRoleExist(level);

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (user && user.role_id) {
    const role = await prisma.role.findFirst({
      where: {
        id: user.role_id,
      },
    });

    if (role && role.id) {
      checkRoleExist(role.name);
      if (level === Roles.ADMIN && role.name !== Roles.ADMIN) {
        throw new ForbiddenException('Access to resources denied');
      }
    } else {
      throw new ForbiddenException('Access to resources denied');
    }
  } else {
    throw new ForbiddenException('Access to resources denied');
  }
}

function checkRoleExist(role: string) {
  switch (role) {
    case Roles.ADMIN:
    case Roles.USER:
      break;
    default:
      throw new ForbiddenException('Access to resources denied');
  }
}

export async function checkUserHasAccount(jwtId: number) {
  if (jwtId) {
    const user = await prisma.user.findUnique({
      where: {
        id: jwtId,
        is_active: true,
      },
    });
    if (!user || !user.id) {
      throw new ForbiddenException('Access to resources denied');
    }
  } else {
    throw new ForbiddenException('Access to resources denied');
  }
}

export async function checkuserIsAdmin(jwtId: number) {
  if (!jwtId) {
    throw new ForbiddenException('ok');
  }
  const user = await prisma.user.findUnique({
    where: {
      id: jwtId,
      is_active: true,
    },
    include: {
      role: true,
    },
  });

  if (user.role.name !== Roles.ADMIN) {
    throw new ForbiddenException('Access to resources denied3');
  }
  return user;
}
