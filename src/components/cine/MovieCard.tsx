import Rating from "./Rating";
import tag from "./../../assets/tag.svg"
import { getMovieUrl } from "../../utility/getMovieUrl";

export default function MovieCard({movie}:{movie:any}) {
    return (
        <figure className="p-4 border border-black/10 shadow-sm dark:border-white/10 rounded-xl">
            <img className="w-full object-cover" src={getMovieUrl(movie.cover)} alt={movie.title} />
            {getMovieUrl(movie.cover)}
            <figcaption className="pt-4">
                <h3 className="text-xl mb-1 text-black">{movie.title}</h3>
                <p className="text-[#575A6E] text-sm mb-2">{movie.genre}</p>
                <div className="flex items-center space-x-1 mb-5">
                    <Rating value={movie.rating} />
                </div>
                <a className="bg-primary rounded-lg py-2 px-5 flex items-center justify-center gap-2 text-[#171923] font-semibold text-sm"
                    href="#">
                    <img src={tag} alt="tag" />
                    <span>${movie.price} | Add to Cart</span>
                </a>
            </figcaption>
        </figure>
    )
}
