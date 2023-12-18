"use client";
import { useEffect, useState } from "react";
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import "react-mde/lib/styles/css/react-mde-all.css";

type SelectedTabProps = "write" | "preview" | undefined;

type MarkdownEditorProps = {
  content?: string;
  onChange?: (value: string) => void;
};

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
export const MarkdownEditor = ({ content, onChange }: MarkdownEditorProps) => {
  const [markdownValue, setMarkdownValue] = useState(content ?? "");
  const debouncedvalue = useDebounce(markdownValue, 5000);

  useEffect(() => {
    console.log(debouncedvalue);
  }, [debouncedvalue]);

  const handleChange = (value: string) => {
    setMarkdownValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  const [selectedTab, setSelectedTab] = useState<SelectedTabProps>("write");

  return (
    <div>
      <ReactMde
        value={markdownValue}
        onChange={handleChange}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(<ReactMarkdown>{markdown}</ReactMarkdown>)
        }
      />
    </div>
  );
};
