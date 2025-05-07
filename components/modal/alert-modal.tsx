'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import LoadingButton from '../customui/LoadingButton';
import { useTranslations } from 'next-intl';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const t = useTranslations('dashboard');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={t('alertModal.title')}
      description={t('alertModal.description')}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          {t('alertModal.cancel')}
        </Button>
        <LoadingButton
          loading={loading}
          variant="destructive"
          onClick={onConfirm}
        >
          {t('alertModal.continue')}
        </LoadingButton>
      </div>
    </Modal>
  );
};
