import React, { useEffect, useState, useRef } from "react";
import Comment from "@/components/VideoPlayer/Comment";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import comments from "@/utils/comment.utils";

function CommentOpener({ videoId }) {
  const [comment, setComment] = useState([]);
  const [inputFocus, setInputFocus] = useState(false);
  const [commentUpdater, setCommentUpdater] = useState(false);

  const userStatus = useSelector((state) => state.auth.status);
  const commentRef = useRef(null);

  useEffect(() => {
    async function getComment() {
      try {
        const response = await comments.getVideoComments({ videoId });
        const commentData = response.data.data.comments;
        setComment(commentData);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }
    getComment();
  }, [videoId, commentUpdater]);

  function addComment(e) {
    e.preventDefault();
    const postComment = async () => {
      try {
        const commentContent = commentRef.current?.value;
        await comments.addComment({ videoId, comment: commentContent });
        commentRef.current.value = "";
        setCommentUpdater((prev) => !prev);
        setInputFocus(false);
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    };
    postComment();
  }

  return (
    <div className="flex flex-col space-y-4">
      {userStatus && (
        <form onSubmit={addComment} className="flex flex-col">
          <div className="relative flex items-center">
            <input
              type="text"
              ref={commentRef}
              onInput={() => setInputFocus(true)}
              onBlur={() => {
                if (commentRef.current.value === "") setInputFocus(false);
              }}
              className={`px-2 w-full py-1 bg-transparent text-white border-b-2 ${inputFocus ? 'border-blue-500' : 'border-gray-300'} focus:outline-none`}
              placeholder="Add a comment..."
            />
            <Button type="submit" className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300">
              Add Comment
            </Button>
          </div>
        </form>
      )}
      <div className="ml-0">
        {comment.length > 0 ? (
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
          ))
        ) : (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
}

export default CommentOpener;
