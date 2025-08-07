import { toast } from 'react-hot-toast';

const defaultOptions = {
  duration: 4000,
  position: 'top-right' as const,
};

const toastMessage = {
  success: (message: string) => toast.success(message, defaultOptions),

  error: (message: string) => toast.error(message, defaultOptions),

  loading: (message: string) => toast.loading(message, defaultOptions),

  warning: (message: string) => {
    toast(message, {
      icon: '⚠️',
      ...defaultOptions,
    });
  },

  dismiss: (toastId?: string) => toast.dismiss(toastId),
};

export default toastMessage;
