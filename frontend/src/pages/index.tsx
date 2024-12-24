import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { MdDelete } from "react-icons/md";
import { Divider } from "@nextui-org/divider";
import { RiEdit2Line } from "react-icons/ri";
import { Button } from "@nextui-org/button";

import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  const [openModal, setOpenModal] = useState(null); // Track which modal is open

  const handleOpenModal = (modalId) => {
    setOpenModal(modalId); // Open the specific modal
  };

  const handleCloseModal = () => {
    setOpenModal(null); // Close any open modal
  };

  return (
    <DefaultLayout>
      <div className="grid grid-cols-3">
        <Card className="shadow-lg border border-gray-600">
          <CardHeader>
            <h1>this is heading</h1>
          </CardHeader>
          <Divider />

          <CardBody>
            <p>Make beautiful websites regardless of your design experience.</p>
          </CardBody>
          <Divider />

          <CardFooter className="flex justify-end gap-2">
            <button
              className="bg-black rounded-full p-1 cursor-pointer"
              onClick={() => handleOpenModal("edit")}
            >
              <RiEdit2Line className="text-primary-500 text-xl" />
            </button>
            <button
              className="bg-black rounded-full p-1 cursor-pointer"
              onClick={() => handleOpenModal("delete")}
            >
              <MdDelete className="text-red-500 text-xl" />
            </button>
          </CardFooter>
        </Card>

        {/* Edit Modal */}
        <Modal isOpen={openModal === "edit"} onOpenChange={handleCloseModal}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Edit Modal
                </ModalHeader>
                <ModalBody>
                  <p>Edit your content here.</p>
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
        <Modal isOpen={openModal === "delete"} onOpenChange={handleCloseModal}>
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
      </div>
    </DefaultLayout>
  );
}
