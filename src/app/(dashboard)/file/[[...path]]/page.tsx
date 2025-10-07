// catch all in the browser params/segments. The dubble square brackets [[...path]] dont throw an error if
// file route is empty, without segment/params (http://localhost:3000/file, no error). Otherwise
// it ll throw an error

// p.s  When we run npm build, this is (Dynamic) server-rendered on demand = SSR (Server-Side Rendering) by default. thats because we have an
// unknow segment as params

export default async function File({
  params,
}: {
  params: Promise<{ path?: string[] }>;
}) {
  const { path } = await params;
  console.log(path); // array of params
  return (
    <div className="p-2">
      Path:{" "}
      {path?.map((item) => {
        return <p key={item}> {item} </p>;
      })}
    </div>
  );
}

// we could also use {path?.join('/')} inside the return.
