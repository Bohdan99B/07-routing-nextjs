"use client";

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import type { NoteTag } from "@/types/note";
import css from "./NotesPage.module.css";

interface NotesClientProps {
  tag?: NoteTag;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", tag ?? "all", search, page],
    queryFn: () => fetchNotes({ search, page, perPage: 12, tag }),
    placeholderData: (prev) => prev,
    refetchOnMount: false,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const handleSearch = (value: string) => {
    setSearchInput(value);
    debouncedSetSearch(value);
  };

  const handleCloseModal = () => setIsModalOpen(false);
  const errorMessage =
    error instanceof Error ? error.message : "Something went wrong";

  return (
    <>
      <header className={css.toolbar}>
        <SearchBox value={searchInput} onChange={handleSearch} />
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading, please wait...</p>}
      {isError && <p>{errorMessage}</p>}
      {!isLoading && !isError && notes.length === 0 && <p>No notes found</p>}

      {notes.length > 0 && <NoteList notes={notes} />}

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onCancel={handleCloseModal} onSuccess={handleCloseModal} />
        </Modal>
      )}
    </>
  );
}
