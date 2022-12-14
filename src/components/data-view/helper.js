export const spanSize = function (arr, i, j) {
  let x;
  if (i !== 0) {
    let asc,
      end;
    let noDraw = true;
    for (x = 0, end = j, asc = end >= 0; asc
      ? x <= end
      : x >= end; asc
      ? x++
      : x--) {
      if (arr[i - 1][x] !== arr[i][x]) {
        noDraw = false;
      }
    }
    if (noDraw) {
      return -1;
    }
  }
  let len = 0;
  while (i + len < arr.length) {
    let asc1,
      end1;
    let stop = false;
    for (x = 0, end1 = j, asc1 = end1 >= 0; asc1
      ? x <= end1
      : x >= end1; asc1
      ? x++
      : x--) {
      if (arr[i][x] !== arr[i + len][x]) {
        stop = true;
      }
    }
    if (stop) {
      break;
    }
    len++;
  }
  return len;
};

export function getComparator(type, column) {
  const key = column.toLowerCase();

  if (type === "string") {
    return (a, b) => a[key].localeCompare(b[key]);
  }
  if (type === "number") {
    return (a, b) => a[key] - b[key];
  }
  if (type === "object") {
    return (a, b) => a[key] - b[key];
  }
}

export function formatDate(value) {
  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(value);
}
