import Rating from "./Rating";
import tag from "./../../assets/tag.svg"
import { getMovieUrl } from "../../utility/getMovieUrl";
import { useContext, useState } from "react";
import DetailsModal from "./DetailsModal";
import { CardContext } from "../../contexts/CardContext";

export default function MovieCard({ movie }: { movie: any }) {
    const [isOpen, setModalOpen] = useState<boolean>(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const { card, setCard } = useContext(CardContext)!;

    const handleDetailsModal = (movie: any) => {
        setModalOpen(true);
        setSelectedMovie(movie)
    }

    const hanleClose = () => {
        setModalOpen(false);
    }

    const handleAddCard = (event: any, movie: any) => {
        event.stopPropagation();
        const exist = card.find((item) => item.id == movie.id);
        if (exist) {
            alert('Already added to the card');
        }
        if (!exist) {
            setCard([...card, movie])
        }
    }

    return (
        <div>
            {isOpen && (
                <DetailsModal
                    onClose={hanleClose}
                    movie={selectedMovie}
                />
            )}
            <button
                type="button"
                onClick={() => handleDetailsModal(movie)}
            >
                <figure className="p-4 border border-black/10 shadow-sm dark:border-white/10 rounded-xl">
                    <img className="w-full object-cover" src={getMovieUrl(movie.cover)} alt={movie.title} />
                    <figcaption className="pt-4">
                        <h3 className="text-xl mb-1 text-black">{movie.title}</h3>
                        <p className="text-[#575A6E] text-sm mb-2">{movie.genre}</p>
                        <div className="flex items-center space-x-1 mb-5">
                            <Rating value={movie.rating} />
                        </div>
                        <a className="bg-primary rounded-lg py-2 px-5 flex items-center justify-center gap-2 text-[#171923] font-semibold text-sm"
                            href="#"
                            onClick={(e: any) => handleAddCard(e, movie)}
                        >
                            <img src={tag} alt="tag" />
                            <span>${movie.price} | Add to Cart</span>
                        </a>
                    </figcaption>
                </figure>
            </button>

        </div>
    )
}
