


export const transformToShortDate = (date:string)=> {
  return  new Date(date).toLocaleString([], {
    dateStyle: 'short',
    timeStyle: 'short',
  })
}
