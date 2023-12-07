import { TemplateScreen } from "./TemplateScreen";

interface PageProps {
  params: {
    id: string;
  };
  searchParams: {
    client_id: string;
  };
}

export default function Page({ params, searchParams }: PageProps) {
  return (
    <>
      {params?.id}
      {searchParams?.client_id}
      <TemplateScreen
        isNew={params.id === "new"}
        planId={params.id}
        clientId={params.id}
      />
    </>
  );
}
