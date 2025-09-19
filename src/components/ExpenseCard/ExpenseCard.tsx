import React from 'react';
import './ExpenseCard.css';

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

/**
 * Displays a single expense item with formatted currency and professional styling
 * @param {Object} props - Component props
 * @param {number} props.id - Unique identifier for the expense entry
 * @param {string} props.description - Human-readable description of the expense
 * @param {number} props.amount - Expense amount in dollars (will be formatted as currency)
 * @param {string} props.category - Expense category for organization and filtering
 * @param {string} props.date - Date when expense occurred (ISO string format)
 */

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
    // UPDATED
    <article className={`expense-card ${highlighted ? 'expense-card--highlighted' : ''}`}>
      <div className="expense-header">
        // UPDATED
        {showCategory && (
          <span className="expense-category">{category}</span>
        )}
        <time className="expense-date" dateTime={date}>
          {formattedDate}
        </time>
      </div>
      
      <div className="expense-body">
        <h3 className="expense-description">{description}</h3>
        <p className="expense-amount">{formattedAmount}</p>
        
        // UPDATED
        {onDelete && (
          <button 
            className="expense-delete" 
            onClick={handleDelete}
            aria-label="Delete expense"
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              cursor: 'pointer',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ×
          </button>
        )}
      </div>
    </article>
  );
};


export default ExpenseCard;