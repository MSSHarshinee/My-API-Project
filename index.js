// this is the first line for all the progrma
require("dotenv").config();

const express = require("express");
// for taking the get request
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
//database
const database = require("./database/database");
const { request } = require("express");  // destruction to object form

//Models  (import)

const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");

//////// initialize express
const booky = express(); //instance of express and it's important

booky.use(bodyParser.urlencoded({extended:true}));  // we can allow to pass any kind of the thing in your url(request)
booky.use(bodyParser.json());  // to convert the body part in json formate

// to connect to  the database
mongoose.connect(process.env.MONGO_URL, //so that no one can hack your system
{
    useNewUrlParser: true,
  useUnifiedTopology: true
}
).then(() =>console.log("connection has established"));



// 1 . BOOKS
//       1 (A)   Get All The Book


/*
route              /
description        get all the books
Access             public
parameter           none
method              get
*/

booky.get("/",async (req,res) =>{
    const getAllBooks = await BookModel.find();
return res.json(getAllBooks);
});

//      1 (B)    Take The Book By ISBN Number  like "12345Book"

/*
route              /is
description        get specific isbn the books
Access             public
parameter           isbn
method              get
*/
booky.get("/is/:isbn",async (req,res) => {
    const getSpecificBook = await BookModel.findOne({ISBN: req.params.isbn});

    // check is array is empty or not


    if(!getSpecificBook) {
        return res.json({error: `No book found for the ISBN of ${req.params.isbn}`})
    }

    return res.json({book:getSpecificBook});
    });


        //      1 (C)   Get The Book By Category such as  "tech","space","education"

    /*
route              /c
description        get specific the books on category
Access             public
parameter           category
method              get
*/

booky.get("/c/:category",async (req,res) =>{

    const getSpecificBook = await BookModel.findOne({category:req.params.category});

    if(!getSpecificBook){
        return res.json({eroor:`no books found for the category of ${req.params.category}`})
    }

    return res.json({book:getSpecificBook});

});


        //  1 (D)  Get The Book By Language such as "en", "hindi"

  /*
route              /lang
description        get specific the books on language
Access             public
parameter           language
method              get
*/

booky.get("/lang/:language" , async (req,res) =>
{
    const getSpecificBook = await BookModel.findOne({language:req.params.language});//make sure you write language for serching in bookmodel

    if(!getSpecificBook){
        return res.json({book:`sorry badak we don't find any books on ${req.params.language} language`});

    }
    else{
        return res.json({book:getSpecificBook});
    }
} );




                        // 2.author

        //   2 (A)  Get All The Author

   /*
route              /author
description        get all the author
Access             public
parameter           none
method              get
*/

booky.get("/author", async (req,res) => {
  const getAllAuthor = await AuthorModel.find();
    return res.json(getAllAuthor);
});


        //    2 (B) Get Author's Books By Author Id

   /*
route              /author/id
description       get specific author by id
Access             public
parameter           id
method              get
*/

booky.get("/author/id/:id" , async (req,res) => {

const getSpecificAuthor = await AuthorModel.findOne({id:parseInt(req.params.id)});

if(!getSpecificAuthor){
    return res.json({error:`Sorry Dear !! No Book Found Of Author Id No ${req.params.id}`});
}
else {
    return res.json({author:getSpecificAuthor});
}
});


        //  2 (C)   Get The Author Based On Book
/*
route             /author/book/
description        get list of books on author id
Access             public
parameter           isbn
method              get
*/

booky.get("/author/book/:isbn", async (req,res) => {

   const  getSpecificAuthor = await AuthorModel.findOne({books:req.params.isbn});
        if(!getSpecificAuthor){
            return res.json({error:`sorry can't found entered book id no ${req.params.isbn}  author`});
        }
        else{
            return res.json({book:getSpecificAuthor});
        }

});


                            // 3 PUBLICATION


        //  3 (A)  Get The All The  Publication

 /*
route             /publication
description        get list of publication
Access             public
parameter           none
method              get
*/
booky.get("/publication", async (req,res) => {
    const getAllPublications = await PublicationModel.find();
    return res.json(getAllPublications);
});


        //  3 (B)  Get  The Specific Publication  On Publication Id

/*
route             /publication/i
description        get the publication on the   publication id
Access             public
parameter           publication id
method              get
*/

booky.get("/publication/i/:id"  , async (req,res) => {

  const  getSpecificPublication = await PublicationModel.findOne({id:req.params.id});
  if(!getSpecificPublication){
      return res.json({error:`the  publication id ${req.params.id} is not found`});
  }
  else{
      return res.json({publication:getSpecificPublication});
  }

});


        //    3 (C)  Get Publication Of The Perticular Id

