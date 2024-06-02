export interface author {
    _id:string,
    name:string
}




export interface Book {
    _id:string,
    title:string,
    genre:string,
    author:author,
    coverImage:string,
    file:string,
    createdAt:string
}