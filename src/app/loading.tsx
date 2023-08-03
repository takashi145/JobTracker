export default function Loading() {
  return (
    <div className='z-50 fixed inset-0 bg-black/30 dark:bg-white/20'>
      <div className="flex justify-center items-center h-full" aria-label="読み込み中">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    </div>
  );
}