const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/test")
  .then(() => {
    console.log("MongoDBga ulanish hosil qilindi...");
  })
  .catch((err) => {
    console.log("MongoDBga ulanish vaqtida xatolik ro'y berdi...", err);
  });

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 100 },
  auther: String,
  tags: {
    type: Array,
    validate: function (val, callback) {
      isAsync: true,
        setTimeout(() => {
          const resoult = val && val.length > 0;
          callback(resoult);
        }, 5000);
    },
    message: "Kitobning kamida bitta tegi bo'lishi kerak.",
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 300,
    get: (val) => Math.round(val),
    set: (val) => Math.random(val),
  },
  catigory: {
    type: String,
    required: true,
    enum: ["classic", "biography", "science"],
    lowercase: true,
    trim: true,
  },
});

const Book = mongoose.model("Book", bookSchema);
async function createBooks() {
  const book = new Book({
    name: "React js  asoslari",
    auther: "Madaminov Izzatbek",
    tags: ["js", "dasturlash", "node"],
    isPublished: true,
    catigory: "classic",
    price: 100,
  });
  try {
    // await book.validate();
    const saveBook = await book.save();
    console.log(saveBook);
  } catch (ex) {
    console.log(ex);
  }
}
createBooks();
// async function getBooks() {
//   const pageNumber = 3;
//   const pageSize = 10;
//   const book = await Book.find({ auther: "Madaminov Izzatbek" })
//     .skip((pageNumber - 1) * pageSize)
//     .limit(pageSize)
//     .sort({ name: 1 })
//     .select({ name: 1, tags: 1 })
//     .countDocuments();
//   console.log(book);
// }
// async function updateBook(id) {
//   const book = await Book.findById(id);
//   if (!book) return;

//   //   1-usul
//   book.isPublished = true;
//   book.auther = "Izzatulloh";

//   //   2-usul
//   book.set({
//     isPublished: true,
//     auther: "Izzatulloh",
//   });

//   const updatedBook = await book.save();
//   console.log(updatedBook);
// }
// updateBook('65eeb49dce0898e6d285b628')

// async function updateBook(id) {
//   const result = await Book.updateMany(
//     { _id: id },
//     {
//       $set: {
//         author: "Farhod", // Imlo tuzatildi
//         isPublished: false,
//       },
//     }
//   );
//   console.log(result);
// }

// updateBook("65eeb49dce0898e6d285b628");

// async function deleteBook(id) {
//   const resoult = await Book.findByIdAndDelete({ _id: id });
//   console.log(resoult);
// }
// deleteBook("65eeb49dce0898e6d285b628");
