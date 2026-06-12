import { DiaryEntry } from "../lib/storage";

type Props = {
  entry?: DiaryEntry;
};

export default function LatestReflection({
  entry,
}: Props) {
  if (!entry) return null;

  return (
    <div className="rounded-xl border border-[#d8cdb8] p-4 m-4 ">
      <div className="flex flex-col gap-4">

        <div>
          <span className="text-xs">
            Me
          </span>

          <p>{entry.userMessage}</p>
        </div>

        {entry.reply && (
          <div className="border-t pt-3">
            <span className="text-xs">
              Sarmaya
            </span>

            <p className="italic">
              {entry.reply.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}