import { BadRequestError as BadRequestError, ConflictError,NotFoundError} from './errors.js'
const allowedGenres = ['SCI_FI', 'NOVEL', 'HISTORY', 'MANGA', 'ROMANCE', 'PROFESSIONAL']
let id = 0 
export let books  = []
export const addBook = (title,author,year,price,genres)=>{
    if (books.some((book)=> book.title.toLowerCase() === title.toLowerCase()))
        throw new ConflictError(`Error: Book with the title ${title} already exists in the system`)
    if(year <1940 || year > 2100)
        throw new ConflictError(`Error: Can’t create new Book that its year ${year} is not in the accepted range [1940 -> 2100]`)
    if( price < 0)
        throw new ConflictError (`Error: Can’t create new Book with negative price`)
    if(genres.some((genre)=> !allowedGenres.includes(genre)))
        throw new ConflictError()
    id+=1
    books.push({id,title,author,year,price,genres})
    return(id)
}

const booksAuthor = (author,currentBooks=books)=> 
    currentBooks.filter ((book)=> book.author === author)

const booksAboveYear = (year_bigger_than,currentBooks=books)=>
    currentBooks.filter((book)=> book.year >= year_bigger_than ) 

const booksUnderYear = (year_less_than,currentBooks=books)=>
    currentBooks.filter((book)=> book.year <= year_less_than )

const booksAbovePrice = (price_bigger_than , currentBooks=books)=>
    currentBooks.filter((book)=> book.price >= price_bigger_than )

const booksUnderPrice = (price_less_than,currentBooks=books)=>
    currentBooks.filter((book)=>  book.price <= price_less_than)

const booksBooksByGenres = (genres,currentBooks=books)=>{  
    if(!genres.some((genre)=> genre.toUpperCase()=== genre))
        throw new BadRequestError('')
    console.log("genre")
    return currentBooks.filter((book)=> genres.every((genre)=> book.genres.some((bookgenre) => bookgenre.toUpperCase() === genre)))


}

export  const filterBy = (author,price_bigger_than,price_less_than,year_bigger_than,year_less_than,genres)=>{
    let currentBooks = books
    if (author){
        currentBooks = booksAuthor(author,currentBooks)
    }
    if(price_bigger_than){
        currentBooks = booksAbovePrice(price_bigger_than,currentBooks)
    }
    if(price_less_than){
        currentBooks = booksUnderPrice(price_less_than,currentBooks)
    }
    if(year_bigger_than){
        currentBooks = booksAboveYear(year_bigger_than,currentBooks)
    }
    if(year_less_than){
        currentBooks = booksUnderYear(year_less_than,currentBooks)
    }
    if(genres){
        currentBooks = booksBooksByGenres(genres,currentBooks)
    }
    return currentBooks


}

export const getBook = (id) =>{
    const book = books.find((book)=> book.id === id)
    if(!book){
        throw new NotFoundError(`Error: no such Book with id ${id}`)
    }
    return book
}

export const updatePrice = (price,id)=>{
    if(price<=0){
        throw new ConflictError(`Error: price update for book ${id} must be a positive integer`) 
    }
    const book = getBook(id)
    const oldPrice  = book.price
    book.price = price
    return oldPrice


}

export const deleteBook = (id)=>{
    getBook(id)
    books = books.filter((book)=>book.id != id)
    return books.length
}

    
