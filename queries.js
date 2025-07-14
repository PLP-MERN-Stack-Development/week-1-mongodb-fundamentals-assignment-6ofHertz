// 1️⃣ Basic CRUD Operations
// Find all books in a specific genre
// Example: Fiction
db.books.find({ genre: "Fiction" });

// Find books published after a certain year
// Example: after 1950
db.books.find({ published_year: { $gt: 1950 } });

// Find books by a specific author
// Example: George Orwell
db.books.find({ author: "George Orwell" });

// Update the price of a specific book
// Example: Update price of '1984' to 12.99
db.books.updateOne(
    { title: "1984" },
    { $set: { price: 12.99 } }
);

// Delete a book by its title
// Example: Delete 'Animal Farm'
db.books.deleteOne({ title: "Animal Farm" });


// 2️⃣ Advanced Queries

// Find books that are in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });

// Projection to return only title, author, price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });

// Sort books by price ascending
db.books.find().sort({ price: 1 });

// Sort books by price descending
db.books.find().sort({ price: -1 });

// Pagination: limit 5 books per page, skip first page (for page 2)
db.books.find().limit(5).skip(5);


// 3️⃣ Aggregation Pipelines

// Calculate the average price of books by genre
db.books.aggregate([
    { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
]);

// Find the author with the most books in the collection
db.books.aggregate([
    { $group: { _id: "$author", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 1 }
]);

// Group books by publication decade and count them
db.books.aggregate([
    {
        $project: {
            decade: { $concat: [
                { $toString: { $multiply: [ { $floor: { $divide: ["$published_year", 10] } }, 10 ] } },
                "s"
            ] }
        }
    },
    { $group: { _id: "$decade", count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
]);


// 4️⃣ Indexing

// Create an index on the title field
db.books.createIndex({ title: 1 });

// Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 });

// Use explain() to demonstrate performance improvement with indexes
db.books.find({ title: "1984" }).explain("executionStats");
