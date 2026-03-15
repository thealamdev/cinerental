import rating from "./../../assets/star.svg";

export default function Rating({ value }: { value: number }) {
    const image = <img src={rating} width="14" height="14" alt="rating" />;

    return (
        <div className="flex gap-2">
            {Array(value).fill(image).map((item: any) => (
                item
            ))}
        </div>
    )
}
