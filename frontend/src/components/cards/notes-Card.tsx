import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { useDisclosure } from "@nextui-org/modal";
import { RiEdit2Line } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

import DeleteNoteModal from "@/components/cards/deleteNoteModal";
import UpdateNoteModal from "@/components/cards/updateNoteModal";
import { RiPushpinLine } from "react-icons/ri";
import { RiPushpinFill } from "react-icons/ri";
import { Note } from "@/types";
import { useState } from "react";
import axios from "axios";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";

export default function NotesCard({
  note,
  getAllNotes,
}: {
  note: Note;
  getAllNotes: any;
}) {
  // Separate disclosures for each modal
  const updateNoteDisclosure = useDisclosure();
  const deleteNodeDisclosure = useDisclosure();
  const [isPinned, setisPinned] = useState(note.isPinned);
  const handlePin = async () => {
    try {
      const pinStatus = !isPinned;

      const response = await axiosInstance.put(
        `/update-note-ispinned/${note._id}`,
        {
          isPinned: pinStatus,
        },
      );

      if (response.status == 200 || response.data.error == false) {
        getAllNotes();
        if (isPinned) {
          toast.success("Unpinned");
        } else {
          toast.success("Pinned");
        }
      }
    } catch (error: any) {
      if (error.response.data.error) {
        toast.error("something went wrong");
      } else {
        toast.error("server issue while pinning notes");
      }
    }
  };

  return (
    <div className="">
      <Card className="shadow-lg border border-gray-600">
        <CardHeader className="flex flex-row justify-between">
          <h1>{note.title}</h1>
          <button onClick={handlePin}>
            {isPinned ? <RiPushpinFill /> : <RiPushpinLine />}
          </button>
        </CardHeader>
        <Divider />

        <CardBody>
          <p>{note.content}</p>
        </CardBody>
        <Divider />

        <CardFooter className="flex justify-end gap-x-1">
          <button
            className="bg-black rounded-full p-1 cursor-pointer"
            onClick={updateNoteDisclosure.onOpen}
          >
            <RiEdit2Line className="text-primary-500 text-xl" />
          </button>
          <button
            className="bg-black rounded-full p-1 cursor-pointer"
            onClick={deleteNodeDisclosure.onOpen}
          >
            <MdDelete className="text-red-500 text-xl" />
          </button>
        </CardFooter>
      </Card>

      {/* Edit Modal */}
      <UpdateNoteModal
        getAllNotes={getAllNotes}
        isOpen={updateNoteDisclosure.isOpen}
        note={note}
        onClose={updateNoteDisclosure.onClose}
      />
      {/* Delete Modal */}
      <DeleteNoteModal
        getAllNotes={getAllNotes} // main function to update latest notes
        isOpen={deleteNodeDisclosure.isOpen}
        noteId={note._id}
        onClose={deleteNodeDisclosure.onClose}
      />
    </div>
  );
}
