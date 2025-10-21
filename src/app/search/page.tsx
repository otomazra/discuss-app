
import {redirect} from "next/navigation";
import {fetchPostsBySearchTerm} from "@/db/queries/posts";
import PostList from "@/components/posts/post-list";
// import type{ PostWithData} from "@/db/queries/posts";

interface SearchPageProps {
    searchParams: Promise<{
        term: string;
    }>
};

export default async function SearchPage({searchParams}:SearchPageProps){
    // const term = (await searchParams).term
    const {term} = await searchParams;

    if(!term){
        redirect("/");
    }

    return (<div>
        {/* <PostList fetchData={():Promise<PostWithData[]>=>{return fetchPostsBySearchTerm(term)}} /> */}
        <PostList fetchData={()=>fetchPostsBySearchTerm(term)} />
    </div>)
}