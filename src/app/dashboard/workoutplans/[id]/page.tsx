export default function Page({ params, searchParams }: any) {
  return (
    <>
      {params?.id}
      {searchParams?.client_id}
    </>
  );
}
