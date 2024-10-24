// DECLARE MODEL TYPE
type BookType = {
    id: string;
    title: string;
    author: string;
    genre: string;
    publishedDate: Date;
    available: boolean;
    reservations: BookReservationType[];
};

// DECLARE RESERVATION TYPE FOR BOOK
type BookReservationType = {
    userId: string;
    reservedBy: string;
    reservedAt: Date;
    dueDate: Date;
};

// DECLARE CLASS TO SIMULATE SCHEMA FUNCTIONALITY
class Book {
    public id: string;
    public title: string;
    public author: string;
    public genre: string;
    public publishedDate: Date;
    public available: boolean;
    public reservations: BookReservationType[];

    constructor(book: BookType) {
        this.id = book.id;
        this.title = book.title;
        this.author = book.author;
        this.genre = book.genre;
        this.publishedDate = book.publishedDate;
        this.available = book.available;
        this.reservations = book.reservations || [];
    }

    // Example method: add a reservation
    addReservation(reservation: BookReservationType) {
        this.reservations.push(reservation);
        this.available = false;
    }

    // Example method: mark book as available/unavailable
    toggleAvailability(isAvailable: boolean) {
        this.available = isAvailable;
    }
}

// EXPORT ALL
export { Book, BookType, BookReservationType };
