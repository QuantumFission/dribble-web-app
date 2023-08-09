"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { SessionInterface, UserDetails } from "@/common.types";
import Button from "./Button";
import UserProfile from "./ui/UserProfile";
import { getUserDetails } from "@/firebase/actions";

const ProfileMenu = ({ session }: { session: SessionInterface }) => {
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState<UserDetails | null>(null);

  useEffect(() => {
    const getData = async () => {
      const user = await getUserDetails(session?.user?.id);
      setUser(user);
    };
    getData();
  }, []);

  return (
    <div className="flexCenter z-10 flex-col relative">
      <Menu as="div">
        <Menu.Button
          className="flexCenter"
          onMouseEnter={() => setOpenModal(true)}
        >
          {user?.image ? (
            <UserProfile width={40} height={40} src={user?.image} />
          ) : (
            <div className=" w-10 h-10 bg-gray-200 animate-pulse rounded-full" />
          )}
        </Menu.Button>

        <Transition
          show={openModal}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            static
            className="flexStart profile_menu-items"
            onMouseLeave={() => setOpenModal(false)}
          >
            <div className="flex flex-col items-center gap-y-4">
              {user?.image && (
                <Link
                  href={`/profile/${user?.id}`}
                  className=" w-[80px] h-[80px]"
                >
                  <UserProfile width={80} height={80} src={user?.image} />
                </Link>
              )}
              <Link href={`/profile/${user?.id}`}>
                <p className="font-bold hover:text-gray-600 transition-all duration-200 cursor-pointer">
                  {user?.name}
                </p>
              </Link>
              <Link href="/create-project">
                <Button
                  title="Share Work"
                  className="text-c-dark bg-gray-200/70 hover:bg-gray-200 flex md:hidden font-semibold"
                />
              </Link>
            </div>

            <div className="flex flex-col gap-3 pt-10 items-start w-full">
              <Menu.Item>
                <Link href={`/profile/${user?.id}`} className="text-sm">
                  Work Preferences
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link href={`/profile/${user?.id}`} className="text-sm">
                  Settings
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link href={`/profile/${user?.id}`} className="text-sm">
                  Profile
                </Link>
              </Menu.Item>
            </div>
            <div className="w-full flexStart border-t border-nav-border mt-5 pt-5">
              <Menu.Item>
                <button
                  type="button"
                  className="text-sm"
                  onClick={() => signOut()}
                >
                  Sign out
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default ProfileMenu;
