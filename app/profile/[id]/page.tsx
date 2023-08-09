import ProfilePage from "@/components/ProfilePage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCurrentUser } from "@/lib/session";
import { getUserDetails } from "@/firebase/actions";

type Props = {
  params: {
    id: string;
  };
};

const UserProfile = async ({ params: { id } }: Props) => {
  const session = await getCurrentUser();
  const user = await getUserDetails(id);

  return (
    <>
      <Navbar session={session} />
      <ProfilePage user={user} />
      <Footer />
    </>
  );
};

export default UserProfile;
