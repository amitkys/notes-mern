import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

import axiosInstance from "@/utils/axiosInstance";

interface CreateNoteModalProps {
  isOpen: boolean;
  noteId: any;
  getAllNotes: () => void; // Add this prop
  onClose: (open: boolean) => void;
}

export default function DeleteNoteModal({
  isOpen,
  onClose,
  getAllNotes,
  noteId,
}: CreateNoteModalProps) {
  const navigate = useNavigate();

  // Track loading state
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true); // Set loading state to true
    try {
      const response = await axiosInstance.delete(`/delete-note/${noteId}`);

      if (response.status === 200 && response.data.error === false) {
        getAllNotes();
        onClose(false);
        navigate("/");
        toast.success("Notes deleted");
      }
    } catch (error: any) {
      if (error.response.data.error) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false); // Reset loading state after the request completes
    }
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
              Delete Notes
            </ModalHeader>
            <ModalBody>
              <p>Are you sure you want to delete this?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onPress={onClose}>
                Cancel
              </Button>
              <Button
              as={Link}
                color="primary"
                disabled={isLoading} // Disable the button while loading
                onClick={handleDelete}
              >
                {isLoading ? "Deleting..." : "Confirm"}{" "}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
