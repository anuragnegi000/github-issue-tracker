"use client";
import React from "react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import PlaceholdersAndVanishInputDemo from "../../components/Text-input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const SubmitEvent = () => {
    alert("hi");
  };

  return (
    <div className="h-screen rounded-md bg-neutral-900 flex flex-col items-center justify-center relative w-full">
      <h2 className="relative z-10 text-3xl md:text-5xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8">
        <span>Github Issue-Tracker</span>
      </h2>
      <span className="text-sml tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8">By Mohd Shaheer & Anurag Negi</span>
      <PlaceholdersAndVanishInputDemo />
      <div className="flex flex-col gap-6">
        <div className="flex flex-row items-center ml-[6rem] justify-center gap-4 relative z-10">
          <div className="flex items-center justify-center w-[40rem] h-20 border border-white rounded-md p-2">
            <h1 className="relative z-10 text-3xl md:text-xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8">
              JOB-BOARD
            </h1>
          </div>
          <Button className="border border-white rounded-md p-2">DELETE</Button>
        </div>
        <div className="flex flex-row items-center ml-[6rem] justify-center gap-4 relative z-10">
          <div className="flex items-center justify-center w-[40rem] h-20 border border-white rounded-md p-2">
            <h1 className="relative z-10 text-3xl md:text-xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8">
              JOB-BOARD
            </h1>
          </div>
          <Button className="border border-white rounded-md p-2">DELETE</Button>
        </div>
        <div className="flex flex-row items-center ml-[6rem] justify-center gap-4 relative z-10">
          <div className="flex items-center justify-center w-[40rem] h-20 border border-white rounded-md p-2">
            <h1 className="relative z-10 text-3xl md:text-xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8">
              JOB-BOARD
            </h1>
          </div>
          <Button className="border border-white rounded-md p-2">DELETE</Button>
        </div>
        <div className="flex flex-row items-center ml-[6rem] justify-center gap-4 relative z-10">
          <div className="flex items-center justify-center w-[40rem] h-20 border border-white rounded-md p-2">
            <h1 className="relative z-10 text-3xl md:text-xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8">
              JOB-BOARD
            </h1>
          </div>
          <Button className="border border-white rounded-md p-2">DELETE</Button>
        </div>
      </div>
        //Render
      <ShootingStars className="absolute inset-0" />
      <StarsBackground className="absolute inset-0" />
    </div>
  );
}
