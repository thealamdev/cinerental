import logo from './assets/logo.svg';
import ring from './assets/ring.svg';
import sum from './assets/icons/sun.svg';
import ShopingCard from './assets/shopping-cart.svg';
import { useContext } from 'react';
import { CardContext } from './contexts/CardContext';

export default function Header() {
    const { card, setCard } = useContext(CardContext)!;
    return (
        <header>
            <nav className="container flex items-center justify-between space-x-10 py-6">
                <a href="index.html">
                    <img src={logo} width="139" height="26" alt="logo" />
                </a>

                <ul className="flex items-center space-x-5">
                    <li>
                        <a className="bg-primary/20 dark:bg-primary/[7%] rounded-lg backdrop-blur-[2px] p-1 inline-block" href="#">
                            <img src={ring} width="24" height="24" alt="ring" />
                        </a>
                    </li>
                    <li>
                        <a className="bg-primary/20 dark:bg-primary/[7%] rounded-lg backdrop-blur-[2px] p-1 inline-block" href="#">
                            <img src={sum} width="24" height="24" alt="sun" />
                        </a>
                    </li>
                    <li>
                        <a className="relative bg-primary/20 dark:bg-primary/[7%] rounded-lg backdrop-blur-[2px] p-1 inline-block" href="#">
                            <img src={ShopingCard} width="24" height="24" alt="" />
                            <div className='absolute flex justify-center items-center -top-2 -right-2 w-4 h-4 rounded-full bg-red-500 text-white'>
                                <p>{card && card.length}</p>
                            </div>
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
