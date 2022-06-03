const tabledata = {
  movies: [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Cast",
      selector: (row) => row.cast,
    },
    {
      name: "Language",
      selector: (row) => row.language,
    },
    {
      name: "Genre",
      selector: (row) => row.genre,
    },
    {
      name: "Date Created",
      selector: (row) => row.date,
    },
  ],
  bookings: [
    {
      name: "Location",
      selector: (row) => row.location,
      sortable: true,
    },
    {
      name: "Theatre",
      selector: (row) => row.theatre_name,
    },
    {
      name: "Movie Title",
      selector: (row) => row.title,
    },
    {
      name: "Showing by",
      selector: (row) => row.formatted_show_time,
    },
    {
      name: "Show price",
      selector: (row) => row.price,
    },
    {
      name: "Date Created",
      selector: (row) => row.date,
    },
  ],
  booked: [
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Cast",
      selector: (row) => row.cast,
    },
    {
      name: "Language",
      selector: (row) => row.language,
    },
    {
      name: "Genre",
      selector: (row) => row.genre,
    },
    {
      name: "Locations",
      selector: (row) => row.num_location,
    },
  ],
  location: [
    {
      name: "Theatre Name",
      selector: (row) => row.theatre_name,
    },
    {
      name: "Show Time",
      selector: (row) => row.date,
    },
    {
      name: "Location",
      selector: (row) => row.location,
    },
    {
      name: "Price",
      selector: (row) => row.price,
    },
  ],
};

export default tabledata;
