'use client'

import React from 'react';
import Button from './Button';
import { deleteProject, fetchToken } from '@/lib/actions';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { motion as m } from 'framer-motion';



export default function ProjectActions({ projectId }: {projectId: string}) {


    const router = useRouter();
    const handleDelete = async () => {
        const { token } = await fetchToken();
        await deleteProject(projectId, token);
        router.push("/");
        toast.custom(() => (
            <m.div
            initial={{ opacity: 0, y: "-30px" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className=' bg-green-500 py-5 px-3 rounded-md'>
                <p className=' text-white text-md font-bold'>Successfully deleted the project .</p>
            </m.div>
        ), {
            duration: 2000
        })
      };

  return (
    <div className=' flex items-center gap-8 bg-gray-100/70 rounded-md'>
        <Button 
            title='Edit shot' 
            className='bg-transparent text-gray-600 py-6 font-semibold'
            handleClick={() => router.push(`/edit-project/${projectId}`)} 
        />
        <Button 
            title='Delete'
            handleClick={handleDelete} 
            className='bg-transparent text-gray-600 py-6 font-semibold' 
        />
    </div>
  )
}
