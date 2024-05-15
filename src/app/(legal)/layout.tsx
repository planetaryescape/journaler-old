export default function LegalPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-8 px-28 prose-lg prose-stone dark:prose-invert">
      {children}
    </div>
  );
}
