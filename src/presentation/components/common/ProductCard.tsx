import React, { useMemo } from 'react';
import { BiFoodMenu } from 'react-icons/bi';
import { FaAppleAlt, FaCarrot, FaSeedling } from 'react-icons/fa';
import { FiClock, FiInfo } from 'react-icons/fi';
import { GiMeat, GiOpenedFoodCan } from 'react-icons/gi';
import { LuMilk } from 'react-icons/lu';
import { IProduct } from '../../../shared/interfaces/Product';

/**
 * Parse a date string in format DD/MM/YYYY to a Date object
 * Using UTC to prevent timezone issues with dates
 */
const parseCustomDate = (dateString: string): Date | null => {
  if (!dateString) return null;

  const [day, month, year] = dateString.split('/');
  if (!day || !month || !year) return null;

  // Create date ensuring valid values using UTC to prevent timezone shifts
  const parsedDate = new Date(
    Date.UTC(Number(year), Number(month) - 1, Number(day))
  );
  return isNaN(parsedDate.getTime()) ? null : parsedDate;
};

/**
 * Calculate days remaining until a date
 */
const calculateDaysRemaining = (date: Date): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Create UTC date for today to match with the UTC dates from parseCustomDate
  const todayUTC = new Date(
    Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())
  );

  return Math.ceil((date.getTime() - todayUTC.getTime()) / (1000 * 3600 * 24));
};

// Define product status types for better type safety
type ProductStatus = 'disponible' | 'agotado' | 'descontinuado';

// Configuration for status visual styling
const STATUS_CONFIG: Record<
  ProductStatus,
  {
    color: string;
    bgColor: string;
    borderColor: string;
    icon: React.ReactNode;
    textColor: string;
  }
> = {
  disponible: {
    color: 'bg-green-100',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-800',
    icon: <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>,
  },
  agotado: {
    color: 'bg-red-100',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-800',
    icon: <FiClock className="w-3 h-3 mr-1" />,
  },
  descontinuado: {
    color: 'bg-gray-100',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    textColor: 'text-gray-800',
    icon: <FiInfo className="w-3 h-3 mr-1" />,
  },
};

// Mapping of categories to their respective icons
const CATEGORY_ICONS: Record<string, { icon: React.ReactNode; color: string }> =
  {
    Semillas: { icon: <FaSeedling />, color: 'text-green-600' },
    Enlatados: { icon: <GiOpenedFoodCan />, color: 'text-blue-600' },
    Lacteos: { icon: <LuMilk />, color: 'text-blue-400' },
    Verduras: { icon: <FaCarrot />, color: 'text-orange-600' },
    Frutas: { icon: <FaAppleAlt />, color: 'text-red-600' },
    Proteinas: { icon: <GiMeat />, color: 'text-pink-700' },
    default: { icon: <BiFoodMenu />, color: 'text-amber-600' },
  };

interface FreshnessIndicatorProps {
  daysRemaining: number | null;
  isExpired: boolean;
  isTodayExpiration: boolean;
  expirationDate: string | null;
}

const FreshnessIndicator: React.FC<FreshnessIndicatorProps> = ({
  daysRemaining,
  isExpired,
  isTodayExpiration,
  expirationDate,
}) => {
  if (daysRemaining === null) return null;

  if (isExpired) {
    return (
      <span className="text-xs px-3 py-1 rounded-full bg-red-100 text-red-800 border border-red-200 font-medium inline-flex items-center">
        <FiInfo className="w-3 h-3 mr-1" />
        Caducado el {expirationDate}
      </span>
    );
  }

  if (isTodayExpiration) {
    return (
      <span className="text-xs px-3 py-1 rounded-full bg-orange-100 text-orange-800 border border-orange-200 font-medium inline-flex items-center">
        <FiClock className="w-3 h-3 mr-1" />
        Consumir hoy
      </span>
    );
  }

  if (daysRemaining <= 3) {
    return (
      <span className="text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200 font-medium inline-flex items-center">
        <FiClock className="w-3 h-3 mr-1" />
        Caduca en {daysRemaining} días
      </span>
    );
  }

  return (
    <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 border border-green-200 font-medium inline-flex items-center">
      <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>
      Caduca el {expirationDate}
    </span>
  );
};

