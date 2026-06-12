type Props = {
  text: string;
  setText: (value: string) => void;
  handleSubmit: (e: React.SyntheticEvent) => void;
  sending: boolean;
  currentDate: string;
};

export default function JournalEditor({
  text,
  setText,
  handleSubmit,
  sending,
  currentDate,
}: Props) {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 rounded-xl border border-[#d8cdb8] m-4 p-4"
    >
      <span className="text-md font-instrument-serif">
        {currentDate}
      </span>

      <textarea
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
        placeholder="pour your heart out here..."
        rows={8}
        className="
          min-h-[350px]
          resize-none
          outline-none
          bg-white/10
          p-2
          font-instrument-serif
          text-lg
        "
      />

      <button
        type="submit"
        disabled={!text.trim() || sending}
        className="
          self-end
          rounded-lg
          px-6
          py-2
        "
      >
        {sending ? "Writing..." : "Write"}
      </button>
    </form>
  );
}