import { useQuery } from "@tanstack/react-query";
import { PostWithAuthor } from "~/db/schema";
import { Card } from "~/components/Card";
import { List } from "~/components/List";
import { Header } from "~/components/Header";

const Home = () => {
  const { isLoading, error, data } = useQuery<PostWithAuthor[]>({
    queryKey: ["posts"],
    queryFn: () => fetch("/api/posts").then((r) => r.json()),
  });

  if (isLoading || error || !data) {
    return null;
  }

  return (
    <div>
      <Header style={{ height: 300 }} />
      <List style={{ marginTop: -200 }}>
        {data.map((post) => {
          return (
            <Card key={post.id} title={post.author.name ?? ""}>
              {post.content}
            </Card>
          );
        })}
      </List>
    </div>
  );
};

export default Home;
