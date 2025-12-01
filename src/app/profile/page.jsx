import dynamic from "next/dynamic";

const ProfileSettings = dynamic(() => import("./index"));

export const metadata = {
  title: "Profile Settings | DilliHues",
  description: "Manage your personal information on DilliHues",
};

export default function Page() {
  return <ProfileSettings />;
}