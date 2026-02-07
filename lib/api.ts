import axios from "axios";
import type { Note, NoteTag } from "@/types/note";

const API_URL = "https://notehub-public.goit.study/api/notes";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const axiosInstance = axios.create({
  baseURL: API_URL,
  // Avoid Node proxy auto-resolution path that triggers url.parse deprecation warnings.
  proxy: false,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export interface FetchNotesParams {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: NoteTag;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  currentPage: number;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

export async function fetchNotes(
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> {
  const res = await axiosInstance.get<FetchNotesResponse>("/", { params });
  return res.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const res = await axiosInstance.get<Note>(`/${id}`);
  return res.data;
}

export async function createNote(note: CreateNoteParams): Promise<Note> {
  const res = await axiosInstance.post<Note>("/", note);
  return res.data;
}

export async function deleteNote(id: string): Promise<{ id: string }> {
  const res = await axiosInstance.delete<{ id: string }>(`/${id}`);
  return res.data;
}