interface ProductCardProps {
  product: IProduct;
  onReserve?: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onReserve,
}) => {
  // Extract and normalize product status
  const status = (product.status?.toLowerCase() ||
    'disponible') as ProductStatus;
  const statusConfig = STATUS_CONFIG[status] || STATUS_CONFIG.disponible;

  // Get category styling
  const categoryConfig =
    CATEGORY_ICONS[product.category] || CATEGORY_ICONS.default;

  // Process expiration date
  const parsedDate = useMemo(
    () => parseCustomDate(product.expiration_date),
    [product.expiration_date]
  );

  // Create today's date in UTC to match with parsed date
  const today = new Date();
  const todayUTC = new Date(
    Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())
  );

  // Determine expiration status
  const isExpired = parsedDate ? parsedDate < todayUTC : false;
  const isTodayExpiration = parsedDate
    ? parsedDate.getUTCDate() === todayUTC.getUTCDate() &&
      parsedDate.getUTCMonth() === todayUTC.getUTCMonth() &&
      parsedDate.getUTCFullYear() === todayUTC.getUTCFullYear()
    : false;

  const formattedExpirationDate = parsedDate
    ? `${String(parsedDate.getUTCDate()).padStart(2, '0')}/${String(
        parsedDate.getUTCMonth() + 1
      ).padStart(2, '0')}/${parsedDate.getUTCFullYear()}`
    : null;

  // Calculate days remaining until expiration
  const daysRemaining = useMemo(
    () => (parsedDate ? calculateDaysRemaining(parsedDate) : null),
    [parsedDate]
  );

  // Handle reserve action
  const handleReserve = () => {
    if (onReserve && product.quantity > 0 && !isExpired) {
      onReserve(product.id);
    }
  };

  const isAvailable = product.quantity > 0 && !isExpired;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col h-full group">
      {/* Image Container with Hover Effect */}
      <div className="relative h-52 overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.food_name}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Status Badge */}
        <div
          className={`absolute top-3 right-3 ${statusConfig.color} ${statusConfig.textColor} text-xs font-medium px-2 py-1 rounded-full border ${statusConfig.borderColor} flex items-center shadow-sm`}
          aria-label={`Estado: ${product.status}`}
        >
          {statusConfig.icon}
          {product.status}
        </div>

        {/* Quantity Badge */}
        {product.quantity > 0 && (
          <div
            className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium px-2 py-1 rounded-full border border-gray-200 shadow-sm"
            aria-label={`Cantidad disponible: ${product.quantity}`}
          >
            {product.quantity} {product.quantity === 1 ? 'unidad' : 'unidades'}
          </div>
        )}
      </div>

      {/* Content */}
      <div
        className={`p-4 flex flex-col flex-grow ${
          isAvailable ? '' : 'opacity-75'
        }`}
      >
        {/* Category Tag */}
        <div className="mb-4">
          <span
            className={`inline-flex items-center gap-1 text-xs ${categoryConfig.color} font-medium px-2 py-1 rounded-full bg-gray-100 border border-gray-200`}
          >
            <span className={categoryConfig.color}>{categoryConfig.icon}</span>
            {product.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-gray-800 mb-4 line-clamp-2">
          {product.food_name}
        </h3>

        {/* Expiration Section - Unified with badge */}
        <div className="mb-4">
          {parsedDate && (
            <FreshnessIndicator
              daysRemaining={daysRemaining}
              isExpired={isExpired}
              isTodayExpiration={isTodayExpiration}
              expirationDate={formattedExpirationDate}
            />
          )}
        </div>

        {/* Spacer to push action bar to bottom */}
        <div className="flex-grow"></div>

        {/* Action Bar */}
        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-400">
          <span className="text-green-700 font-medium text-sm">Donación</span>
          <button
            onClick={handleReserve}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1 ${
              isAvailable
                ? 'bg-green-600 hover:bg-green-700 active:bg-green-800 text-white hover:shadow-md'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            disabled={!isAvailable}
            aria-label={
              isExpired
                ? 'Producto caducado'
                : product.quantity > 0
                ? 'Apartar este producto'
                : 'Producto agotado'
            }
          >
            {product.quantity === 0 ? 'Agotado' : 'Apartar'}
          </button>
        </div>
      </div>
    </div>
  );
};
