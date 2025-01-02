import React from "react";

interface UploadFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const UploadFileModal = ({
  isOpen,
  onClose,
  children,
}: UploadFileModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Dark Blurry Background */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 cursor-pointer"
        onClick={onClose}
      />

      {/* Main Modal */}
      <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-modalbackground rounded-2xl text-fontcolor w-1/3 h-1/2 m-auto shadow-lg shadow-gray-500/50 ">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-tablefontcolor hover:text-white transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Modal content (FIX) */}
        <div className="p-6">{children || "This Is The Upload File Modal"}</div>
      </div>
    </>
  );
};

export default UploadFileModal;
