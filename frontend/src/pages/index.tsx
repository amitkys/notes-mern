import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { MdDelete } from "react-icons/md";
import { Divider } from "@nextui-org/divider";
import { RiEdit2Line } from "react-icons/ri";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Button } from "@nextui-org/button";

import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  // Separate disclosures for each modal
  const editDisclosure = useDisclosure();
  const deleteDisclosure = useDisclosure();
  const postDisclosure = useDisclosure();

  return (
    <DefaultLayout>
      <button
        className="fixed bottom-6 right-6 z-50"
        onClick={postDisclosure.onOpen}
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
                onClick={editDisclosure.onOpen}
              >
                <RiEdit2Line className="text-primary-500 text-xl" />
              </button>
              <button
                className="bg-black rounded-full p-1 cursor-pointer"
                onClick={deleteDisclosure.onOpen}
              >
                <MdDelete className="text-red-500 text-xl" />
              </button>
            </CardFooter>
          </Card>

          {/* Edit Modal */}
          <Modal
            isOpen={editDisclosure.isOpen}
            // placement="center"
            onOpenChange={editDisclosure.onOpenChange}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Edit Notes
                  </ModalHeader>
                  <ModalBody>
                    <p>hellow</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Save
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>

          {/* Delete Modal */}
          <Modal
            isOpen={deleteDisclosure.isOpen}
            onOpenChange={deleteDisclosure.onOpenChange}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Delete Modal
                  </ModalHeader>
                  <ModalBody>
                    <p>Are you sure you want to delete this?</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Confirm
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>

          {/* create post modal  */}
          <Modal
            isOpen={postDisclosure.isOpen}
            onOpenChange={postDisclosure.onOpenChange}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Create Notes
                  </ModalHeader>
                  <ModalBody>
                    <p>Are you sure you want to delete this?</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Confirm
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>
    </DefaultLayout>
  );
}
