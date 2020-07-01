export const compressionParam = (url: string, x = 180, y = 180) =>
  url ? `${replaceHttp(url)}?param=${x}y${y}` : ''

export function replaceHttp(url: string) {
  return url.replace(/https?:/, '')
}
