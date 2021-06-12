import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import fetchSongs from "../queries/fetchSongs";

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

const SongCreate = (props) => {
  const [title, setTitle] = useState("");

  const [createTitle] = useMutation(mutation, {
    variables: {
      title,
    },
    refetchQueries: [{ query: fetchSongs }],
  });

  const onSubmit = (event) => {
    event.preventDefault();
    createTitle().then(() => {
      props.history.push("/");
    });
  };

  return (
    <div>
      <Link to="/">Back</Link>
      <h3>Create a Song</h3>
      <form onSubmit={onSubmit}>
        <label>Song title:</label>
        <input onChange={(e) => setTitle(e.target.value)} value={title}></input>
      </form>
    </div>
  );
};

export default SongCreate;
