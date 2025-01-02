"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AppPage from "../../lib/routes/routes";
import UploadFileModal from "../components/UploadFileModal";

interface LayoutProps {
  children: React.ReactNode;
}

const relativeImages = [
  { name: "Files", src: "/image/Files.png", href: AppPage.MYFILES },
  { name: "Starred", src: "/image/Starred.png", href: AppPage.STARRED },
  { name: "Shared With Me", src: "/image/Shared.png", href: AppPage.SHARED },
  { name: "Trash", src: "/image/Trash.png", href: AppPage.TRASH },
];

const layout: React.FC<LayoutProps> = ({ children }) => {
  const [newButtonState, setNewButtonState] = React.useState<boolean>(false);
  const [uploadFileModal, setUploadFileModal] = React.useState<boolean>(false);
  const [createFolderModal, setCreateFolderModal] =
    React.useState<boolean>(false);
  const router = useRouter();

  const handleNewOptions = () => {
    setNewButtonState(false);

    setUploadFileModal(true);
  };

  return (
    <div className="flex h-screen w-full text-regular">
      <section className="flex flex-col h-screen w-1/6 justify-start items-center pt-5 border-r border-gray-900/30 shadow-[1px_0_2px_-1px_rgba(255,255,255,0.1)]">
        <Image src="/image/logo.png" alt="logo" width={125} height={50} />
        <ul className="mx-auto w-3/4 text-center space-y-2">
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
        <div className="flex flex-1 flex-col justify-start items-center mt-20 w-full space-y-1">
          <button
            className="flex justify-center items-center p-2 text-xl w-1/3 font-medium text-fontcolor bg-gradient-to-r from-background via-customgray to-background shadow-md rounded-xl hover:cursor-pointer shadow-gray-800/50"
            type="button"
            onClick={() => setNewButtonState(!newButtonState)}
          >
            New
            <svg
              className={`w-2.5 h-2.5 ms-3 transform transition-transform duration-300 ${
                newButtonState ? "rotate-180" : ""
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <div
            className={`w-1/2 overflow-hidden transition-all duration-300 ease-in-out ${
              newButtonState ? "opacity-100" : "opacity-0"
            }`}
          >
            <ul className="flex flex-col justify-center items-center w-full bg-customgray rounded-lg shadow text-sm text-fontcolor">
              <li
                className="flex justify-start w-full border-b border-gray-900/30 p-2 hover:cursor-pointer hover:bg-gray-800 hover:shadow-lg hover:rounded-xl"
                onClick={handleNewOptions}
              >
                <Image
                  src="/image/uploadfile.png"
                  alt="Upload File"
                  width={20}
                  height={20}
                />
                <span className="px-2">Upload File</span>
              </li>
              <li className="flex justify-start w-full border-b border-gray-900/30 p-2 hover:cursor-pointer hover:bg-gray-800 hover:shadow-lg hover:rounded-xl">
                <Image
                  src="/image/createfolder.png"
                  alt="Create Folder"
                  width={20}
                  height={20}
                />
                <span className="px-2">Create Folder</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="flex flex-col h-screen w-5/6 justify-center items-center">
        {children}
      </section>

      <UploadFileModal
        isOpen={uploadFileModal}
        onClose={() => setUploadFileModal(false)}
      />
    </div>
  );
};

export default layout;
