import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { getQueryClient } from "@/lib/queryClient";
import NotePreviewClient from "./NotePreview.client";

interface NotePreviewModalPageProps {
  params: Promise<{ id: string }>;
}

export default async function NotePreviewModalPage({
  params,
}: NotePreviewModalPageProps) {
  const { id } = await params;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient noteId={id} />
    </HydrationBoundary>
  );
}
