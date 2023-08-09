import { ProjectInterface, UserDetails } from "@/common.types";
import Image from "next/image";

import Link from "next/link";
import Button from "./Button";
import ProjectCard from "./ProjectCard";
import UserProfile from "./ui/UserProfile";
import { getLastProject } from "@/firebase/actions";
import { getCurrentUser } from "@/lib/session";

const ProfilePage = async ({ user }: { user: UserDetails | null }) => {
  const session = await getCurrentUser();
  let projects = [] as any;
  if (user?.id) {
    projects = await getLastProject(user.id);
  }

  const firstItem = projects[0] as ProjectInterface;

  return (
    <section className="flexCenter flex-col max-w-10xl w-full mx-auto paddings">
      <section className="flexBetween max-lg:flex-col gap-10 w-full">
        <div className="flex items-start flex-col w-[50%]">
          {user && <UserProfile src={user?.image} width={100} height={100} />}
          <p className="text-3xl font-bold mt-10">{user?.name}</p>

          <p className="md:text-5xl flex text-4xl font-bold mt-5 max-w-lg">
            A web developer that's keen on simplicity and usability
          </p>

          <div className="flex mt-8 gap-5 w-full flex-wrap">
            <Button
              title="Hire Me"
              className=" bg-c-dark text-white flex font-semibold hover:bg-gray-700"
            />
            <Link href={`mailto:${user?.email}`}>
              <Button
                title="Follow"
                className="text-c-dark border-2 border-c-dark font-semibold
                hover:bg-gray-200"
              />
            </Link>
          </div>
        </div>

        <div className=" w-1/2">
          {firstItem ? (
            <Image
              src={firstItem?.images[0]}
              alt="project image"
              width={739}
              height={554}
              className="rounded-xl object-contain w-auto h-auto"
            />
          ) : (
            <Image
              src="/profile-post.png"
              width={739}
              height={554}
              alt="project image"
              className="rounded-xl w-auto h-auto"
            />
          )}
        </div>
      </section>

      <section className="flexStart flex-col lg:mt-28 mt-16 w-full">
        <p className="w-full text-left text-lg font-semibold">Recent Work</p>

        <div className="profile_projects">
          {projects?.map((node: ProjectInterface) => (
            <ProjectCard
              key={node?.id}
              id={node?.id}
              title={node?.title}
              images={node?.images}
              userId={user?.id || null}
              session={session}
            />
          ))}
        </div>
      </section>
    </section>
  );
};

export default ProfilePage;
