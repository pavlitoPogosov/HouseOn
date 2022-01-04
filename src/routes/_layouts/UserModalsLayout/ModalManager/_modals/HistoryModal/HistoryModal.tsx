import React from 'react';

import { ColorfulIconTypes } from 'common/components/ui/ColorfulIcon/ColorfulIcon';
import { Dialog } from 'common/components/ui/Dialog/Dialog';
import { HistoryBlock } from 'common/components/ui/HistoryBlock/HistoryBlock';

export interface HistoryModalProps {
  onClose: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({ onClose }) => {
  return (
    <Dialog isOpen icon={ColorfulIconTypes.HISTORY} title="History" onClose={onClose}>
      <HistoryBlock />
    </Dialog>
  );
};
