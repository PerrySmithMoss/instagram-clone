import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../../../context/AuthContext";
import styles from "./ViewPost.module.css";

interface IViewPostModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  selector: string;
}

export const ViewPostModal: React.FC<IViewPostModalProps> = ({
  children,
  open,
  onClose,
  selector,
}) => {
  const ref = useRef<any>(null);

  const [mounted, setMounted] = useState(false);

  const [selectedFile, setSelectedFile] = useState<
    string | ArrayBuffer | null | undefined
  >(null);

  useEffect(() => {
    ref.current = document.querySelector(`#${selector}`);
    setMounted(true);
  }, [selector]);

  if (!open) return null;

  return mounted
    ? createPortal(
        <div
          className={`${styles.modalBackdrop}`}
          onClick={() => {
            // close modal when outside of modal is clicked
            onClose();
          }}
        >
          <div
            className={`${styles.modalContent} border rounded`}
            onClick={(e) => {
              // do not close modal if anything inside modal content is clicked
              e.stopPropagation();
            }}
          >
            <div
              onClick={(e) => {
                // do not close modal if anything inside modal content is clicked
                e.stopPropagation();
              }}
            >
              {children}
            </div>
          </div>
        </div>,
        ref.current
      )
    : null;
};
