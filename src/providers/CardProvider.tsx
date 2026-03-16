import { useState } from "react";
import { CardContext } from "../contexts/CardContext";

export interface CardInfo {
    id: string;
    cover: string;
    title: string;
    description: string;
    genre: string;
    rating: number;
    price: number;
}

interface PageProps {
    children: React.ReactNode
}
export default function CardProvider({
    children
}: PageProps) {
    const [card, setCard] = useState<CardInfo[]>([]);
    return (
        <CardContext.Provider value={{
            card,
            setCard
        }}>
            {children}
        </CardContext.Provider>
    )
}
