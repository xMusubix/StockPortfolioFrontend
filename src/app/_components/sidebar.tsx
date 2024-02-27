import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { MdDashboard, MdSavings } from "react-icons/md";
import { IoMdPie, IoMdGrid } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { GiCash } from "react-icons/gi";
import { BiSolidBank } from "react-icons/bi";
import { FaGear } from "react-icons/fa6";

export default function Sidebar({ show, setter }: any) {
  const pathname = usePathname();

  // Define our base class
  const className =
    "bg-[#171717] w-[250px] transition-[margin-left] ease-in-out duration-500 fixed md:static top-0 bottom-0 left-0 z-40";
  // Append class based on state of sidebar visiblity
  const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";

  // Clickable menu items
  const MenuItem = ({ icon, name, route }: any) => {
    // Highlight menu item based on currently displayed route
    const colorClass =
      pathname === route ? "text-white" : "text-white/50 hover:text-white";

    return (
      <Link
        href={route}
        onClick={() => {
          setter((oldVal: any) => !oldVal);
        }}
        className={`flex gap-1 [&>*]:my-auto text-md pl-6 py-3 ${colorClass}`}
      >
        <div className="text-xl flex [&>*]:mx-auto w-[30px]">{icon}</div>
        <div>{name}</div>
      </Link>
    );
  };

  // Overlay to prevent clicks in background, also serves as our close button
  const ModalOverlay = () => (
    <div
      className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30`}
      onClick={() => {
        setter((oldVal: any) => !oldVal);
      }}
    />
  );

  return (
    <>
      <div className={`${className}${appendClass}`}>
        <div className="p-2 flex justify-center my-5">
          <p
            className={`m-0 max-w-[30ch] text-sm text-[22px] text-center tracking-wide leading-6`}
          >
            Investment Portfolio
          </p>
        </div>
        <div className="flex flex-col">
          <MenuItem name="Dashboard" route="/" icon={<MdDashboard />} />
          <MenuItem name="Stock" route="/stock" icon={<IoMdPie />} />
          <MenuItem name="Heat Map" route="/hats" icon={<IoMdGrid />} />
          <MenuItem name="Dividend" route="/dividend" icon={<GiCash />} />
          <MenuItem name="E-Class" route="/contact" icon={<BiSolidBank />} />
          <MenuItem name="Saving" route="/saving" icon={<MdSavings />} />
          <MenuItem name="Setup" route="/setup" icon={<FaGear />} />
        </div>
      </div>
      {show ? <ModalOverlay /> : <></>}
    </>
  );
}
