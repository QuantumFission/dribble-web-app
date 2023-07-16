import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NavLinks } from "@/constants";
import NavSearch from "./NavSearch";
import Button from "./Button";
import { ToolTip } from "./ui/tooltip";
import { authOptions } from "@/lib/session";
import { getServerSession } from "next-auth";
import AuthProviders from "./AuthProviders";
import ProfileMenu from "./ProfileMenu";
import { SessionInterface } from "@/common.types";

export default async function Navbar() {

  const session = (await getServerSession(authOptions)) as SessionInterface;


  return (
    <nav className=' flexBetween navbar'>
      <div className=' flex-1 flexStart gap-10 relative'>
        <Link href='/' className=' w-[90px] h-[40px] group relative'>
          <Image
            src='/logo.svg'
            alt='dribble'
            width={90}
            height={40}
            priority
            className=' object-contain w-auto h-full'
          />
          <ToolTip tip='Dribbble: the community for graphic design' />
        </Link>
        <ul className=' xl:flex hidden text-sm gap-7'>
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.key} className=' group relative'>
              <span className=' text-c-dark text-sm font-semibold'>
                {link.text}
              </span>
              <ToolTip tip={link.text} />
            </Link>
          ))}
        </ul>
      </div>
      <div className='flexCenter gap-4'>
        {session ? (
          <>
            <NavSearch />
            <Link href='/create-project'>
              <Button
                title='Share Work'
                className=' text-white bg-c-dark hover:bg-[#565564] font-semibold hidden md:flex'
              />
            </Link>
            <ProfileMenu session={session} />
          </>
        ) : (
          <>
            <AuthProviders />
          </>
        )}
      </div>
    </nav>
  );
}
