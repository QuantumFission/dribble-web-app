import ProjectDetails from "@/components/ProjectPage/ProjectDetails";
import ProjectModal from "@/components/ProjectPage/ProjectModal";
import { getCurrentUser } from "@/lib/session";

type Props = {
  params: {
    id: string;
  };
};

export default async function Project({ params: { id } }: Props) {
  const session = await getCurrentUser();

  return (
    <ProjectModal>
      <ProjectDetails id={id} session={session} />
    </ProjectModal>
  );
}
