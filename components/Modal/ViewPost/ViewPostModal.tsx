import React from "react";
import { createPortal } from "react-dom";
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
  if (!open) return null;
  const container =
    typeof document === "undefined" ? null : document.getElementById(selector);

  return container
    ? createPortal(
        <div
          className={`${styles.modalBackdrop}`}
          onClick={() => {
            // close modal when outside of modal is clicked
            onClose();
          }}
        >
          <div
            className={`${styles.modalContent} border rounded-sm`}
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
        container,
      )
    : null;
};
