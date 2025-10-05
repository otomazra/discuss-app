import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Input,
  Button,
  Textarea,
} from "@nextui-org/react";
import * as actions from "@/actions";

export default function TopicCreateForm() {
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button type="submit" color="primary">
          Create a Topic
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={actions.createTopic}>
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
