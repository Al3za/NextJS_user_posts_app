// Dinamic route file.
// we can catch just one segment the first one we put in blog/1222.
// we catch just(1222). To see how to catch many params like blog/1222/jfjfj (1222/jfjfj) check the
// dashboard/file [...path]/page.tsx

// p.s  When we run npm build, this is (Dynamic) server-rendered on demand = SSR (Server-Side Rendering) by default. thats because we have an
// unknow segment as params
export default async function SingleBlog({
  params,
}: {
  params: Promise<{ id: string }>; // id:string (the TS type of the params)
}) {
  const { id } = await params; // destructure id. Its async because the params cames from the browser
  return <div className="p-2">Post: {id}</div>;
}
