import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import styles from './Overlay.module.css';

interface BlurredOverlayProps {
  isOpenOverlay: boolean;
  onClose: () => void;
  text?: string;
}

export function Overlay({
  isOpenOverlay,
  onClose,
  text = 'This is an overlay example',
}: BlurredOverlayProps) {
  useEffect(() => {
    if (!isOpenOverlay) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpenOverlay, onClose]);

  if (!isOpenOverlay) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <button
        type="button"
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Close overlay"
        title="Close"
      >
        <X size={20} />
      </button>

      <p className={styles.centerText}>{text}</p>
    </div>
  );
}
