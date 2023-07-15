import React from 'react'
import { BiSearch } from 'react-icons/bi'

export default function NavSearch() {
  return (
    <form className=' bg-light-gray rounded-full md:flex items-center py-1 px-4 gap-2 hidden'>
        <BiSearch size={20} className=' text-gray-500' />
        <input type="text" placeholder='search' className=' bg-transparent py-2 focus:outline-none' />
    </form>
  )
}
