import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import {  Modal,  ModalContent,  ModalHeader,  ModalBody,  ModalFooter, useDisclosure} from "@nextui-org/modal";
import { MdDelete } from "react-icons/md";
import { Divider } from "@nextui-org/divider";
import { RiEdit2Line } from "react-icons/ri";

import DefaultLayout from "@/layouts/default";
import { Button } from "@nextui-org/button";

export default function IndexPage() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

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
            <button className="bg-black rounded-full p-1 cursor-pointer">
              <RiEdit2Line className="text-primary-500 text-xl" />
            </button>
            <button className="bg-black rounded-full p-1 cursor-pointer">
              <MdDelete className="text-red-500 text-xl" />
            </button>
          </CardFooter>
        </Card>
      </div>
    </DefaultLayout>
  );
}
