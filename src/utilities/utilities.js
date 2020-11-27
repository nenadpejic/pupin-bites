export const paginate = (fullArray) => {
  const itemsPerPage = 4;
  const numberOfPages = Math.ceil(fullArray.length / itemsPerPage);
  const paginatedArray = Array.from({ length: numberOfPages }, (_, idx) => {
    const start = idx * itemsPerPage;
    return fullArray.slice(start, start + itemsPerPage);
  });

  return paginatedArray;
};

//Funkcija za format datuma i vremena
export const formatDate = (string) => {
  const date = new Date(string);
  // let year = date.getFullYear();
  // let month = date.getMonth();
  // let day = date.getDate().toString();
  let hours = date.getHours().toString();
  let minutes = date.getMinutes().toString();
  let seconds = date.getSeconds().toString();
  // const monthNames = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];

  return `${hours.padStart(2, "0")}:${minutes.padStart(
    2,
    "0"
  )}:${seconds.padStart(2, "0")}`;

  // return `${day.padStart(2, "0")}. ${
  //   monthNames[month]
  // } ${year} - ${hours.padStart(2, "0")}:${minutes.padStart(
  //   2,
  //   "0"
  // )}:${seconds.padStart(2, "0")}`;
};
