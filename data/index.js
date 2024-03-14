import Author from "../models/Author.js";
import Product from "../models/Product.js";

export async function insertData() {
  try {
    const authorsData = [
      {
        _id: "jr31071965",
        authorName: "J.K. Rowling",
        biography: "British author best known for the Harry Potter series.",
      },
      {
        _id: "sk21091947",
        authorName: "Stephen King",
        biography:
          "American author of horror, supernatural fiction, suspense, crime, science-fiction, and fantasy novels.",
      },
      {
        _id: "hl28041926",
        authorName: "Harper Lee",
        biography:
          "American novelist widely known for her Pulitzer Prize-winning novel To Kill a Mockingbird.",
      },
      {
        _id: "go25061903",
        authorName: "George Orwell",
        biography:
          "British author and journalist known for his dystopian novels Animal Farm and Nineteen Eighty-Four.",
      },
      {
        _id: "ac15091990",
        authorName: "Agatha Christie",
        biography:
          "English writer known for her detective novels and short story collections, particularly those revolving around fictional detectives Hercule Poirot and Miss Marple.",
      },
      {
        _id: "gg06031927",
        authorName: "Gabriel García Márquez",
        biography:
          "Colombian novelist, short-story writer, screenwriter, and journalist, known for his acclaimed novels such as One Hundred Years of Solitude and Love in the Time of Cholera.",
      },
      {
        _id: "ja16121775",
        authorName: "Jane Austen",
        biography:
          "English novelist known primarily for her six major novels, including Pride and Prejudice and Emma.",
      },
      {
        _id: "eh21071899",
        authorName: "Ernest Hemingway",
        biography:
          "American novelist, short-story writer, and journalist known for his economical and understated style.",
      },
      {
        _id: "tm18021931",
        authorName: "Toni Morrison",
        biography:
          "American novelist known for her exploration of the black experience in America, particularly in novels such as Beloved and Song of Solomon.",
      },
      {
        _id: "ff24091896",
        authorName: "F. Scott Fitzgerald",
        biography:
          "American novelist and short-story writer, best known for his novel The Great Gatsby.",
      },
    ];

    const insertedAuthors = await Author.insertMany(authorsData);
    console.log("Authors inserted:", insertedAuthors);

    const booksData = [
      {
        _id: "sk000001",
        productName: "It",
        productPrice: 12.99,
        publishDate: "1986-09-15",
        description:
          "A horror novel about a group of friends who confront a shape-shifting entity that terrorizes their town.",
        authorList: ["sk21091947"],
        authorNames: ["Stephen King"],
        categoryList: ["Horror", "Thriller"],
        picturePath: "sk000001.jpeg",
      },
      {
        _id: "sk000002",
        productName: "The Shining",
        productPrice: 11.99,
        publishDate: "1977-01-28",
        description:
          "A psychological horror novel about an aspiring writer and his family who become caretakers of an isolated hotel, where supernatural forces wreak havoc.",
        authorList: ["sk21091947"],
        authorNames: ["Stephen King"],
        categoryList: ["Horror", "Thriller"],
        picturePath: "sk000002.jpeg",
      },
      {
        _id: "sk000003",
        productName: "Misery",
        productPrice: 10.99,
        publishDate: "1987-06-08",
        description:
          "A psychological thriller about an author held captive by his 'number one fan' after a car accident.",
        authorList: ["sk21091947"],
        authorNames: ["Stephen King"],
        categoryList: ["Thriller", "Horror"],
        picturePath: "sk000003.jpeg",
      },
      {
        _id: "sk000004",
        productName: "Carrie",
        productPrice: 9.99,
        publishDate: "1974-04-05",
        description:
          "A supernatural horror novel about a teenage girl with telekinetic powers who seeks revenge on her abusive peers.",
        authorList: ["sk21091947"],
        authorNames: ["Stephen King"],
        categoryList: ["Horror", "Drama"],
        picturePath: "sk000004.jpeg",
      },
      {
        _id: "sk000005",
        productName: "Pet Sematary",
        productPrice: 10.49,
        publishDate: "1983-11-14",
        description:
          "A horror novel about a family who discovers a burial ground in the woods behind their new home, with sinister consequences.",
        authorList: ["sk21091947"],
        authorNames: ["Stephen King"],
        categoryList: ["Horror", "Thriller"],
        picturePath: "sk000005.jpeg",
      },
      {
        _id: "hl000001",
        productName: "To Kill a Mockingbird",
        productPrice: 14.99,
        publishDate: "1960-07-11",
        description:
          "A coming-of-age novel set in the American South during the 1930s, addressing racial injustice and moral growth.",
        authorList: ["hl28041926"],
        authorNames: ["Harper Lee"],
        categoryList: ["Fiction", "Classic"],
        picturePath: "hl000001.jpeg",
      },
      {
        _id: "go000001",
        productName: "1984",
        productPrice: 13.99,
        publishDate: "1949-06-08",
        description:
          "A dystopian novel set in a totalitarian society where individuality is suppressed and perpetual war is used to control the populace.",
        authorList: ["go25061903"],
        authorNames: ["George Orwell"],
        categoryList: ["Science Fiction", "Dystopian"],
        picturePath: "go000001.jpeg",
      },
      {
        _id: "go000002",
        productName: "Animal Farm",
        productPrice: 11.49,
        publishDate: "1945-08-17",
        description:
          "An allegorical novella that satirizes the events leading up to the Russian Revolution and the Stalinist era of the Soviet Union.",
        authorList: ["go25061903"],
        authorNames: ["George Orwell"],
        categoryList: ["Satire", "Political Allegory"],
        picturePath: "go000002.jpeg",
      },
      {
        _id: "ac000001",
        productName: "Murder on the Orient Express",
        productPrice: 12.99,
        publishDate: "1934-01-01",
        description:
          "A detective novel featuring the famous Belgian detective Hercule Poirot, who investigates a murder on a luxurious train.",
        authorList: ["ac15091990"],
        authorNames: ["Agatha Christie"],
        categoryList: ["Mystery", "Detective"],
        picturePath: "ac000001.jpeg",
      },
      {
        _id: "ac000002",
        productName: "And Then There Were None",
        productPrice: 11.99,
        publishDate: "1939-11-06",
        description:
          "A mystery novel about ten strangers who are invited to an isolated island and are murdered one by one, following a nursery rhyme.",
        authorList: ["ac15091990"],
        authorNames: ["Agatha Christie"],
        categoryList: ["Mystery", "Thriller"],
        picturePath: "ac000002.jpeg",
      },
      {
        _id: "gg000001",
        productName: "One Hundred Years of Solitude",
        productPrice: 15.49,
        publishDate: "1967-05-30",
        description:
          "A landmark novel in magical realism, chronicling the Buendía family's rise and fall in the fictional town of Macondo.",
        authorList: ["gg06031927"],
        authorNames: ["Gabriel García Márquez"],
        categoryList: ["Fiction", "Classic"],
        picturePath: "gg000001.jpeg",
      },
      {
        _id: "gg000002",
        productName: "Love in the Time of Cholera",
        productPrice: 14.99,
        publishDate: "1985-01-01",
        description:
          "A love story set in Colombia, exploring themes of love, aging, and the passage of time.",
        authorList: ["gg06031927"],
        authorNames: ["Gabriel García Márquez"],
        categoryList: ["Romance", "Fiction"],
        picturePath: "gg000002.jpeg",
      },
      {
        _id: "ja000001",
        productName: "Pride and Prejudice",
        productPrice: 13.99,
        publishDate: "1813-01-28",
        description:
          "A romantic novel featuring Elizabeth Bennet and Mr. Darcy, exploring themes of love, marriage, and social status.",
        authorList: ["ja16121775"],
        authorNames: ["Jane Austen"],
        categoryList: ["Romance", "Classic"],
        picturePath: "ja000001.jpeg",
      },
      {
        _id: "eh000001",
        productName: "The Old Man and the Sea",
        productPrice: 11.49,
        publishDate: "1952-09-01",
        description:
          "A novella about an aging Cuban fisherman, Santiago, and his battle with a giant marlin in the Gulf Stream.",
        authorList: ["eh21071899"],
        authorNames: ["Ernest Hemingway"],
        categoryList: ["Fiction", "Adventure"],
        picturePath: "eh000001.jpeg",
      },
      {
        _id: "tm000001",
        productName: "Beloved",
        productPrice: 14.99,
        publishDate: "1987-09-02",
        description:
          "A novel inspired by the story of Margaret Garner, an African-American slave who escaped slavery in Kentucky.",
        authorList: ["tm18021931"],
        authorNames: ["Toni Morrison"],
        categoryList: ["Historical Fiction"],
        picturePath: "tm000001.jpeg",
      },
      {
        _id: "tm000002",
        productName: "Song of Solomon",
        productPrice: 13.99,
        publishDate: "1977-10-01",
        description:
          "A coming-of-age novel set in Michigan, exploring themes of identity, family, and African-American folklore.",
        authorList: ["tm18021931"],
        authorNames: ["Toni Morrison"],
        categoryList: ["Fiction"],
        picturePath: "tm000002.jpeg",
      },
      {
        _id: "ff000001",
        productName: "The Great Gatsby",
        productPrice: 12.99,
        publishDate: "1925-04-10",
        description:
          "A novel set in the Jazz Age, following the enigmatic millionaire Jay Gatsby and his obsession with the beautiful Daisy Buchanan.",
        authorList: ["ff24091896"],
        authorNames: ["F. Scott Fitzgerald"],
        categoryList: ["Classic", "Fiction"],
        picturePath: "ff000001.jpeg",
      },
      {
        _id: "jk000001",
        productName: "Harry Potter and the Sorcerer's Stone",
        productPrice: 15.99,
        publishDate: "1997-06-26",
        description:
          "The first book in the Harry Potter series, following the young wizard Harry Potter as he discovers his magical heritage.",
        authorList: ["jr31071965"],
        authorNames: ["J.K. Rowling"],
        categoryList: ["Fantasy", "Young Adult"],
        picturePath: "jk000001.jpeg",
      },
      {
        _id: "jk000002",
        productName: "Harry Potter and the Chamber of Secrets",
        productPrice: 15.99,
        publishDate: "1998-07-02",
        description:
          "The second book in the Harry Potter series, where Harry returns to Hogwarts and uncovers the mystery of the Chamber of Secrets.",
        authorList: ["jr31071965"],
        authorNames: ["J.K. Rowling"],
        categoryList: ["Fantasy", "Young Adult"],
        picturePath: "jk000002.jpeg",
      },
      {
        _id: "jk000003",
        productName: "Harry Potter and the Prisoner of Azkaban",
        productPrice: 16.99,
        publishDate: "1999-07-08",
        description:
          "The third book in the Harry Potter series, where Harry learns about his godfather, Sirius Black, and confronts the Dementors.",
        authorList: ["jr31071965"],
        authorNames: ["J.K. Rowling"],
        categoryList: ["Fantasy", "Young Adult"],
        picturePath: "jk000003.jpeg",
      },
      {
        _id: "jk000004",
        productName: "Harry Potter and the Goblet of Fire",
        productPrice: 17.99,
        publishDate: "2000-07-08",
        description:
          "The fourth book in the Harry Potter series, where Harry competes in the Triwizard Tournament and faces Lord Voldemort's return.",
        authorList: ["jr31071965"],
        authorNames: ["J.K. Rowling"],
        categoryList: ["Fantasy", "Young Adult"],
        picturePath: "jk000004.jpeg",
      },
      {
        _id: "jk000005",
        productName: "Harry Potter and the Order of the Phoenix",
        productPrice: 18.99,
        publishDate: "2003-06-21",
        description:
          "The fifth book in the Harry Potter series, where Harry forms Dumbledore's Army and battles the oppressive Ministry of Magic.",
        authorList: ["jr31071965"],
        authorNames: ["J.K. Rowling"],
        categoryList: ["Fantasy", "Young Adult"],
        picturePath: "jk000005.jpeg",
      },
      {
        _id: "jk000006",
        productName: "Harry Potter and the Half-Blood Prince",
        productPrice: 19.99,
        publishDate: "2005-07-16",
        description:
          "The sixth book in the Harry Potter series, where Harry learns about Voldemort's Horcruxes and prepares for the final battle.",
        authorList: ["jr31071965"],
        authorNames: ["J.K. Rowling"],
        categoryList: ["Fantasy", "Young Adult"],
        picturePath: "jk000006.jpeg",
      },
      {
        _id: "jk000007",
        productName: "Harry Potter and the Deathly Hallows",
        productPrice: 20.99,
        publishDate: "2007-07-21",
        description:
          "The seventh and final book in the Harry Potter series, where Harry confronts Voldemort for the last time in the Battle of Hogwarts.",
        authorList: ["jr31071965"],
        authorNames: ["J.K. Rowling"],
        categoryList: ["Fantasy", "Young Adult"],
        picturePath: "jk000007.jpeg",
      },
    ];

    const insertedBooks = await Product.insertMany(booksData);
    console.log("Products inserted:", insertedBooks);

  } catch (err) {
    console.error(err);
    throw err;
  }
}
