import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Input, Textarea } from "@nextui-org/input";
import { Form } from "@nextui-org/form";
import { Button } from "@nextui-org/button";

interface CreateNoteModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
}

export default function UpdateNoteModal({
  isOpen,
  onClose,
}: CreateNoteModalProps) {
  return (
    <Modal
      backdrop="blur"
      className="dark text-foreground bg-background shadow-lg shadow-gray-700/40 "
      isOpen={isOpen}
      onOpenChange={(open) => !open && onClose(open)}
      // placement="center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Update notes
            </ModalHeader>
            <ModalBody>
              <Form
                action=""
                id="create-notes-form"
                validationBehavior="native"
                // onSubmit={(e) => {
                //   e.preventDefault();
                //   // Handle form submission logic here
                //   onClose(); // Close the modal after submission
                // }}
              >
                <Input
                  isRequired
                  errorMessage="Title is required"
                  label="Title"
                  labelPlacement="outside"
                  variant="bordered"
                />
                <Textarea
                  isClearable
                  isRequired
                  errorMessage="write any description"
                  label="Description"
                  variant="underlined"
                  // eslint-disable-next-line no-console
                  onClear={() => console.log("textarea cleared")}
                />
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" form="create-notes-form" type="submit">
                Confirm
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
