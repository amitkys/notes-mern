import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { useDisclosure } from "@nextui-org/modal";
import { MdDelete } from "react-icons/md";
import { Divider } from "@nextui-org/divider";
import { RiEdit2Line } from "react-icons/ri";
import { IoIosAddCircleOutline } from "react-icons/io";

import CreateNoteModal from "@/components/cards/createNoteModal";
import DeleteNoteModal from "@/components/cards/deleteNoteModal";
import UpdateNoteModal from "@/components/cards/updateNoteModal";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  // Separate disclosures for each modal
  const updateNoteDisclosure = useDisclosure();
  const deleteNodeDisclosure = useDisclosure();
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
      <div className="min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <Card className="shadow-lg border border-gray-600">
            <CardHeader>
              <h1>This is heading</h1>
            </CardHeader>
            <Divider />

            <CardBody>
              <p>
                Make beautiful websites regardless of your design experience.
              </p>
            </CardBody>
            <Divider />

            <CardFooter className="flex justify-end gap-2">
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

          {/* create post modal  */}
          <CreateNoteModal
            isOpen={createNoteDisclosure.isOpen}
            onClose={createNoteDisclosure.onClose}
          />
        </div>
      </div>
    </DefaultLayout>
  );
}
