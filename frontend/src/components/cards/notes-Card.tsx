import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { useDisclosure } from "@nextui-org/modal";
import { RiEdit2Line } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

import DeleteNoteModal from "@/components/cards/deleteNoteModal";
import UpdateNoteModal from "@/components/cards/updateNoteModal";
import { Note } from "@/types";

export default function NotesCard({ note }: { note: Note }) {
  // Separate disclosures for each modal
  const updateNoteDisclosure = useDisclosure();
  const deleteNodeDisclosure = useDisclosure();

  return (
    <div className="">
      <Card className="shadow-lg border border-gray-600">
        <CardHeader>
          <h1>{note.title}</h1>
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
        isOpen={updateNoteDisclosure.isOpen}
        onClose={updateNoteDisclosure.onClose}
      />
      {/* Delete Modal */}
      <DeleteNoteModal
        isOpen={deleteNodeDisclosure.isOpen}
        onClose={deleteNodeDisclosure.onClose}
      />
    </div>
  );
}
