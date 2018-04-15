function zip(...arrs) {
  const resultLength = Math.min(...arrs.map(a => a.length));
  return new Array(resultLength)
    .fill(0)
    .map((_, i) => arrs.map(a => a[i]));
}

function flatten(arr) {
  return Array.prototype.concat.apply([], arr);
}

exports.zip = zip;
exports.flatten = flatten;
