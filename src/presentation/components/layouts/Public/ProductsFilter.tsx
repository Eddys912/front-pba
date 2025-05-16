import { Container } from '../../common/Container';
import { CATEGORIES } from '../../../../shared/constants/product.constants';

interface ProductsFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export const ProductsFilter: React.FC<ProductsFilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const handleCategoryClick = (categoryName: string) => {
    onSelectCategory(selectedCategory === categoryName ? null : categoryName);
  };

  return (
    <Container>
      <nav className="py-4 grid grid-cols-4 gap-2 md:flex md:flex-wrap md:justify-center md:gap-8 pt-32 md:pt-20">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.name)}
            className={`cursor-pointer transition duration-300 rounded-lg shadow-md ${
              selectedCategory === category.name
                ? 'bg-teal-700 text-white'
                : 'bg-white text-gray-700 hover:bg-teal-700 hover:text-white'
            } flex items-center px-4 py-2 md:justify-between`}
          >
            <span className="md:text-xl md:mr-2 text-2xl">{category.icon}</span>
            <span className="md:font-medium text-xs text-center">
              {category.name}
            </span>
          </button>
        ))}
      </nav>
    </Container>
  );
};
