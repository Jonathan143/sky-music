export const compressionParam = (url: string, x = 180, y = 180) =>
  url ? `${url.replace(/https?:/, '')}?param=${x}y${y}` : ''
