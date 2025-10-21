import CommentShow from "@/components/comments/comment-show";
// import type { Comment } from "@prisma/client";
import { fetchCommentsByPostId } from "@/db/queries/comments";
// import {db} from '@/db';

interface CommentListProps {
//  fetchData: ()=>Promise<CommentWithAuthor[]>
 postId: string;
}

// TODO: Get a list of comments from somewhere
// export default async function CommentList({fetchData, postId}: CommentListProps) {
//   const comments = await fetchData();

export default async function CommentList({postId}:CommentListProps){

  const comments = await fetchCommentsByPostId(postId);

  const topLevelComments = comments?.filter(
    (comment) => comment.parentId === null
  );
  const renderedComments = topLevelComments.map((comment) => {
    return (
      <CommentShow
        key={comment.id}
        postId={postId}
        commentId={comment.id}
        // comments={comments}
      />
    );
  });

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">All {comments.length} comments</h1>
      {renderedComments}
    </div>
  );
}
