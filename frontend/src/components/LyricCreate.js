import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const mutation = gql`
  mutation AddLyric($content: String, $songId: ID!) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

function LyricCreate({ songId }) {
  const [content, setContent] = useState("");
  const [addLyric] = useMutation(mutation, {
    variables: {
      content,
      songId,
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addLyric().then(() => setContent(""));
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>Add a lyric</label>
      <input onChange={(e) => setContent(e.target.value)} value={content} />
    </form>
  );
}

export default LyricCreate;
