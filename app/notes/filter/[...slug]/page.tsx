import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import NotesClient from "@/app/notes/Notes.client";
import { fetchNotes } from "@/lib/api";
import { getQueryClient } from "@/lib/queryClient";
import { NOTE_TAGS, type NoteTag } from "@/types/note";

interface FilterNotesPageProps {
  params: Promise<{ slug: string[] }>;
}

function resolveTag(slug: string[]): NoteTag | undefined {
  if (slug.length !== 1) {
    notFound();
  }

  const rawTag = decodeURIComponent(slug[0]);

  if (rawTag === "all") {
    return undefined;
  }

  if (!NOTE_TAGS.includes(rawTag as NoteTag)) {
    notFound();
  }

  return rawTag as NoteTag;
}

export default async function FilterNotesPage({ params }: FilterNotesPageProps) {
  const { slug } = await params;
  const tag = resolveTag(slug);
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag ?? "all", "", 1],
    queryFn: () => fetchNotes({ search: "", page: 1, perPage: 12, tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
