import { IoIosAddCircleOutline } from "react-icons/io";
import { useDisclosure } from "@nextui-org/modal";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import CreateNoteModal from "@/components/cards/createNoteModal";
import DefaultLayout from "@/layouts/default";
import NotesCard from "@/components/cards/notes-Card";
import axiosInstance from "@/utils/axiosInstance";
import { Notes } from "@/types/index";

export default function IndexPage() {
  const createNoteDisclosure = useDisclosure();
  const [notes, setNotes] = useState<Notes | null>(null);

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/all-notes");

      setNotes(response.data.notes);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllNotes();

    return () => {};
  }, []);

  return (
    <DefaultLayout>
      {/* Button to open CreateNoteModal */}
      <button
        className="fixed bottom-6 right-6 z-50 border-none"
        onClick={createNoteDisclosure.onOpen} // Open the modal
      >
        <IoIosAddCircleOutline className="text-4xl text-green-600 lg:text-6xl" />
      </button>

      {notes && notes?.length > 0 ? (
        <div className=" grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* {all notes} */}
          {notes?.map((note) => (
            <NotesCard key={note._id} getAllNotes={getAllNotes} note={note} />
          ))}
        </div>
      ) : (
        <div className=" flex items-center justify-center mt-[140px] text-center">
          <h3 className="text-2xl font-bold antialiased tracking-wide leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-[#D946EF] to-pink-500">
            Zero notes? Your career&apos;s as blank as your notepad!
          </h3>
        </div>
      )}

      {/* create post modal  */}
      <CreateNoteModal
        getAllNotes={getAllNotes}
        isOpen={createNoteDisclosure.isOpen}
        onClose={createNoteDisclosure.onClose}
      />
    </DefaultLayout>
  );
}
