"use client";
import React, { useEffect } from "react";
import FileTable from "../../components/filetable";

interface FileData {
  name: string;
  metadata: FileMetaData;
}

interface FileMetaData {
  lastModified: string;
  size: number;
}

const Dashboard = () => {
  const [data, setData] = React.useState<FileData[]>([]);
  const [username, setUsername] = React.useState<string>("");
  React.useState<boolean>(false);
  useEffect(() => {
    const FetchFiles = async () => {
      const response = await fetch("http://localhost:3001/dashboard", {
        method: "GET",
        credentials: "include",
      });

      const res = await response.json();
      setData(res.data);
      setUsername(res.username);
    };
    FetchFiles();
  }, []);

  return (
    <div className="flex flex-col h-full w-full px-10 py-5 rounded-xl text-tablefontcolor">
      {/* <div className="flex justify-start items-center mt-5 w-1/2">
        <button
          className="file text-xl text-center border-2 border-primary rounded-xl cursor-pointer px-2 py-1"
          onClick={() => setUploadModalState(!uploadModalState)}
        >
          New
        </button>
        {uploadModalState && <FileUpload />}
      </div> */}
      <div className="my-10 text-3xl font-semibold text-fontcolor">
        My Files
      </div>

      <FileTable data={data} username={`${username}`} />
    </div>
  );
};

export default Dashboard;
