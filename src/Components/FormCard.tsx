"use client";
import { Copy, Ellipsis, Info, Pencil, SquareMenu, Star, Trash, X } from 'lucide-react';
import { Jura } from 'next/font/google';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';


interface FormCardProps {
  id: string;
  name: string;
  last_edited: string;
  total_responses: number;
  team: string;
  company_slug: string;
  description: string;
}


const jura = Jura({
  variable: "--font-jura",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});


function FormCard({id, name, last_edited, total_responses, team, company_slug, description}: FormCardProps) {


  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  function formatDate(dateString: string) {
    const date = new Date(dateString);

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  const copytoClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast("Link copied to clipboard!", { position: "bottom-right"});
      if(modalOpen) setModalOpen(false);
    } catch (err) {
      alert("Failed to copy link.");
    }
  };
  
  const toggleModal = () => setModalOpen(!modalOpen);

  return (

    <div className='rounded-xl border-2 p-1  border-neutral-500/30 flex flex-row justify-between gap-6 box-shadow'>
      <div className='flex flex-row items-center'>
        <Image src={"/images/form_card_icon.jpg"} alt='' width={150} height={150}/>
        {/* content */}
        <div>
          <p className={jura.className + ' text-neutral-600 font-black text-sm'}>Job Details</p>
          <p className={jura.className + ' font-black text-2xl'}>{name}</p>
          <span className='text-[12px] my-2 text-neutral-600 rounded-md px-2 p-1 border border-[#8e5243] bg-[#FF967C]/40'>{team}</span>
          <p className='text-[12px] text-neutral-400'>{description.slice(0,150).replaceAll("#", "").replaceAll("*","").replaceAll("-","") + " ..."}</p>
          <p className='text-sm text-neutral-600'>Total Responses: {total_responses}</p>
          <p className='text-sm text-neutral-600'>Last Edited: {formatDate(last_edited)}</p>
        </div>
      </div>
      {/* tool panel chip */}
      <div className='flex flex-col justify-start pt-5 pr-5'>
        <button className="transition-transform cursor-pointer" onClick={toggleModal}>
          <Ellipsis size={28} />
        </button>
      </div>


      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={toggleModal}
        >
          {/* Stop click inside from closing */}
          <div
            className="bg-white rounded-xl p-5 w-80 shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={toggleModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <h2 className="text-lg font-semibold mb-3">{"  "}</h2>
            <button className="w-full text-left my-1 py-2 px-3 rounded hover:bg-gray-100 flex flex-row gap-2 cursor-pointer">
              <Pencil/> <p>Edit</p>
            </button>
            <button className="w-full text-left my-1 py-2 px-3 rounded hover:bg-gray-100 flex flex-row gap-2 cursor-pointer" onClick={() => copytoClipboard(`${window!.location.origin}/${company_slug}/jobs/${id}/`)}>
              <Copy/><p>Copy Link</p>
            </button>
            <button className="w-full text-left my-1 py-2 px-3 rounded hover:bg-gray-100 flex flex-row gap-2 cursor-pointer"  onClick={() => {router.push(`/${company_slug}/hr/forms/${id}/responses`)}}>
              <SquareMenu /><p>View Responses</p>
            </button>
            <button className="w-full text-left my-1 py-2 px-3 rounded hover:bg-gray-100 flex flex-row gap-2 cursor-pointer">
              <Info/> <p>Details</p>
            </button>
            <button className="w-full text-left py-2 px-3 rounded hover:bg-gray-100 flex flex-row gap-2 bg-red-300/20" >
              <Trash  color='red'/><p className='text-red-600'>Delete</p>
            </button>
          </div>
        </div>
      )}
      <Toaster/>
    </div>
  )
}

export default FormCard