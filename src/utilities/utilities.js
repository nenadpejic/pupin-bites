import { useState } from "react";

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
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDay();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return `${day}.${month}.${year} - ${hours}:${minutes}:${seconds}`;
};
