"use server";
import { z } from "zod";
import type { Post } from "@prisma/client";
import { auth } from "@/auth";
import { db } from "@/db";
import {redirect} from "next/navigation";
import { revalidatePath } from "next/cache";
const createPostSchema = z.object({
  title: z
    .string()
    .min(4)
    .regex(/^[a-z-]+$/, {
      message: "Must be lowercase letters",
    }),
  content: z.string().min(10),
});

interface CreatePostFormState {
  errors: {
    title?: Array<string>;
    content?: Array<string>;
    _form?: Array<string>;
  };
}

export async function createPost(
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });
  if (!result.success) {
    console.log(result.error.flatten().fieldErrors);
    return { errors: result.error.flatten().fieldErrors };
  }

  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must be logged in to do this"],
      },
    };
  }

//   let post: Post;
//   try {
//     post = await db.post.create({
//       data: {
//         userId: session.user?.id as string,
//         title: result.data.title,
//         content: result.data.content,
//       },
//     });
//   } catch (error) {
//     if (error instanceof Error) {
//       return {
//         errors: {
//           _form: [error.message],
//         },
//       };
//     } else {
//       return {
//         errors: {
//           _form: ["Something went wrong"],
//         },
//       };
//     }
//   }
  
  return {
    errors: {}
  }

  // TODO: Revalidate the show topic page

}
