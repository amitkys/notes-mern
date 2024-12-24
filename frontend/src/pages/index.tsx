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
import { Button } from "@nextui-org/button";

import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
              onClick={onOpen}
            >
              <RiEdit2Line className="text-primary-500 text-xl" />
            </button>
            <button className="bg-black rounded-full p-1 cursor-pointer">
              <MdDelete className="text-red-500 text-xl" />
            </button>
          </CardFooter>
        </Card>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Modal Title
                </ModalHeader>
                <ModalBody>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam pulvinar risus non risus hendrerit venenatis.
                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Action
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
