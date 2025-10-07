"use server";
import { z } from "zod";
import { auth } from "@/auth";
import type {Topic} from "@prisma/client";
import {redirect} from "next/navigation";
import {db} from "@/db";
import paths from "@/paths";
import {revalidatePath} from "next/cache";

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message:
        "Must be lowercase, without numbers and special signs except dash",
    }),
  description: z.string().min(10),
});

interface CreateTopicFormState {
  errors: {
    name?: Array<string>;
    description?: Array<string>;
    _form?: Array<string>;
  };
}

export async function createTopic(
  formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
    const result = createTopicSchema.safeParse({
        name: formData.get("name"),
        description: formData.get("description"),
    });
    
    if (!result.success) {
      console.log(result.error.flatten().fieldErrors);
      return { errors: result.error.flatten().fieldErrors };
    }
    
    const session = await auth();
  if(!session || !session.user){
    return {
        errors: {
            _form: ['You must be signed in to do this']
        }
    }
  }

  let topic: Topic;
  try{
    topic = await db.topic.create({
        data: {
            slug: result.data.name,
            description: result.data.description,
        },
    });
  }catch(err: unknown){
    if(err instanceof Error){
        return {
            errors: {
                _form: [err.message],
            },
        }
    }else {
        return {
            errors: {
                _form: ["Something went wrong"],
            },
        }
    }
  }

  // TODO: revalidate the homepage
  revalidatePath('/');
  redirect(paths.topicShow(topic.slug));
}
