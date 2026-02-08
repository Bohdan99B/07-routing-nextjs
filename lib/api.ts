import axios from "axios";
import type { Note, NoteTag } from "@/types/note";

const API_URL =
  process.env.NEXT_PUBLIC_NOTEHUB_API_URL ??
  "https://notehub-public.goit.study/api/notes";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN ?? "";

const apiClient = axios.create({
  baseURL: API_URL,
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

export interface DeleteNoteResponse {
  id: string;
}

export async function fetchNotes(
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> {
  const response = await apiClient.get<FetchNotesResponse>("/", { params });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await apiClient.get<Note>(`/${id}`);
  return response.data;
}

export async function createNote(note: CreateNoteParams): Promise<Note> {
  const response = await apiClient.post<Note>("/", note);
  return response.data;
}

export async function deleteNote(id: string): Promise<DeleteNoteResponse> {
  const response = await apiClient.delete<DeleteNoteResponse>(`/${id}`);
  return response.data;
}
