import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

export default async function Home() {
  const projectsToDisplay = [] as string[];

  if (projectsToDisplay.length === 0) {
    return (
      <>
        <Navbar />
        <section className=' flexStart flex-col paddings'>
          <p className='no-result-text text-center'>
            No projects found, create some first.
          </p>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div>hiiii</div>
      <Footer />
    </>
  );
}
