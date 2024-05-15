export default function Input({
  className,
  ...props
}: { className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      name="url"
      id="url"
      className="flex h-10 text-sm ring-offset-background w-full rounded-md border border-gray-300 bg-white px-10 py-3 text-gray-900 shadow-sm transition-colors focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500Wx"
    />
  );
}
