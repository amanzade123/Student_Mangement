// Remove accents and make lowercase
export function normalizeName(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

// Check if two strings are fuzzy match (allow 1 edit)
export function isFuzzyMatch(query, text) {
  const a = normalizeName(query);
  const b = normalizeName(text);

  if (a === b) return true;
  if (Math.abs(a.length - b.length) > 1) return false;

  let i = 0, j = 0, edits = 0;

  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i++; j++;
    } else {
      edits++;
      if (edits > 1) return false;
      if (a.length > b.length) i++;
      else if (a.length < b.length) j++;
      else { i++; j++; }
    }
  }

  if (i < a.length || j < b.length) edits++;

  return edits <= 1;
}
