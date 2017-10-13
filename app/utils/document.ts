export function getElementsByIds(idOrIds: string | string[], ...rest: string[]): HTMLElement[] {
  const ids = idOrIds instanceof Array ? idOrIds : [idOrIds].concat(rest)

  return ids
    .map(id => document.getElementById(id))
    .filter(element => element !== null) as HTMLElement[]
}
