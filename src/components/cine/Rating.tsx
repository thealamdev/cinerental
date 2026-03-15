import rating from "./../../assets/star.svg";

export default function Rating({ value }: { value: number }) {
    return (
        <div className="flex gap-2">
            {Array.from({ length: value }).map((_, index) => (
                <img key={index} src={rating} width="14" height="14" alt="rating" />
            ))}
        </div>
    );
}
