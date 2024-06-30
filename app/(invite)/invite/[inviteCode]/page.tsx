import { currentProfile } from "@/lib/current-profile";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { FC } from "react";

interface pageProps {
  params: { inviteCode: string };
}

const InviteCodePage: FC<pageProps> = async ({ params }) => {
  const profile = await currentProfile();
  if (!profile) {
    return auth().redirectToSignIn();
  }
  const { inviteCode } = params;

  if (!inviteCode) {
    return redirect("/");
  }

  const alreadyExist = await db.server.findFirst({
    where: { inviteCode, members: { some: { profileId: profile.id } } },
  });

  if (alreadyExist) {
    return redirect(`/servers/${alreadyExist.id}`);
  }

  const server = await db.server.update({
    where: { inviteCode },
    data: { members: { create: [{ profileId: profile.id }] } },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return null;
};

export default InviteCodePage;
