"use server";
import { z } from "zod";
import { auth } from "@/auth";

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
  const session = await auth();
  const result = createTopicSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if(!session || !session.user){
    return {
        errors: {
            _form: ['You must be signed in to do this']
        }
    }
  }

  if (!result.success) {
    console.log(result.error.flatten().fieldErrors);
    return { errors: result.error.flatten().fieldErrors };
  }
  return {
    errors: {},
  };
  // TODO: revalidate the homepage
}
