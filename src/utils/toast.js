import toast from 'react-hot-toast';

export const errToast = message => {
  toast.error(`${message}`, {
    duration: 4000,
    position: 'top-right',
    style: {
      borderRadius: '12px',
      background: 'var(--bg-contrast)',
      color: 'var(--text-color)',
      border: '1px solid #d32f2f',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
      padding: '12px 16px',
    },
    icon: '🚩',
  });
};

export const successfullyToast = message => {
  toast.success(`${message}`, {
    duration: 4000,
    position: 'top-right',
    style: {
      borderRadius: '12px',
      background: 'var(--bg-contrast)',
      color: 'var(--text-color)',
      border: '1px solid var(--component-blue)',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
      padding: '12px 16px',
    },
    icon: '✅',
  });
};
