import React from "react";

interface FileData {
  name: string;
  metadata: {
    lastModified: string;
    size: number;
  };
  sharedBy?: string;
}

interface TableProps {
  data: FileData[];
  username: string;
}
const FileTable = ({ data, username }: TableProps) => {
  return (
    <>
      {/* TABLE HEADER */}
      <div className="grid grid-cols-4 gap-2 px-6 py-3 bg-black-50 rounded-t-xl border-2 border-primary justify-items-center text-fontcolor">
        {["File Name", "Last Modified", "Size", "Owner"].map((header, index) => (
          <h1 key={index} className="font-semibold italic">
            {header}
          </h1>
        ))}
      </div>
      {/* TABLE Content */}
      <div className="rounded-b-lg border-2 border-t-0 border-primary bg-tablefontcolor text-fontcolor">
        {data.map((each, index) => (
          <div
            className="grid grid-cols-4 gap-2 px-6 py-3 hover:bg-black-200 justify-items-center hover:cursor-pointer rounded-md transition-all duration-200 ease-in-out hover:shadow-xl  overflow-hidden"
            key={index}
          >
            <div className="flex items-center">
              <span className="truncate">{each.name}</span>
            </div>
            <div className="flex items-center">
              <span className="truncate">{each.metadata.lastModified}</span>
            </div>
            <div className="flex items-center">
              <span className="truncate">{each.metadata.size}</span>
            </div>
            <div className="flex items-center">
              <span className="truncate">{username}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FileTable;
