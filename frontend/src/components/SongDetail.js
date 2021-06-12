import React from "react";
import { useQuery } from "@apollo/client";
import fetchSong from "../queries/fetchSong";
import { Link } from "react-router-dom";
import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";

function SongDetail(props) {
  const songId = props.match.params.id;
  const { data, loading } = useQuery(fetchSong, {
    variables: {
      id: songId,
    },
  });
  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <Link to="/">Back</Link>
      <h3>{data.song.title}</h3>
      <LyricList lyrics={data.song.lyrics} />
      <LyricCreate songId={songId} />
    </div>
  );
}

export default SongDetail;
