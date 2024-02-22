

export function fromISOSToReadable  (dateString: string){
  const date = new Date(dateString);

  const options = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };

  // @ts-ignore
  return  date.toLocaleString('en-US', options);
}
