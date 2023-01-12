const {
  addBookHandler,
  getAllBooksHandler,
  getSpecifiedBookByIdHandler,
  UpdateBookByIdHandler,
  deleteBookByIdHandler,
} = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBookHandler, //addBookHandler
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBooksHandler, //getAllBooksHandler
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: getSpecifiedBookByIdHandler, //getSpecifiedBookByIdHandler
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: UpdateBookByIdHandler, //UpdateBookByIdHandler
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteBookByIdHandler, //deleteBookByIdHandler
  },
];

module.exports = routes;
