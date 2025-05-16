import { FaAppleAlt, FaCarrot, FaList, FaSeedling } from 'react-icons/fa';
import { GiMeat, GiOpenedFoodCan } from 'react-icons/gi';
import { LuMilk } from 'react-icons/lu';

export const CATEGORIES = [
  { id: 1, name: 'Todo', icon: <FaList /> },
  { id: 2, name: 'Semillas', icon: <FaSeedling /> },
  { id: 3, name: 'Enlatados', icon: <GiOpenedFoodCan /> },
  { id: 4, name: 'Lácteos', icon: <LuMilk /> },
  { id: 5, name: 'Verduras', icon: <FaCarrot /> },
  { id: 6, name: 'Frutas', icon: <FaAppleAlt /> },
  { id: 7, name: 'Proteínas', icon: <GiMeat /> },
];
