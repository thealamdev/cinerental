import { createContext } from "react";
import type { CardInfo } from "../providers/CardProvider";

interface ContextInterface {
    card: CardInfo[],
    setCard: React.Dispatch<React.SetStateAction<any[]>>
}

export const CardContext = createContext<ContextInterface | null>(null);