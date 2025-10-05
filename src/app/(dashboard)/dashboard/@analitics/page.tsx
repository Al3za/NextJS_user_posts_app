// We cannot navigate to slot @analitics to render this folder page, but we can add the folder name
// in dashboard/layout.tsx, so when we visit route dashboard, the @analitics page.tsx will be shown as well

export default function Analitics() {
  return <div className="bg-lime-600 p-2">Analitics slot</div>;
}
