


export const paginate = (fullArray) => {
    const itemsPerPage = 4;
    const numberOfPages = Math.ceil(fullArray.length / itemsPerPage);
    const paginatedArray = Array.from(
      { length: numberOfPages },
      (_, idx) => {
        const start = idx * itemsPerPage;
        return fullArray.slice(start, start + itemsPerPage);
      }
    );
    
    return paginatedArray;
  };



  