interface IRating{
    rating: number,
    // "created_at": "2024-05-22T01:46:25.639186Z",
    // "updated_at": "2024-05-22T01:46:25.639204Z",
    user: number,
    movie: number
}

interface IRatingEdit{
    rating: number
}

export {IRating, IRatingEdit}