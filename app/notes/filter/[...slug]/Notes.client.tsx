"use client";

import SharedNotesClient from "@/app/notes/Notes.client";
import type { NoteTag } from "@/types/note";

interface NotesClientProps {
  tag?: NoteTag;
}

export default function NotesClient({ tag }: NotesClientProps) {
  return <SharedNotesClient tag={tag} />;
}
