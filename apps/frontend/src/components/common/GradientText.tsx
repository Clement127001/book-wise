const GradientText = ({ text }: { text: string }) => {
  return (
    <p className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 via-blue-700 to-cyan-500">
      {text}
    </p>
  );
};

export default GradientText;
