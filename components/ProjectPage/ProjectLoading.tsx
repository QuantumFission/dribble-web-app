import React from "react";

export default function ProjectLoading() {
  return (
    <div className='px-4 py-16 lg:px-[200px] xl:px-[300px] flex flex-col w-full h-full overflow-y-scroll bg-white gap-10'>
      {/* userDetails  */}
      <section className='flex w-full h-[55px] items-center justify-center'>
        <div className='w-[48px] h-[48px] bg-gray-200 animate-pulse rounded-full' />
        <div className='flex flex-col items-start gap-1 w-[80%] ml-4'>
          <div className='w-full h-[20px] bg-gray-200 animate-pulse rounded-md'>
            <p className=' opacity-0'>{"."}</p>
          </div>
          <div className='w-full h-[20px] bg-gray-200 animate-pulse rounded-md'>
            <p className=' opacity-0'>{"."}</p>
          </div>
        </div>
      </section>
      <section className='w-full rounded-2xl'>
        <div className='w-full h-[450px] bg-gray-200 animate-pulse rounded-2xl'>
          <p className=' opacity-0'>{"."}</p>
        </div>
      </section>
      <section className='w-full rounded-2xl flexCenter'>
      <div className='flex flex-col items-start gap-1 w-[80%] ml-4'>
          <div className='w-full h-[20px] bg-gray-200 animate-pulse rounded-md'>
            <p className=' opacity-0'>{"."}</p>
          </div>
          <div className='w-full h-[20px] bg-gray-200 animate-pulse rounded-md'>
            <p className=' opacity-0'>{"."}</p>
          </div>
          <div className='w-full h-[20px] bg-gray-200 animate-pulse rounded-md'>
            <p className=' opacity-0'>{"."}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
