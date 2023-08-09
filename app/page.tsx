import Categories from "@/components/Categories";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import { getAllProjects } from "@/firebase/actions";
import { getCurrentUser } from "@/lib/session";

export default async function Home() {
  const projectsToDisplay = await getAllProjects();
  const session = await getCurrentUser();

  return (
    <>
      <Navbar session={session} />
      {projectsToDisplay?.length === 0 ? (
        <section className=" flexStart flex-col paddings">
          <p className="no-result-text text-center">
            No projects found, create some first.
          </p>
        </section>
      ) : (
        <section className=" flex-start flex-col paddings mb-16">
          <Categories />

          <section className="w-full flex justify-center items-center mt-10">
            <div className="projects-grid">
              {projectsToDisplay?.map((project) => {
                return (
                  <ProjectCard
                    key={project?.id}
                    id={project?.id}
                    title={project?.title}
                    images={project?.images}
                    userId={project?.userId}
                    session={session}
                  />
                );
              })}
            </div>
          </section>
        </section>
      )}
      <Footer />
    </>
  );
}
