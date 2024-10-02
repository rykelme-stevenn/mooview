interface IMovie {
    description: string;
    director: string;
    genre: number;
    id: number;
    image: string;
    link: string;
    poster: string;
    production: string;
    accept: boolean | null;
    title: string;
    year: number;
  }

  interface IGenre {
    id: number;
    name: string;
    created_at: string;
    description: string;
    movies: Array<IMovie>
  }

  
  export {IMovie, IGenre}