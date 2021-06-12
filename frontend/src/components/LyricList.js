import React from "react";
import { useMutation, gql } from "@apollo/client";

const mutation = gql`
  mutation LikeLyric($id: ID!) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

function LyricList({ lyrics }) {
  const [likeLyric] = useMutation(mutation);
  const onLike = (id, likes) => {
    likeLyric({
      variables: {
        id,
      },
      optimisticResponse: {
        __typename: "Mutation",
        likeLyric: {
          id,
          likes: likes + 1,
          __typename: "LyricType",
        },
      },
    });
  };

  const renderLyrics = () => {
    return lyrics.map(({ id, content, likes }) => (
      <li className="collection-item" key={id}>
        {content}
        <div className="vote-box">
          <i className="material-icons" onClick={() => onLike(id, likes)}>
            thumb_up
          </i>
          {likes}
        </div>
      </li>
    ));
  };
  return <ul className="collection">{renderLyrics()}</ul>;
}

export default LyricList;
