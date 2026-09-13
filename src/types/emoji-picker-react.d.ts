declare module 'emoji-picker-react' {
  import React from 'react';

  interface EmojiClickData {
    emoji: string;
    unified: string;
    names: string[];
    activeSkinTone: string;
    unifiedWithoutSkinTone: string;
  }

  interface PickerProps {
    onEmojiClick?: (emojiData: EmojiClickData, event: MouseEvent) => void;
    [key: string]: any;
  }

  const EmojiPicker: React.FC<PickerProps>;
  export default EmojiPicker;
}
