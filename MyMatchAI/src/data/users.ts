
export type InterestCategory = 
  | 'financial' 
  | 'lifestyle' 
  | 'shopping' 
  | 'travel' 
  | 'technology'
  | 'health'
  | 'entertainment';

export type Interest = {
  id: string;
  name: string;
  category: InterestCategory;
};

export type SocialMediaActivity = 'low' | 'medium' | 'high';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  gender: string;
  occupation: string;
  location: string;
  avatar: string;
  bio: string;
  phoneNumber: string;
  interests: Interest[];
  purchaseHistory: PurchaseHistory[];
  engagementScore: number; // 1-100
  sentimentScore: number; // 1-10
  socialMediaActivity: SocialMediaActivity;
};

export type PurchaseHistory = {
  id: string;
  productName: string;
  category: string;
  price: number;
  date: string;
};

// Sample data
const interests: Record<string, Interest> = {
  homeLoan: {
    id: 'homeLoan',
    name: 'Home Loan',
    category: 'financial'
  },
  retirementSavings: {
    id: 'retirementSavings',
    name: 'Retirement Savings',
    category: 'financial'
  },
  etfs: {
    id: 'etfs',
    name: 'ETFs',
    category: 'financial'
  },
  budgetShopping: {
    id: 'budgetShopping',
    name: 'Budget Shopping',
    category: 'shopping'
  },
  dining: {
    id: 'dining',
    name: 'Dining',
    category: 'lifestyle'
  },
  mortgagePayments: {
    id: 'mortgagePayments',
    name: 'Mortgage Payments',
    category: 'financial'
  },
  sports: {
    id: 'sports',
    name: 'Sports',
    category: 'lifestyle'
  },
  travel: {
    id: 'travel',
    name: 'Travel',
    category: 'travel'
  },
  gadgets: {
    id: 'gadgets',
    name: 'Gadgets',
    category: 'technology'
  },
  discounts: {
    id: 'discounts',
    name: 'Discounts',
    category: 'shopping'
  },
  newArrivals: {
    id: 'newArrivals',
    name: 'New Arrivals',
    category: 'shopping'
  },
  travelCreditCards: {
    id: 'travelCreditCards',
    name: 'Travel Credit Cards',
    category: 'financial'
  },
  books: {
    id: 'books',
    name: 'Books',
    category: 'lifestyle'
  },
  meditation: {
    id: 'meditation',
    name: 'Meditation',
    category: 'health'
  },
  yoga: {
    id: 'yoga',
    name: 'Yoga',
    category: 'health'
  }
};

export const users: User[] = [
  {
    id: '1',
    firstName: 'Isha',
    lastName: 'Gupta',
    email: 'isha@example.com',
    age: 23,
    gender: 'Female',
    occupation: 'Software Engineer',
    location: 'New York City',
    avatar: '/avatar-isha.jpg', // We'll handle default avatar in the UI
    bio: 'Software engineer with a passion for financial planning and sports.',
    phoneNumber: '+1 (555) 123-4567',
    interests: [
      interests.homeLoan,
      interests.retirementSavings,
      interests.etfs,
      interests.budgetShopping,
      interests.dining,
      interests.mortgagePayments,
      interests.sports,
      interests.travel,
      interests.gadgets
    ],
    purchaseHistory: [
      {
        id: 'p1',
        productName: 'Financial Planning Book',
        category: 'Books',
        price: 24.99,
        date: '2023-09-15'
      },
      {
        id: 'p2',
        productName: 'Running Shoes',
        category: 'Sports',
        price: 129.99,
        date: '2023-10-02'
      },
      {
        id: 'p3',
        productName: 'Smart Watch',
        category: 'Gadgets',
        price: 349.99,
        date: '2023-11-28'
      }
    ],
    engagementScore: 78,
    sentimentScore: 8,
    socialMediaActivity: 'high'
  },
  {
    id: '2',
    firstName: 'Nikitha',
    lastName: 'M',
    email: 'nikitha@example.com',
    age: 32,
    gender: 'Female',
    occupation: 'Manager',
    location: 'San Francisco',
    avatar: '/avatar-nikitha.jpg', // We'll handle default avatar in the UI
    bio: 'Manager who enjoys finding great deals, reading, and wellness activities.',
    phoneNumber: '+1 (555) 987-6543',
    interests: [
      interests.discounts,
      interests.newArrivals,
      interests.travelCreditCards,
      interests.books,
      interests.meditation,
      interests.yoga
    ],
    purchaseHistory: [
      {
        id: 'p4',
        productName: 'Yoga Mat',
        category: 'Fitness',
        price: 65.99,
        date: '2023-08-22'
      },
      {
        id: 'p5',
        productName: 'Bestseller Novel',
        category: 'Books',
        price: 19.99,
        date: '2023-09-08'
      },
      {
        id: 'p6',
        productName: 'Meditation App Subscription',
        category: 'Digital',
        price: 79.99,
        date: '2023-12-01'
      }
    ],
    engagementScore: 85,
    sentimentScore: 9,
    socialMediaActivity: 'medium'
  }
];

// For testing/development: this function returns a user by their email
export const getUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
};
