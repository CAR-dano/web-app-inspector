import React, { useState, useEffect } from "react";

interface PinDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (pin: string) => void;
}

const PinDialog: React.FC<PinDialogProps> = ({ isOpen, onClose }) => {
  const [pin, setPin] = useState("");
  const CORRECT_PIN = process.env.NEXT_PUBLIC_PIN;
  const [linkDownload, setLinkDownload] = useState("");
  const [linkDownloadRelease, setLinkDownloadRelease] = useState("");
  const [showDownloadLink, setShowDownloadLink] = useState(false);
  const [pinError, setPinError] = useState("");

  useEffect(() => {
    if (isOpen) {
      getApiGithub();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getApiGithub = async () => {
    try {
      const response = await fetch(
        "https://api.github.com/repos/CAR-dano/form-app/releases/latest"
      );
      const data = await response.json();
      console.log("GitHub API response:", data);

      // Look for debug and release versions in assets
      const assets = data.assets || [];

      // Find debug version (usually contains "debug" in name)
      const debugAsset = assets.find(
        (asset: any) =>
          asset.name.toLowerCase().includes("debug") ||
          asset.name.toLowerCase().includes("dev")
      );

      // Find release version (usually contains "release" in name or is the main asset)
      const releaseAsset = assets.find(
        (asset: any) =>
          asset.name.toLowerCase().includes("release") ||
          asset.name.toLowerCase().includes("prod") ||
          (!asset.name.toLowerCase().includes("debug") &&
            !asset.name.toLowerCase().includes("dev"))
      );

      // Set download links
      setLinkDownload(
        debugAsset
          ? debugAsset.browser_download_url
          : assets[0]?.browser_download_url || ""
      );
      setLinkDownloadRelease(
        releaseAsset
          ? releaseAsset.browser_download_url
          : assets[1]?.browser_download_url ||
              assets[0]?.browser_download_url ||
              ""
      );
    } catch (error) {
      console.error("Error fetching GitHub API:", error);
    }
  };

  const handleSubmit = () => {
    if (pin === CORRECT_PIN) {
      setShowDownloadLink(true);
      setPinError(""); // Clear any previous error
    } else {
      setShowDownloadLink(false);
      setPinError("PIN salah. Silakan coba lagi."); // Set error message
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4 text-black">Masukkan PIN</h2>
        {!showDownloadLink ? (
          <>
            <input
              type="password"
              className="border border-gray-300 p-2 w-full rounded-md mb-4 text-black"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="PIN"
            />
            {pinError && (
              <p className="text-red-500 text-sm mb-2">{pinError}</p>
            )}
            <p className="text-gray-500 text-xs mb-4 text-center">
              Dapatkan PIN dari admin.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Batal
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-[#F4622F] text-white rounded-md hover:bg-[#E24717]"
              >
                Submit
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="flex flex-col items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-green-500 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-black text-lg font-semibold mb-4">
                PIN Benar!
              </p>
              <p className="text-gray-600 mb-6 text-center">
                Silakan klik tombol di bawah untuk mengunduh file Anda.
              </p>
              <div className="w-full flex flex-col items-center space-y-4">
                <a
                  href={linkDownloadRelease}
                  download
                  className="w-full px-6 py-3 bg-[#28A745] text-white font-bold rounded-lg shadow-lg hover:bg-[#218838] transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
                  style={{ opacity: linkDownloadRelease ? 1 : 0.5 }}
                >
                  🚀 Inspector Version
                </a>
                <a
                  href={linkDownload}
                  download
                  className="w-full  px-6 py-3 bg-[#F4622F] text-white font-bold rounded-lg shadow-lg hover:bg-[#E24717] transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
                  style={{ opacity: linkDownload ? 1 : 0.5 }}
                >
                  🐛 Debug Version
                </a>
              </div>
              <button
                onClick={onClose}
                className="mt-6 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300 ease-in-out w-full"
              >
                Tutup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PinDialog;
