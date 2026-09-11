/** Public URLs need the repository prefix on GitHub Pages, but not on Sites. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function assetPath(path: string) {
  return path.startsWith('/') && !path.startsWith('//') ? `${basePath}${path}` : path;
}

export function pagePath(path: string) {
  const [pathname, hash] = path.split('#');
  const normalized = basePath && !pathname.endsWith('/') ? `${pathname}/` : pathname;
  return `${assetPath(normalized)}${hash === undefined ? '' : `#${hash}`}`;
}
