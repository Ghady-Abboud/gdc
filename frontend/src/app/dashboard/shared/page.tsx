"use client";
import React from "react";
import Image from "next/image";
import { ArrowLeftRight } from "lucide-react";
import FileTable from "@/app/components/filetable";

const SharedWithMe = () => {
  const data = [
    {
      name: "test",
      metadata: {
        lastModified: "test",
        size: 100,
      },
    },
  ];
  const username = "testing";
  return (
    <div className="grid grid-rows-[40%_60%] h-full w-full px-10 py-5 rounded-xl text-fontcolor">
      <section className="flex flex-col h-full w-full justify-start items-center">
        {/*Avatar Section*/}
        <div className="flex flex-row justify-evenly items-center mt-5 w-1/2">
          <Image
            src="/image/shareOne.png"
            alt="shareOne"
            width={120}
            height={120}
          />
          <ArrowLeftRight className="text-white" size={64} />
          <Image
            src="/image/shareTwo.png"
            alt="shareTwo"
            width={120}
            height={120}
          />
        </div>
        {/*Form Section*/}
        <div className="flex mt-5 w-1/2 ">
          {/*Sender Form*/}
          <form className="flex flex-col w-1/2 justify-center items-center pr-5">
            <label className="text-lg font-semibold text-fontcolor">
              Sender
            </label>
            <input
              type="text"
              className="border-2 border-primary rounded-xl text-center text-tablefontcolor"
              placeholder="Sender"
            />
          </form>

          {/*Recipient Form*/}
          <form className="flex flex-col w-1/2 justify-center items-center pl-5">
            <label className="text-lg font-semibold text-fontcolor">
              Recipient
            </label>
            <input
              type="text"
              className="border-2 border-primary rounded-xl text-center text-tablefontcolor"
              placeholder="Recipient"
            />
          </form>
        </div>
        {/*File Upload Section*/}
        <div className="flex w-1/2 justify-center items-center mt-10">
          <input
            type="file"
            className="text-sm text-stone-500 file:rounded-2xl file:mr-5 file:py-1 file:px-3 file:border-[1px] file:text-m file:font-medium file:bg-stone-50 file:text-stone-700 hover:file:cursor-pointer hover:file:bg-gray-50 hover:file:text-gray-700"
          />
        </div>
      </section>
      <section className="text-tablefontcolor py-2">
        <FileTable data={data} username={`${username}`} />
      </section>
    </div>
  );
};

export default SharedWithMe;
