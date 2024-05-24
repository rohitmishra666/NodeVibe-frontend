import React, { useEffect, useState, useRef } from "react";
import Comment from "@/components/VideoPlayer/Comment";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import comments from "@/utils/comment.utils";

function CommentOpener(props) {
  const [comment, setComment] = useState([]);
  const [inputFocus, setInputFocus] = useState(false);
  const [commentUpdater, setCommentUpdater] = useState(false);

  const userStatus = useSelector((state) => state.auth.status);

  const commentRef = useRef(null);

  useEffect(() => {

    async function getComment() {
      const response = await comments.getVideoComments({ videoId: props.videoId })
      const commentData = response.data.message.comments;
      console.log(commentData, 'commentData')
      setComment(commentData);
    }
    getComment();
  }, [props.videoId, commentUpdater]);

  function addComment(e) {

    e.preventDefault();
    const postComment = async () => {

      const commentContent = commentRef.current?.value;
      const response = await comments.addComment({ videoId: props.videoId, comment: commentContent });
      console.log(response, "response");
      commentRef.current.value = "";
      setCommentUpdater((prev) => !prev);
      setInputFocus(false);

    };
    postComment();
  }

  return (
    <>
      {userStatus && 
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
      </form>}
      {comment &&
        comment.map((c) => (
          <Comment
            key={uuidv4()}
            comment={c.content}
            thumbnail={c.commentOwner.avatar}
            username={c.commentOwner.username}
            time={c.createdAt}
            id={c._id}
            setCommentUpdater={setCommentUpdater}
          />
        ))}
    </>
  );
}

export default CommentOpener;
