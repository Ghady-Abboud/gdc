"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AppPage from "../../lib/routes/routes";

interface LayoutProps {
  children: React.ReactNode;
}

const relativeImages = [
  //{ name: "Dashboard", src: "/image/Dashboard.png" },
  { name: "Files", src: "/image/Files.png", href: AppPage.MYFILES },
  { name: "Starred", src: "/image/Starred.png", href: AppPage.STARRED },
  {
    name: "Shared With Me",
    src: "/image/Shared.png",
    href: AppPage.SHARED,
  },
  { name: "Trash", src: "/image/Trash.png", href: AppPage.TRASH },
];

const layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  return (
    <div className="flex h-screen w-full text-regular ">
      <section className="flex flex-col h-screen w-1/6 justify-start items-center pt-5 border-r border-gray-900/30 shadow-[1px_0_2px_-1px_rgba(255,255,255,0.1)]">
        {/* <button className="mt-5 font-bold text-2xl hover:cursor-pointer">
          DashBoard
        </button> */}
        <Image src="/image/logo.png" alt="logo" width={125} height={50} />
        <ul className="mx-auto w-3/4 text-center space-y-2 ">
          {relativeImages.map((item) => (
            <li
              key={item.name}
              className="flex justify-start items-center px-4 cursor-pointer rounded-lg h-10 transition-all duration-200 ease-in-out hover:bg-gray-600 hover:shadow-lg hover:scale-105"
              onClick={() => router.push(item.href)}
            >
              <Image src={item.src} alt={item.name} width={30} height={30} />
              <button className="text-md text-gray-300 hover:text-white transition-colors duration-200 ml-2">
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col h-screen w-5/6 justify-center items-center">
        {children}
      </section>
    </div>
  );
};

export default layout;
