import css from "./LayoutNotes.module.css";

interface FilterLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  modal: React.ReactNode;
}

export default function FilterLayout({
  children,
  sidebar,
  modal,
}: FilterLayoutProps) {
  return (
    <main>
      <div className={css.container}>
        <aside className={css.sidebar}>{sidebar}</aside>
        <section className={css.notesWrapper}>{children}</section>
      </div>
      {modal}
    </main>
  );
}
