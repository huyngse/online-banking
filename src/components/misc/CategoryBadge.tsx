import { transactionCategoryStyles } from "@/constants";
import { cn } from "@/lib/utils";
import { TransactionCategory } from "@/types/Plaid";

interface CategoryBadgeProps {
  category: string;
}
const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  const { backgroundColor, borderColor, chipBackgroundColor, textColor } =
    transactionCategoryStyles[category as TransactionCategory] ||
    transactionCategoryStyles.default;
  return (
    <div className={cn("category-badge", borderColor, chipBackgroundColor)}>
      <div className={cn("size-2 rounded-full", backgroundColor)} />
      <p className={cn("text-[12px] font-medium", textColor)}>{category}</p>
    </div>
  );
};

export default CategoryBadge;
