export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;

  return text.substring(0, maxLength - 3) + "...";
}

export function capAndTrim(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .trim();
}
