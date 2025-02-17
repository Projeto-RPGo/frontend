export default function InputField(props) {
  return (
    <input
      {...props}
      className="w-full pl-10 pr-4 py-3 text-white bg-transparent border border-white rounded-full placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
    />
  );
}