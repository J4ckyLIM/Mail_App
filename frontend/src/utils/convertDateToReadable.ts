export const convertDateToReadable = (date: Date) => {
  const today = new Date();
  const isToday = date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();

  if(isToday) {
    return new Intl.DateTimeFormat('fr-FR', { hour: 'numeric', minute: 'numeric' }).format(date);
  } else {
    return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long' }).format(date);
  }
}