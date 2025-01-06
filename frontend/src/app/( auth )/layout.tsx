import React from "react";
import Image from "next/image";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full">
      {/* Left Section: Background */}
      <section className="min-h-screen w-4/6 relative">
        <Image
          src="/image/auth_background.jpg"
          alt="background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center space-y-5 text-white bg-black bg-opacity-50">
          <h1 className="text-2xl font-bold">Manage Your Files the Best Way</h1>
        </div>
      </section>

      {/* Right Section: Dynamic Children */}
      <section className="min-h-screen w-2/6 bg-regular flex flex-col items-center justify-center">
        {children}
      </section>
    </div>
  );
};

export default Layout;
