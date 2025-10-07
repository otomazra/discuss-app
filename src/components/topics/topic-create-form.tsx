'use client';
import type { JSX } from "react";
import {useActionState, startTransition} from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Input,
  Button,
  Textarea,
} from "@nextui-org/react";
import * as actions from "@/actions";

export default function TopicCreateForm(): JSX.Element {
  const [formState, action] = useActionState(actions.createTopic, {
    errors: {},
  });
  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(()=>{
      action(formData);
    });
  };

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button type="submit" color="primary">
          Create a Topic
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Topic</h3>
            <Input label="Name" labelPlacement="outside" placeholder="Name" />
            <Textarea
              label="Description"
              labelPlacement="outside"
              placeholder="Describe your topic"
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
