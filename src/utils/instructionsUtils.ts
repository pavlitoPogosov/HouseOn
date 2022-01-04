import { convertFromRaw, convertToRaw, EditorState, RawDraftContentState } from 'draft-js';

import { InstructionType } from 'graphql/types';

export const mapInstructionsToFormik = (instructions: InstructionType[] | undefined) => {
  if (!instructions) return [];

  return instructions
    .map((i) => {
      try {
        return {
          id: i.id,
          title: i.title,
          content: EditorState.createWithContent(
            convertFromRaw(JSON.parse(i.description as unknown as string) as RawDraftContentState)
          )
        };
      } catch {
        return null;
      }
    })
    .filter(Boolean) as { id: string; title: string; content: EditorState }[];
};

type MapFormikValuesProps = {
  items: { title: string; content: EditorState }[];
};

export const mapFormikValuesToInstructions = ({ items }: MapFormikValuesProps) => {
  return items
    .map((item) => {
      try {
        if (!item.content.getCurrentContent().hasText() || !item.title.trim()) {
          return null;
        }

        const itemDescription = JSON.stringify(convertToRaw(item.content.getCurrentContent()));

        return {
          title: item.title,
          description: itemDescription
        };
      } catch {
        return null;
      }
    })
    .filter(Boolean) as InstructionType[];
};
