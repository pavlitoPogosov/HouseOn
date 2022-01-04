export const moveInputCaretToEnd = ({ currentTarget }: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  currentTarget.setSelectionRange(currentTarget.value.length, currentTarget.value.length);
};