/*
route             /publication/book
description        get the publication book on their isbn number
Access             public
parameter           isbn
method              get
*/

booky.get("/publication/book/:isbn", async (req,res) => {

const getSpecificPublication = await PublicationModel.findOne({books:req.params.isbn});

if(!getSpecificPublication){
    return res.json({error: `sorry !!! we can't find ${req.params.isbn} of the publication`});

}

else{
    return res.json({publication:getSpecificPublication});
}

});



///         POST

/*
route              /book/new
description        add new the books
Access             public
parameter           none
method              post
*/

booky.post("/book/new", async(req,res) => {

    const { newBook } = req.body;
    const addNewBook = BookModel.create(newBook);
    return res.json({
        books: addNewBook,
        message:"Book was added !!!"
    });



});



/*
route              /author/new
description        add new the author
Access             public
parameter           none
method              post
*/


booky.post("/author/new",async (req,res)=>{

    const {newAuthor } = req.body;
    const addNewAuthor = AuthorModel.create(newAuthor);
    return res.json(
        {
            Author : addNewAuthor,
            message : "Yehh ,Author has been added !!"
        }
    );





    });


/*
route              /publication/new
description        add new the publication
Access             public
parameter           none
method              post
*/

booky.post("/publication/new" , async (req,res) => {

    const {newPublication} = req.body;
    const addNewPublication = PublicationModel.create(newPublication);
      return res.json({

        Publication:addNewPublication,
        message : "publication has been added sucessfully"

    });






});
                    //      3) update


/*
route              /publication/update/book/:isbn
description        update or add new publication
Access             public
parameter           isbn
method             put
*/

booky.put("/publication/update/book/:isbn",(req,res) => {
    // update publication in database by publication id
     database.publication.forEach((pub) => {
         if(pub.Id ===  req.body.pubId) {

            return pub.books.push(req.params.isbn);

         }
     });
     //update the book in database by isbn

     database.books.forEach((book) => {
         if(book.ISBN === req.params.isbn){
             book.publication = req.body.pubId;
             return;
         }
     });


      return res.json({
          books:database.books,
          publication: database.publication,
          message:"succesfully updated"

      });
 } );



 //          delete

 /*
route             book/delete
description       delete a book
Access             public
parameter           isbn
method             put
*/

booky.delete("/book/delete/:isbn" , async (req,res)=> {
    // which ever book that doesn't match with isbn just send it to updated book database array
    // and rest will be filtered out

   const updatedBookDatabase = await BookModel.findOneAndDelete(
       {
           ISBN : req.params.isbn
       }
        );
    return res.json({
        books:updatedBookDatabase
    });
});
/*
route             book/delete/author
description       delete a book
Access             public
parameter           isbn , author id
method             put
*/

booky.delete("/book/delete/author/:isbn/:authorId" , (req,res) => {

    // update the book database

    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            const newAuthorList = book.author.filter(
                (eachAuthor) => eachAuthor !== parseInt(req.params.authorId)
            );
            book.author = newAuthorList;
            return;
        }
    });


    //Update the author database

    database.author.forEach((eachAuthor) => {
        if(eachAuthor.id === parseInt(req.params.authorid)){
            const newBookList = eachAuthor.books.filter(
            (book) =>  book !==  req.params.isbn
            );

           eachAuthor.books = newBookList;
           return;
        }

    });
    return res.json({
        book:database.books,
        author:database.author,
        message:"succesfully deleted both "

    });
});



    /*
route              /publication/update/book/:isbn
description        update or add new publication
Access             public
parameter           isbn
method             put
*/


booky.put("/book/update/:isbn", async (req,res) =>
{
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN : req.params.isbn   // unique property to find the book

        },
        {
            title : req.body.bookTitle      // parameter that you want to change
        },

        {
            new:true   //update the entire book and show the new book on the frontend
        }
        );

        return res.json({
            books :updatedBook
        });
});



/*
route             /book/author/update/
description        update or add new author
Access             public
parameter           isbn
method             put
*/


booky.put("/book/author/update/:isbn" , async(req,res) =>
{
    //update book databse

const updatedBook = await BookModel.findOneAndUpdate(


    {
            ISBN:req.params.isbn
    },
    {
        $addToSet:{
            authors:req.body.newAuthor
        }
        },
    {
          new:true

        }


);




/// update the author database

const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
        id:req.body.newAuthor
    },
    {
        $addToSet : {
            books:req.params.isbn
        }
    },
    {
        new:true
    }
);


return res.json({
     books: updatedBook,
     authors:updatedAuthor,
     message:"added"
}) ;
});



booky.listen(3000, () => {
    console.log("server is running ");
});
