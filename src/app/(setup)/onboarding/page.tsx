import { currentProfile } from "@/lib/currentProfile";
import { redirect } from "next/navigation";

const Page = async () => {
  const profile = await currentProfile();

  if (!profile) redirect("/login");

  if (!profile.onboarded) redirect("/onboarding/create-profile");

  return redirect("/onboarding/create-join-room");
};

export default Page;
