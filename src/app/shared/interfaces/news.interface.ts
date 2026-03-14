export interface News {
  id: number | string,
  title: string,
  description: string,
  text?: string,
  publishedDate: string,
  url?: string,
  fullUrl?: string,
  titleImageUrl: string,
  categoryType: string
}
