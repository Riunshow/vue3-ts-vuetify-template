const title = 'UdigWIn'

export default function getPageTitle (pageTitle: string): string {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
