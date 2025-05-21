"use client";
import styles from "./page.module.css";
import TagInput from "@/components/TagInput/TagInput";
import { useState } from "react";

export default function Home() {
  const [tags, setTags] = useState<string[]>(["Tag 1", "Tag 2", "Tag 3"]);

  const handleTagsChange = (newTags: string[]) => {
    setTags(newTags);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div style={{ margin: "40px", width: "100%", maxWidth: "600px" }}>
          <h2 style={{ marginBottom: "16px", textAlign: "center" }}>
            Reusable Tag Input Component
          </h2>
          <TagInput
            tags={tags}
            onChange={handleTagsChange}
            placeholder="Add tags..."
            maxTags={7}
            // allowDuplicates
            // seperator={['Enter', ',', 'Tab']}
          />
          <div style={{ marginTop: "16px", fontSize: "0.9em", color: "#555" }}>
            <strong>Current Tag:</strong>{" "}
            {tags.length > 0 ? tags.join(", ") : "No tags."}
          </div>
        </div>
      </main>
    </div>
  );
}
