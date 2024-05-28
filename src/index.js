import express from "express";
import  bodyParser from 'body-parser'

import { addBook, books, deleteBook, filterBy, getBook, updatePrice } from "./db.js";
const app = express()
app.use(bodyParser.json())
app.use((res,req,next) => {
    try{
        next()
    }catch(err){
        next(err)
    }
})


//1
app.get("books/health",(req,res)=>{res.send("OK")})

//2
app.post("/book",(req,res)=>{
    const {title,author,year,price,genres} = req.body
    const bookId= addBook(title,author,year,price,genres)
    res.send({result: bookId})
}
)

//3
app.get("books/total",(req,res)=>{
    const {author,price_bigger_than,price_less_than,year_bigger_than,year_less_than, genres} = req.query
    let filteredBooks = filterBy(author,price_bigger_than,price_less_than,year_bigger_than,year_less_than,genres?.split(","))
    res.send({result:filteredBooks.length})
})

//4
app.get("/books",(req,res)=>{
    const {author,price_bigger_than,price_less_than,year_bigger_than,year_less_than,genres} = req.query
    let filteredBooks = filterBy(author,price_bigger_than,price_less_than,year_bigger_than,year_less_than,genres?.split(","))
    res.send({result:filteredBooks.sort((book1, book2)=>(book1.title - book2.title))})
})

//5
app.get("/book",(req,res)=>{
    const {id} = req.query
    let book = getBook(+id)
    res.send({result: book})
})

//6
app.put("/book",(req,res)=>{
    const {id,price} = req.query
    const oldPrice = updatePrice(+price,+id)
    res.send({result:oldPrice})
})

//7
app.delete("/book",(req,res)=>{
    const {id} = req.query
    const numberOfBooks = deleteBook(+id)
    res.send({result:numberOfBooks})
    
})

app.use((err,req,res,next)=>{
    res.status(err.code ? err.code : 500)
    res.send({errorMessage: err.message ? err.message : 'error'})

})




app.listen(8574)



