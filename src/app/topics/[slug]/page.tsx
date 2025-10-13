import PostCreateForm from "@/components/posts/post-create-form";
import { db } from "@/db";
interface TopicShowPageProps {
    params: Promise<{
        slug :string,
    }>,
}

export default async function TopicShowPage({params}: TopicShowPageProps){
    const {slug} = await params;
    const topic = await db.topic.findFirst({
        where: {slug: slug}
    })

    const topicId: string = topic?.id as string;
    return <div className="grid grid-cols-4 gap-4 p-4">
        <div className="col-span-3">
            <h1 className="text-2xl font-bold mb-2">{slug}</h1>
        </div>

        <div>
            <PostCreateForm topicId={topicId}/>
        </div>
    </div>
}