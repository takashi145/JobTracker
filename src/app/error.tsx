"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="p-3">
      <h1 className="mb-2 dark:text-white">予期せぬエラーが発生しました。</h1>
      <button className="text-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 hover:dark:bg-blue-600 p-2 rounded" onClick={() => reset()}>Try again</button>
    </div>
  );
}