const { nanoid } = require("nanoid");
const Books = require("./books");

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  const newBooks = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  if (name === undefined) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  Books.push(newBooks);
  const isSuccess = Books.filter((book) => book.id === id).length > 0;

  if (isSuccess !== undefined) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  } else {
    const response = h.response({
      status: "error",
      message: "Buku gagal ditambahkan",
    });
    response.code(500);
    return response;
  }
};

const getAllBooksHandler = (req, h) => {
  const { name, reading, finished } = req.query;
  if (name !== undefined) {
    const res = h.response({
      status: "success",
      data: {
        books: Books
          .filter((n) =>
            n.name.toLowerCase().includes(name.toLowerCase())
          )
          .map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
      },
    });
    res.code(200);
    return res;
  }
  if (reading !== undefined) {
    if (reading === "0") {
      return {
        status: "success",
        data: {
          books: Books
            .filter((n) => n.reading === false)
            .map((book) => ({
                id: book.id,
              name: book.name,
              publisher: book.publisher,
            })),
        },
      };
    }

    if (reading === "1") {
      return {
        status: "success",
        data: {
          books: Books
            .filter((n) => n.reading === true)
            .map((book) => ({
                id: book.id,
              name: book.name,
              publisher: book.publisher,
            })),
        },
      };
    }

    return {
      status: "success",
      data:{
        books: Books.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
      } 
    };
  }

  if (finished !== undefined) {
    if (finished === "0") {
      return {
        status: "success",
        data: {
          books: Books
            .filter((n) => n.finished === false)
            .map((book) => ({
                id: book.id,
              name: book.name,
              publisher: book.publisher,
            })),
        },
      };
    } else if(finished === "1") {
      return {
        status: "success",
        data: {
          books: Books
            .filter((n) => n.finished === true)
            .map((book) => ({
                id: book.id,
              name: book.name,
              publisher: book.publisher,
            })),
        },
      };
    }

    return {
      status: "success",
      data: {
        books: Books.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
      } 
    };
  }

  const res = h.response({
    status: 'success',
    data: {
      books: Books.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher
      }))
    }
  })
  res.code(200);
  return res
};

const getSpecifiedBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const book = Books.filter((n) => n.id === bookId)[0];

  if (book !== undefined) {
    const response = h.response({
      status: "success",
      data: {
        book,
      },
    });
    response.code(200);
    return response;
  }



  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};

const UpdateBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const updatedAt = new Date().toISOString();

  const index = Books.findIndex((book) => book.id === bookId);

    if (index !== -1) {
        if (name === undefined) {
            const response = h.response({
                status: "fail",
                message: "Gagal memperbarui buku. Mohon isi nama buku",
            });
            response.code(400);
            return response;
        }

    if (readPage > pageCount) {
        const response = h.response({
          status: "fail",
          message:
            "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
        });
        response.code(400);
        return response;
    }

    Books[index] = {
        ...Books[index],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        updatedAt, 
    };

      const response = h.response({
        status: "success",
        message: "Buku berhasil diperbarui",
      });
      response.code(200);
      return response;
    
  }

  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const index = Books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    Books.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getSpecifiedBookByIdHandler,
  UpdateBookByIdHandler,
  deleteBookByIdHandler,
};
