"use client";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Input,
  Textarea,
} from "@nextui-org/react";
import { JSX, useActionState } from "react";
import * as actions from "@/actions";
import { startTransition } from "react";
import FormButton from "../common/form-button";

type topicId = {
  topicId: string;
};

export default function PostCreateForm({ topicId }: topicId): JSX.Element {
  const [formState, action, isPending] = useActionState(actions.createPost, {
    errors: {},
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }

  return (
    <Popover placement="left">
      <div className="flex gap-4 p-2">
        <PopoverTrigger>
          <Button color="primary">Create a Post</Button>
        </PopoverTrigger>
      </div>

      <PopoverContent className="">
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Post</h3>
            <Input
              name="title"
              placeholder="Title"
              label="Title"
              labelPlacement="outside"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(", ")}
            />
            <Textarea
              name="content"
              placeholder="Content"
              label="Post Content"
              labelPlacement="outside"
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(", ")}
            />
            {formState.errors._form ? (
              <div className="rounded bg-red-200 border border-red-200 p-2">{formState.errors._form.join(", ")}</div>
            ) : null}
            <FormButton isLoading={isPending}>Create Post</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
