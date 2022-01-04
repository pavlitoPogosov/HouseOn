import React from 'react';

import { Accordion } from 'common/components/ui/Accordion/Accordion';
import { RichInput } from 'common/components/ui/RichInput/RichInput';

import { InstructionModalAccordion } from '../InstructionModal';

export interface InstuctionModalViewProps {
  accordions: InstructionModalAccordion[];
}

export const InstuctionModalView: React.FC<InstuctionModalViewProps> = ({ accordions }) => {
  return (
    <>
      {accordions.map((accord) => (
        <Accordion title={accord.title} key={accord.id}>
          <RichInput editorState={accord.content} onChange={() => ({})} editorProps={{ readOnly: true }} />
        </Accordion>
      ))}
    </>
  );
};
