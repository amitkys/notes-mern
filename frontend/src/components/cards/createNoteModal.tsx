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
import { useState } from "react";

interface CreateNoteModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
}

export default function CreateNoteModal({
  isOpen,
  onClose,
}: CreateNoteModalProps) {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTagInput(value);

    // Add tag if a comma is entered
    if (value.endsWith(",")) {
      const newTag = value.slice(0, -1).trim();

      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput(""); // Clear the input field after adding the tag
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <Modal
      backdrop="blur"
      className="dark text-foreground bg-background shadow-lg shadow-gray-700/40 "
      isOpen={isOpen}
      onOpenChange={(open) => !open && onClose(open)}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Create Notes
            </ModalHeader>
            <ModalBody>
              <Form
                action=""
                id="create-notes-form"
                validationBehavior="native"
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
                  onClear={() => console.log("textarea cleared")}
                />
                <Input
                  label="Tags"
                  placeholder="comma separate"
                  value={tagInput}
                  variant="underlined"
                  onChange={handleTagChange}
                />
                <div className="flex gap-x-1 flex-shrink gap-y-1  flex-wrap">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#27272A] px-1 rounded-md flex items-center"
                    >
                      {tag}
                      <button
                        className="ml-1 text-red-500"
                        type="button"
                        onClick={() => removeTag(tag)}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
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
