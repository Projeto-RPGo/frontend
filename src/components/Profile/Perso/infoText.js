// InfoText.js
export default function InfoText({
  label,
  value,
  labelColor = "text-gray-400",
  valueColor = "text-white",
}) {
  return (
    <div className="mb-2">
      <span className={`font-bold ${labelColor}`}>{label}:</span>{" "}
      <span className={valueColor}>{value || "N/A"}</span>
    </div>
  );
}
