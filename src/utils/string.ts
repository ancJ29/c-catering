export function randomPassword() {
  const specials = ["@", "#", "$", "%", "&"];
  const s = specials[Math.floor(Math.random() * 5)];
  const _r = (l: number) => Math.random().toString(36).slice(l);
  return `${_r(8)}${s}${_r(7)}`;
}

export function numberWithDelimiter(
  value: number,
  delimiter = ".",
  separator = ",",
) {
  const sign = value < 0 ? "-" : "";
  const _value = Math.abs(value);
  const int = Math.floor(_value);
  const sub = Math.round(1e5 * (_value - int)) / 1e5;
  const res = int
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
  return sub
    ? `${sign}${res}${separator}${sub.toString().slice(2)}`
    : `${sign}${res}`;
}

export function randomString() {
  return Math.random().toString(36).substring(2, 12);
}

export function encodeUri(str: string) {
  return encodeURIComponent(str.replace(/\s/g, "-"));
}

export function decodeUri(str: string) {
  return decodeURIComponent(toSpace(str));
}

export function fromSpace(str: string) {
  return str.replace(/\s/g, "-");
}

export function toSpace(str: string) {
  return str.replace(/-/g, " ");
}

export function getInitials(fullName: string) {
  const nameParts = fullName.split(" ");
  if (nameParts.length < 2) {
    return fullName;
  }

  const initials = nameParts.map((part) =>
    part.charAt(0).toUpperCase(),
  );
  return initials.join("");
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
