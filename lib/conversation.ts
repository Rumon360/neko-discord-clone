import db from "./db";

const findConvo = async (memberOneId: string, memberTwoId: string) => {
  try {
    return await db.coversation.findFirst({
      where: {
        AND: [{ memberOneId, memberTwoId }],
      },
      include: {
        memberOne: {
          include: { profile: true },
        },
        memberTwo: {
          include: { profile: true },
        },
      },
    });
  } catch (error) {
    return null;
  }
};

const createNewConvo = async (memberOneId: string, memberTwoId: string) => {
  try {
    return await db.coversation.create({
      data: { memberOneId, memberTwoId },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    });
  } catch (error) {
    return null;
  }
};

export const getOrCreateConvo = async (
  memberOneId: string,
  memberTwoId: string
) => {
  let conversation =
    (await findConvo(memberOneId, memberTwoId)) ||
    (await findConvo(memberTwoId, memberOneId));

  if (!conversation) {
    conversation = await createNewConvo(memberOneId, memberTwoId);
  }
  return conversation;
};
