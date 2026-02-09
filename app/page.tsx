"use client";
import { useState } from "react";
import { Cinzel, Great_Vibes, Playfair_Display } from "next/font/google";
import { Modal, Input, Button, message as antMessage, Tooltip } from "antd";
import {
  EditOutlined,
  CopyOutlined,
  HeartFilled,
  ShareAltOutlined,
} from "@ant-design/icons";
import Product from "@/src/product";

// Load fonts
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "600"] });

export default function CreateCard() {
  // --- STATE ---
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    partnerName: "",
    message: "",
  });
  const [generatedLink, setGeneratedLink] = useState("");

  // --- HANDLERS ---
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // If user edits text, reset the link so they know to regenerate it
    if (generatedLink) setGeneratedLink("");
  };

  const handleGenerate = () => {
    const finalName = formData.partnerName || "My Dearest";
    const finalMsg = formData.message || "Will you be my Valentine?";

    const queryParams = new URLSearchParams({
      partnerName: finalName,
      message: finalMsg,
    }).toString();

    const baseURL = typeof window !== "undefined" ? window.location.origin : "";

    // FIX: Add '/view-data' directly into the template string
    // This creates: http://yoursite.com/view-data?partnerName=...
    const link = `${baseURL}/view-data?${queryParams}`;

    setGeneratedLink(link);
    antMessage.success("Magic link created! 💘");

    // Open the Share Modal
    setIsShareModalOpen(true);
  };

  const copyToClipboard = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    antMessage.success("Link copied to clipboard!");
  };
  return (
    <>
      <div className="min-h-[calc(100vh-100px)] relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-tr from-[#ff9a9e] via-[#fad0c4] to-[#fbc2eb] bg-[length:400%_400%] animate-gradient-move gap-8">
        {/* ---------------------------------------------------------
          1. MAIN CARD PREVIEW (Glassmorphism & Soft Shadows)
         --------------------------------------------------------- */}
        <div className="relative group w-[min(92%,420px)] p-10 bg-white/60 backdrop-blur-xl rounded-[32px] text-center shadow-[0_20px_60px_rgba(255,100,120,0.25)] border border-white/60 animate-card-in transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_30px_80px_rgba(255,100,120,0.35)]">
          {/* EDIT BUTTON (Top Right) - Floating Circle */}
          <Tooltip title="Edit Card">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full shadow-sm flex items-center justify-center text-[#ff4d6d] hover:bg-[#ff4d6d] hover:text-white transition-all duration-300 z-50 group-hover:opacity-100"
            >
              <EditOutlined className="text-lg" />
            </button>
          </Tooltip>

          {/* Inner Glow / Heart Aura */}
          <div className="absolute inset-0 -z-10 rounded-[32px] bg-gradient-to-b from-white/40 to-transparent opacity-80 pointer-events-none" />

          {/* Content */}

          {/* H1: Romantic Script Font in Rose Red */}
          <h1
            className={`${greatVibes.className} text-6xl text-[#d90429] mb-4 drop-shadow-sm break-words leading-tight min-h-[70px]`}
          >
            {formData.partnerName || "My Love"}
          </h1>

          {/* H2: Elegant Serif in Deep Wine */}
          <h2
            className={`${playfair.className} text-[20px] text-[#641220] mb-8 leading-relaxed whitespace-pre-wrap min-h-[80px] italic`}
          >
            {formData.message ||
              "Before you, days were ordinary, nights were just time passing, then you became my everything, and life turned into love."}
          </h2>

          {/* Static Action Buttons (Visual Only) - Soft Pills */}
          <div className="relative h-16 flex justify-center items-start gap-4 pointer-events-none grayscale-[0.1] opacity-95">
            <button
              className={`${cinzel.className} px-8 py-3 rounded-full bg-gradient-to-r from-[#ff4d6d] to-[#ff758f] text-white shadow-lg shadow-rose-300/50 transform `}
            >
              Yes 💖
            </button>
            <button
              className={`${cinzel.className} px-8 py-3 rounded-full bg-white/80 text-gray-500 shadow-md backdrop-blur-sm transform rotate-[2deg]`}
            >
              No
            </button>
          </div>
        </div>

        {/* ---------------------------------------------------------
          2. CREATE BUTTON (Outside Card) - Heartbeat Animation
         --------------------------------------------------------- */}
        <Button
          type="primary"
          size="large"
          onClick={handleGenerate}
          // Gradient Rose Button
          className="w-[min(92%,420px)] bg-gradient-to-r from-[#ff4d6d] to-[#ff0a54] border-none h-14 font-serif text-lg shadow-xl shadow-rose-400/30 rounded-full animate-pop-in hover:scale-105 transition-transform duration-300"
        >
          Create Magic Link ✨
        </Button>

        {/* ---------------------------------------------------------
          3. EDIT MODAL
         --------------------------------------------------------- */}
        <Modal
          title={
            <div className="flex items-center gap-2 text-[#ff4d6d] font-serif text-2xl tracking-wide">
              <HeartFilled className="animate-pulse" /> A Letter From My Heart
            </div>
          }
          open={isEditModalOpen}
          onCancel={() => setIsEditModalOpen(false)}
          footer={null}
          centered
        >
          <div className="flex flex-col gap-6 pt-4">
            {/* Partner Name */}
            <div>
              <label className="block text-[#641220] font-medium mb-1.5 text-sm font-serif italic">
                To the one who owns my heart
              </label>
              <Input
                name="partnerName"
                placeholder="Your beloved’s name..."
                value={formData.partnerName}
                onChange={handleChange}
                size="large"
                prefix={<HeartFilled className="text-[#ffb3c1]" />}
                maxLength={30}
                className="rounded-xl border-rose-200 hover:border-rose-400 focus:border-rose-500"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-[#641220] font-medium mb-1.5 text-sm font-serif italic">
                Whisper your feelings
              </label>
              <Input.TextArea
                name="message"
                placeholder={`Write what your heart wants to say...

For example:
I didn’t believe in forever,
until you held my hand,
and suddenly,
every moment felt eternal.`}
                value={formData.message}
                onChange={handleChange}
                rows={5}
                maxLength={200}
                showCount
                className="resize-none rounded-xl border-rose-200 hover:border-rose-400 focus:border-rose-500"
              />
            </div>

            {/* Button */}
            <Button
              type="primary"
              size="large"
              onClick={() => setIsEditModalOpen(false)}
              className="bg-[#ff4d6d] hover:bg-[#d90429] border-none h-12 font-serif text-lg rounded-xl shadow-lg shadow-rose-200 tracking-wide"
              block
            >
              Seal With Love 💌
            </Button>
          </div>
        </Modal>

        {/* ---------------------------------------------------------
          4. SHARE MODAL (Opens after generating)
         --------------------------------------------------------- */}
        <Modal
          title={
            <div className="flex items-center gap-2 text-[#ff4d6d] font-serif text-xl">
              <ShareAltOutlined /> Share the Love
            </div>
          }
          open={isShareModalOpen}
          onCancel={() => setIsShareModalOpen(false)}
          footer={null}
          centered
        >
          <div className="flex flex-col gap-5 pt-4">
            <p className="text-[#641220] text-center font-serif italic">
              Your romantic surprise is ready! Copy the link below.
            </p>

            <div className="flex gap-2">
              <Input
                value={generatedLink}
                readOnly
                className="bg-rose-50 text-rose-800 text-sm border-rose-200 rounded-lg"
              />
              <Tooltip title="Copy Link">
                <Button
                  onClick={copyToClipboard}
                  icon={<CopyOutlined />}
                  className="bg-[#ff4d6d] text-white hover:bg-[#d90429] hover:text-white border-none rounded-lg"
                />
              </Tooltip>
            </div>

            <div className="mt-2 text-center">
              <a
                href={generatedLink}
                target="_blank"
                className="text-sm font-serif font-bold text-[#d90429] hover:underline flex items-center justify-center gap-1"
              >
                Preview Surprise <HeartFilled className="text-xs" />
              </a>
            </div>
          </div>
        </Modal>
      </div>

      <Product />
    </>
  );
}
