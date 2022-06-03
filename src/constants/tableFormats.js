import Cell from "../components/admin/ComponentEdit";

const tabledata = {
  movies: [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      ignoreRowClick: true,
    },
    {
      name: "Cast",
      selector: (row) => row.cast,
      ignoreRowClick: true,
    },
    {
      name: "Language",
      selector: (row) => row.language,
      ignoreRowClick: true,
    },
    {
      name: "Genre",
      selector: (row) => row.genre,
      ignoreRowClick: true,
    },
    {
      name: "Date Created",
      selector: (row) => row.date,
      ignoreRowClick: true,
    },
    {
      name: "",
      cell: Cell,
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
    {
      name: "",
      cell: Cell,
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
