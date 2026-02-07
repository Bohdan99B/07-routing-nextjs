"use client";

import { useParams, useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import NotePreview from "@/components/NotePreview/NotePreview";

export default function NotePreviewModalPage() {
  const router = useRouter();
  const params = useParams();
  const rawId = params?.id;
  const noteId = Array.isArray(rawId) ? rawId[0] : rawId;

  if (!noteId) {
    return null;
  }

  return (
    <Modal onClose={() => router.back()}>
      <NotePreview noteId={noteId} />
    </Modal>
  );
}
