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
      name: "Movie Title",
      selector: (row) => row.title,
      ignoreRowClick: true,
    },
    {
      name: "Theatre",
      selector: (row) => row.theatre_name,
      ignoreRowClick: true,
    },

    {
      name: "Location",
      selector: (row) => row.location,
      sortable: true,
      ignoreRowClick: true,
    },
    {
      name: "Showing by",
      selector: (row) => row.formatted_show_time,
      ignoreRowClick: true,
    },
    {
      name: "Show price",
      selector: (row) => row.price,
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
