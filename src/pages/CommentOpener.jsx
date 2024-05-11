import React, { useEffect, useState, useRef } from "react";
import Comment from "@/components/Comment";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { Button } from "@/components/ui/button";

function CommentOpener(props) {
  const [comment, setComment] = useState([]);
  const [inputFocus, setInputFocus] = useState(false);
  const [commentUpdater, setCommentUpdater] = useState(false);

  const commentRef = useRef(null);

  useEffect(() => {
    async function getComment() {
      const response = await axios.get(
        import.meta.env.VITE_COMMENT_URL + `/${props.videoId}`
      );
      console.log(response.data.message.comments);
      const commentData = response.data.message.comments;
      setComment(commentData);
    }
    getComment();
  }, [props.videoId, commentUpdater]);

  function addComment(e) {
    e.preventDefault();
    const postComment = async () => {
      console.log();
      const commentContent = commentRef.current?.value;
      const response = await axios.post(
        import.meta.env.VITE_COMMENT_URL + `/${props.videoId}`,
        {
          content: commentContent,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);

      commentRef.current.value = "";
      setCommentUpdater(!commentUpdater);
      setInputFocus(false);
    };
    postComment();
  }

  return (
    <>
      <form onSubmit={addComment}>
        <input
          type="text"
          ref={commentRef}
          onInput={() => setInputFocus(true)}
          onBlur={() => {
            if (commentRef.current.value == "") setInputFocus(false);
          }}
        />
        {inputFocus && <Button type="submit">Comment</Button>}
      </form>
      {comment &&
        comment.map((c) => (
          <Comment
            key={uuidv4()}
            comment={c.content}
            thumbnail={c.commentOwner.avatar}
            username={c.commentOwner.username}
            time={c.createdAt}
          />
        ))}
    </>
  );
}

export default CommentOpener;
