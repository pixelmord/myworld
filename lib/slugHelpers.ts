export function slugify(str: string): string {
  return (
    str
      .trim()
      .toLowerCase()
      //replace invalid chars
      .replace(/[^a-z0-9 -]/g, '')
      // Collapse whitespace and replace by -
      .replace(/\s+/g, '-')
      // Collapse dashes
      .replace(/-+/g, '-')
  );
}
export function slugFromFilepath(path: string): string {
  const parts = path.split('/');
  return slugify(parts[parts.length - 1].split('.').slice(0, -1).join('.'));
}
