import { IoIosAddCircleOutline } from "react-icons/io";
import { useDisclosure } from "@nextui-org/modal";

import CreateNoteModal from "@/components/cards/createNoteModal";
import DefaultLayout from "@/layouts/default";
import NotesCard from "@/components/cards/notes-Card";

export default function IndexPage() {
  const createNoteDisclosure = useDisclosure();

  return (
    <DefaultLayout>
      {/* Button to open CreateNoteModal */}
      <button
        className="fixed bottom-6 right-6 z-50 border-none"
        onClick={createNoteDisclosure.onOpen} // Open the modal
      >
        <IoIosAddCircleOutline className="text-4xl text-green-600 lg:text-6xl" />
      </button>

      <div className=" grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* {all notes} */}
        <NotesCard />
        <NotesCard />
        <NotesCard />
        <NotesCard />
        <NotesCard />
        <NotesCard />
        <NotesCard />
        <NotesCard />
        <NotesCard />
        <NotesCard />
        <NotesCard />
        <NotesCard />
        <NotesCard />
        <NotesCard />
        <NotesCard />
        <NotesCard />
        <NotesCard />
        <NotesCard />
        <NotesCard />
        <NotesCard />
        <NotesCard />
        <NotesCard />
        <NotesCard />
        <NotesCard />
        <NotesCard />
        <NotesCard />
      </div>

      {/* create post modal  */}
      <CreateNoteModal
        isOpen={createNoteDisclosure.isOpen}
        onClose={createNoteDisclosure.onClose}
      />
    </DefaultLayout>
  );
}
