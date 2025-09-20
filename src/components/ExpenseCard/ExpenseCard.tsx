import React from 'react';

export type ExpenseCategory = 'Food' | 'Transportation' | 'Entertainment' | 'Other';

// TypeScript interface defines the structure of props this component expects
// This acts like a contract - any parent component must provide these exact properties
export interface ExpenseCardProps {
  id: number;              // Unique identifier for each expense
  description: string;     // What the expense was for (e.g., "Lunch at Joe's Pizza")
  amount: number;         // Cost in dollars (will be formatted to show currency)
  category: ExpenseCategory;       // Type of expense (e.g., "Food", "Transportation")
  date: string;          // When the expense occurred (formatted as string)

  // Optional props (can be provided or omitted)
  onDelete?: (id: number) => void; // Callback for deleting this expense
  highlighted?: boolean;
  showCategory?: boolean;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({ 
  id, 
  description, 
  amount, 
  category, 
  date,
  highlighted = false,
  showCategory = true,
  onDelete 
}) => {
    
  // Format currency for professional display
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);

  // Format date for user-friendly display
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  //Handle delete action
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <article className={`
      relative
      bg-white rounded-lg p-4 mb-3 shadow-md
      transition-all duration-200 border
      hover:shadow-lg
      ${highlighted ? 'border-orange-500 bg-orange-50' : 'border-blue-500'}`}>
      <div className="flex justify-between items-center mb-2">
        {showCategory && (
          <span className="inline-block bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold uppercase">{category}</span>
        )}
        <time className="text-gray-500 text-sm" dateTime={date}>
          {formattedDate}
        </time>
      </div>
      
      <div className="space-y-2">
        <h3 className="mb-2 text-base font-medium text-gray-900">{description}</h3>
        <p className="text-green-600 text-lg font-bold m-0">{formattedAmount}</p>
        
        {onDelete && (
          <button 
            className="
            absolute top-2 right-2
            bg-red-500 hover:bg-red-600
            text-white border-0 rounded-full
            w-6 h-6 cursor-pointer text-base
            flex items-center justify-center
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-red-400
            " 
            onClick={handleDelete}
            aria-label="Delete expense"
          >
            x
          </button>
        )}
      </div>
    </article>
  );
};


export default ExpenseCard;