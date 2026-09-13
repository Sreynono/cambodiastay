import { ref } from 'vue';

export interface DialogOptions {
  title?: string;
  message: string;
  type?: 'confirm' | 'danger' | 'warning' | 'info' | 'success';
  confirmText?: string;
  cancelText?: string;
}

const isOpen = ref(false);
const options = ref<DialogOptions>({ message: '' });
let currentResolve: ((value: boolean) => void) | null = null;

/**
 * Open a confirmation dialog modal in the middle of the screen.
 * Resolves to `true` if user clicked confirm, or `false` if user cancelled.
 */
export function showConfirm(opts: DialogOptions | string): Promise<boolean> {
  if (typeof opts === 'string') {
    options.value = {
      title: 'Please Confirm',
      message: opts,
      type: 'confirm',
      confirmText: 'Confirm',
      cancelText: 'Cancel',
    };
  } else {
    options.value = {
      title: opts.title || (opts.type === 'danger' ? 'Are you sure?' : 'Please Confirm'),
      message: opts.message,
      type: opts.type || 'confirm',
      confirmText: opts.confirmText || (opts.type === 'danger' ? 'Yes, Proceed' : 'Confirm'),
      cancelText: opts.cancelText || 'Cancel',
    };
  }
  isOpen.value = true;
  return new Promise<boolean>((resolve) => {
    currentResolve = resolve;
  });
}

/**
 * Open an alert/notification modal in the middle of the screen with a single action button.
 */
export function showAlert(opts: DialogOptions | string): Promise<boolean> {
  if (typeof opts === 'string') {
    options.value = {
      title: 'Notification',
      message: opts,
      type: 'info',
      confirmText: 'Got it',
      cancelText: '',
    };
  } else {
    options.value = {
      title:
        opts.title ||
        (opts.type === 'success'
          ? 'Success'
          : opts.type === 'danger'
          ? 'Notice'
          : 'Notification'),
      message: opts.message,
      type: opts.type || 'info',
      confirmText: opts.confirmText || 'Got it',
      cancelText: '',
    };
  }
  isOpen.value = true;
  return new Promise<boolean>((resolve) => {
    currentResolve = resolve;
  });
}

export function useConfirmDialog() {
  const onConfirm = () => {
    isOpen.value = false;
    if (currentResolve) {
      currentResolve(true);
      currentResolve = null;
    }
  };

  const onCancel = () => {
    isOpen.value = false;
    if (currentResolve) {
      currentResolve(false);
      currentResolve = null;
    }
  };

  return {
    isOpen,
    options,
    onConfirm,
    onCancel,
    showConfirm,
    showAlert,
  };
}
