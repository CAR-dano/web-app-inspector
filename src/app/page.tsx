"use client";
import Bubble from "@/components/Bubble";
import Image from "next/image";
import { useState } from "react";
import PinDialog from "@/components/PinDialog";

export default function Home() {
  const [isPinDialogOpen, setIsPinDialogOpen] = useState(false);

  const handleDownloadClick = () => {
    setIsPinDialogOpen(true);
  };

  const handlePinSubmit = (pin: string) => {
    // Here you would typically validate the PIN and proceed with download
    alert(`PIN submitted: ${pin}`);
    setIsPinDialogOpen(false);
  };

  const handleClosePinDialog = () => {
    setIsPinDialogOpen(false);
  };

  return (
    <main className="font-inter relative bg-white w-[100vw] min-h-screen overflow-x-hidden">
      <div className="h-full relative flex flex-col items-center justify-between py-10 z-10">
        <div className="flex flex-col items-center justify-center z-10">
          <h1 className="text-4xl sm:text-4xl md:text-5xl font-bold text-center  text-[#E24717] italic">
            Halo Inspektor!
          </h1>
          <p className="text-base md:text-xl text-center mb-8 text-black w-[80%] max-w-md font-light">
            Tekan tombol Download untuk mengunduh aplikasi.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center z-20">
          <div className="relative flex items-center justify-center mb-8">
            <Image
              src="mockup.svg"
              alt="Mockup"
              width={500}
              height={500}
              className="object-contain w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto z-10"
            />
            {/* Main Bubble (behind mockup, centered) */}
            <Bubble className="w-[120vw] h-[120vw] sm:w-[60vw] sm:h-[60vw] md:w-[50vw] md:h-[50vw] max-w-[620px] max-h-[620px] bg-[#FF7D43] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0" />
            {/* Top-Left Bubble */}
            <Bubble className="w-[60vw] h-[60vw] sm:w-[30vw] sm:h-[30vw] md:w-[25vw] md:h-[25vw] max-w-[300px] max-h-[300px] bg-[#FF7D43] top-[90%] -left-[25%] -translate-x-1/2 -translate-y-1/2 z-0" />
            {/* Top-Right Bubble */}
            <Bubble className="w-[55vw] h-[55vw] sm:w-[28vw] sm:h-[28vw] md:w-[22vw] md:h-[22vw] max-w-[280px] max-h-[280px] bg-[#FF7D43] top-[10%] -right-[25%] translate-x-1/2 -translate-y-1/2 z-0" />
          </div>
          <button
            onClick={handleDownloadClick}
            className="w-64 sm:w-72 md:w-80 h-12 sm:h-14 md:h-16 px-6 py-3 bg-[#F4622F] rounded-[12px] text-white text-lg sm:text-xl md:text-2xl font-bold hover:bg-[#E24717] transition-colors duration-300"
          >
            Download Aplikasi
          </button>
          <p className="w-[80%] text-sm sm:text-base text-center mt-4 text-black font-light">
            Anda diminta memasukkan kode verifikasi untuk mengunduh aplikasi.
          </p>
        </div>
      </div>
      <PinDialog
        isOpen={isPinDialogOpen}
        onClose={handleClosePinDialog}
        onSubmit={handlePinSubmit}
      />
    </main>
  );
}
