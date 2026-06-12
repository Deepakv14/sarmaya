import { DiaryEntry } from "../lib/storage";

type Props = {
  entries: DiaryEntry[];
  expandedId: string | null;
  setExpandedId: (
    id: string | null
  ) => void;
  handleDeleteAll: () => void;
};

export default function EntryHistory({
  entries,
  expandedId,
  setExpandedId,
  handleDeleteAll,
}: Props) {
  return (
    <div className="flex flex-col gap-6 m-4 justify-between items-center text-center">

      <div className="flex">
        <h2>
          ✦ Recent Entries ✦
        </h2>

        <button
          onClick={handleDeleteAll}
          className="text-red-500 px-4"
        >
          Clear All
        </button>
      </div>

      {entries.map((entry) => {
        const isExpanded =
          expandedId === entry.id;

        return (
          <button
            key={entry.id}
            onClick={() =>
              setExpandedId(
                isExpanded
                  ? null
                  : entry.id
              )
            }
            className="
              rounded-xl
              border
              p-5
              text-left
            "
          >
            <div className="flex justify-between">
              <span>
                📖{" "}
                {new Date(
                  entry.timestamp
                ).toLocaleDateString()}
              </span>

              <span>
                {isExpanded
                  ? "▲"
                  : "▼"}
              </span>
            </div>

            {isExpanded && (
              <div className="mt-4">
                <p>
                  {entry.userMessage}
                </p>

                {entry.reply && (
                  <p className="italic mt-4">
                    {
                      entry.reply
                        .message
                    }
                  </p>
                )}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}