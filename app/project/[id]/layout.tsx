import { Toaster } from "react-hot-toast";
import { getProjectMetadata } from "@/firebase/actions";

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}) {
  const metadata = await getProjectMetadata(id);

  return {
    title: `${metadata?.projectTitle} by ${metadata?.createdBy} on Dribbble`,
    description:
      "Find Top Designers & Creative Professionals on Dribbble. We are where designers gain inspiration, feedback, community, and jobs. Your best resource to discover and connect with designers worldwide.",
  };
}

type Props = {
  children: React.ReactNode;
};

export default function ProjectLayout({ children }: Props) {
  return (
    <main>
      <Toaster />
      <section>{children}</section>
    </main>
  );
}
