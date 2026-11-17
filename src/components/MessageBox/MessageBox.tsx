import React, { useEffect } from 'react';
import {
  X,
  Info,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
} from 'lucide-react';
import styles from './MessageBox.module.css';

export type MessageBoxVariant = 'info' | 'success' | 'warning' | 'error';

interface MessageBoxProps {
  isOpen: boolean;
  title: string;
  message: string;
  variant?: MessageBoxVariant;
  confirmText?: string;
  cancelText?: string;
  onClose: () => void;
  onConfirm?: () => void;
  closeOnOverlayClick?: boolean;
}

export function MessageBox({
  isOpen,
  title,
  message,
  variant = 'info',
  confirmText = 'OK',
  cancelText,
  onClose,
  onConfirm,
  closeOnOverlayClick = true,
}: MessageBoxProps) {
  // Close on Escape key & lock background scroll while open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const renderIcon = () => {
    switch (variant) {
      case 'success':
        return (
          <div className={`${styles.iconBadge} ${styles.successIcon}`}>
            <CheckCircle2 size={22} />
          </div>
        );
      case 'warning':
        return (
          <div className={`${styles.iconBadge} ${styles.warningIcon}`}>
            <AlertTriangle size={22} />
          </div>
        );
      case 'error':
        return (
          <div className={`${styles.iconBadge} ${styles.errorIcon}`}>
            <AlertCircle size={22} />
          </div>
        );
      default:
        return (
          <div className={`${styles.iconBadge} ${styles.infoIcon}`}>
            <Info size={22} />
          </div>
        );
    }
  };

  return (
    <div
      className={styles.overlay}
      onClick={closeOnOverlayClick ? onClose : undefined}
      role="dialog"
      aria-modal="true"
      aria-labelledby="msgbox-title"
      aria-describedby="msgbox-desc"
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the box
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close message box"
          title="Close"
        >
          <X size={18} />
        </button>

        <div className={styles.header}>
          {renderIcon()}
          <div>
            <h2 id="msgbox-title" className={styles.title}>
              {title}
            </h2>
            <p id="msgbox-desc" className={styles.message}>
              {message}
            </p>
          </div>
        </div>

        <div className={styles.footer}>
          {cancelText && (
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={onClose}
            >
              {cancelText}
            </button>
          )}
          <button
            type="button"
            className={`${styles.primaryButton} ${
              variant === 'error' ? styles.dangerButton : ''
            }`}
            onClick={() => {
              onConfirm?.();
              onClose();
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
