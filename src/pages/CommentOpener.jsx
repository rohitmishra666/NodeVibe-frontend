import React, { useEffect, useState } from 'react'
import Comment from '@/components/Comment'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import { Button } from '@/components/ui/button';

function CommentOpener(props) {

  const [comment, setComment] = useState("")
  const [commentContent, setCommentContent] = useState("")
  const [inputFocus, setInputFocus] = useState(false)

  useEffect(() => {
    async function getComment() {
      const response = await axios.get(import.meta.env.VITE_COMMENT_URL + `/${props.videoId}`)
      const commentData = response.data.data.comment
      console.log(commentData)
      setComment(commentData)
    }
    getComment()
  }, [props.videoId, setComment])


  function addComment(commentContent) {
    async function postComment() {
      const response = await axios.post(import.meta.env.VITE_COMMENT_URL + `/${props.videoId}`, {
        comment: commentContent
      })
      const commentData = response.data.data.comment
      console.log(commentData)
      setComment((prev) => prev.concat(commentData))
      setCommentContent("")
    }
    postComment();
  }

  return (
    <>
      <input type="text" onSubmit={addComment} value={commentContent} onChange={(e) => {
        setCommentContent(e.target.value)
      }
      }
        onInput={() => setInputFocus(true)}
        onBlur={() => setInputFocus(false)}
      />
      {inputFocus && (<Button type="submit" onClick={addComment}>Comment</Button>)}
      {comment && comment.map((c) => (
        <Comment key={uuidv4()} comment={c} />
      ))}
    </>
  )
}

export default CommentOpener