import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import fetchSongs from "../queries/fetchSongs";

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      title
    }
  }
`;

const SongList = () => {
  const { data, loading } = useQuery(fetchSongs);
  const [deleteSong] = useMutation(mutation);

  const handleDelete = (id) => {
    deleteSong({
      variables: {
        id,
      },
      refetchQueries: [{ query: fetchSongs }],
    });
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <ul className="collection">
        {data.songs.map(({ id, title }) => (
          <li key={id} className="collection-item">
            <Link to={`/songs/${id}`}>{title}</Link>
            <i className="material-icons" onClick={() => handleDelete(id)}>
              delete
            </i>
          </li>
        ))}
      </ul>
      <Link to="/songs/create" className="btn-floating btn-large red right">
        <i className="material-icons">add</i>
      </Link>
    </div>
  );
};

export default SongList;
