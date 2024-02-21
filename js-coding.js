function encodeChar(char, shift) {
  const baseCode = char === char.toUpperCase() ? 65 : 97;
  const charCode = char.charCodeAt(0);

  if (charCode >= baseCode && charCode < baseCode + 26) {
    const shiftedCode = ((charCode - baseCode + shift) % 26) + baseCode;
    return String.fromCharCode(shiftedCode);
  } else {
    return char;
  }
}

function movingShift(s, shift) {
  const encodedStr = s
    .split("")
    .map((char, ind) => encodeChar(char, shift + ind))
    .join("");

  const partLengths = Array.from(
    { length: 5 },
    (_, i) =>
      Math.ceil(encodedStr.length / 5) - (i < encodedStr.length % 5 ? 1 : 0)
  );

  const arr = [];
  let start = 0;

  for (const length of partLengths) {
    arr.push(encodedStr.slice(start, start + length));
    start += length;
  }

  return arr;
}

// Example usage:
const str = "I should";
const result = movingShift(str, 1);
console.log(result);
