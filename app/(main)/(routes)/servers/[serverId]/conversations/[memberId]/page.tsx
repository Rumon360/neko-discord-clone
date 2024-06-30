import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import ChatMessages from "@/components/chat/chat-messages";
import { MediaRoom } from "@/components/media-room";
import { getOrCreateConvo } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { FC } from "react";

interface pageProps {
  params: {
    memberId: string;
    serverId: string;
  };
  searchParams: {
    video?: boolean;
  };
}

const MemberIdPage: FC<pageProps> = async ({ params, searchParams }) => {
  const { memberId, serverId } = params;
  const profile = await currentProfile();
  if (!profile) {
    return auth().redirectToSignIn();
  }
  const currentMember = await db.member.findFirst({
    where: { serverId, profileId: profile.id },
    include: {
      profile: true,
    },
  });

  if (!currentMember) {
    return auth().redirectToSignIn();
  }

  const convo = await getOrCreateConvo(currentMember.id, params.memberId);

  if (!convo) {
    return redirect(`/servers/${serverId}`);
  }

  const { memberOne, memberTwo } = convo;

  const otherMember =
    memberOne.profileId === profile.id ? memberTwo : memberOne;

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        imageUrl={otherMember.profile.imageUrl}
        name={otherMember.profile.name}
        type="conversation"
        serverId={serverId}
      />
      {searchParams.video && (
        <MediaRoom audio={true} video={true} chatId={convo.id} />
      )}
      {!searchParams.video && (
        <>
          <ChatMessages
            member={currentMember}
            name={otherMember.profile.name}
            chatId={convo.id}
            type="conversation"
            apiUrl="/api/direct-messages"
            paramValue={convo.id}
            paramKey="conversationId"
            socketUrl="/api/socket/direct-messages"
            socketQuery={{
              conversationId: convo.id,
            }}
          />
          <ChatInput
            name={otherMember.profile.name}
            apiUrl="/api/socket/direct-messages"
            type="conversation"
            query={{
              conversationId: convo.id,
            }}
          />
        </>
      )}
    </div>
  );
};

export default MemberIdPage;
