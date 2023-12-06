import { Main } from "./Main";

export default function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { client_id: string };
}) {
  return <Main id={params.id} />;
}
