export const getMovieUrl = (path: string) => {
    return new URL(`../assets/movie-covers/${path}`, import.meta.url).href;
}