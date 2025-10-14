"use server";
import { z } from "zod";
import type { Post } from "@prisma/client";
import { auth } from "@/auth";
import { db } from "@/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import paths from "@/paths";
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
  slug: string,
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
  if (!session || !session.user || !session.user?.id) {
    return {
      errors: {
        _form: ["You must be logged in to do this"],
      },
    };
  }

  const topic = await db.topic.findFirst({
    where: { slug: slug },
  });
  if (!topic) {
    return {
      errors: {
        _form: ["Topic was not found"],
      },
    };
  }

  let post: Post;
  try {
    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user?.id,
        topicId: topic.id,
      }
    })
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Post was not created"],
        },
      };
    }
  }
  console.log(post.id);

  revalidatePath(paths.topicShow(slug));
  redirect(paths.postShow(slug, post.id));
  // TODO: Revalidate the show topic page
}
