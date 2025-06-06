const CTAButton = ({ text }) => {
  return (
    <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-full transition">
      {text}
    </button>
  );
};
export default CTAButton;