import React, { useEffect } from 'react';
import { Mention, MentionsInput } from 'react-mentions';

import s from './style.module.scss';

const mentionsInputStyle = {
  control: {
    backgroundColor: '#FAFAFA',
    fontSize: 15,
  },

  '&multiLine': {
    control: {
      minHeight: 60,
    },
    highlighter: {
      padding: 16,
      border: '1px solid transparent',
    },
    input: {
      padding: 16,
      border: '1px solid silver',
    },
  },

  '&singleLine': {
    display: 'inline-block',

    highlighter: {
      padding: 1,
      border: '2px inset transparent',
    },
    input: {
      padding: 16,
      border: '2px inset',
    },
  },

  suggestions: {
    list: {
      backgroundColor: 'white',
      border: '1px solid rgba(0,0,0,0.15)',
      fontSize: 15,
    },
    item: {
      color: '#ffffff',
      padding: '5px 15px',
      borderBottom: '1px solid rgba(0,0,0,0.15)',
      '&focused': {
        backgroundColor: '#0146F4',
      },
    },
  },
};

const mentionStyle = {
  color: '#0146F4',
};

interface IMentionInputProps {
  placeholder?: string;
  userData: {
    id: string;
    display: string;
  };
  value: string;
  onChange: (value: string) => void;
}

const MentionInput = ({
  value,
  onChange,
  placeholder,
  userData,
}: IMentionInputProps) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.click();
    }
  }, [textareaRef]);

  const handleChange = (event: { target: { value: string } }) => {
    onChange(event.target.value);
  };

  return (
    <div className={s.mentionInput}>
      <MentionsInput
        inputRef={textareaRef}
        value={value}
        onChange={handleChange}
        style={mentionsInputStyle}
        placeholder={placeholder}
      >
        <Mention
          className={s.mentionInput_mention}
          trigger="@"
          data={[userData]}
          style={mentionStyle}
          displayTransform={(_, display) => `@${display}`}
        />
      </MentionsInput>
    </div>
  );
};
export default MentionInput;
