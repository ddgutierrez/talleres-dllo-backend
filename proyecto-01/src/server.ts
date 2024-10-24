import createApp from "./app";

const app = createApp();

// START SERVER
app.listen(3000, () => {
  console.log("Server listening to port 3000.");
});

// Simulated in-memory "database"
let users: any[] = [];
let books: any[] = [];

export const Database = {
  getUsers: () => users,
  addUser: (user: any) => users.push(user),
  getBooks: () => books,
  addBook: (book: any) => books.push(book),
};