
import { PurchaseHistory } from "@/data/users";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Calendar, DollarSign } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';

interface TransactionHistoryProps {
  transactions: PurchaseHistory[];
}

const TransactionHistory = ({ transactions }: TransactionHistoryProps) => {
  // Sort transactions by date (most recent first)
  const sortedTransactions = [...transactions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-primary" />
          Recent Transactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <p className="text-sm text-muted-foreground">No transaction history available.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.productName}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    {formatDistanceToNow(new Date(transaction.date), { addSuffix: true })}
                  </TableCell>
                  <TableCell className="text-right flex items-center justify-end gap-1">
                    <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                    {transaction.price.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
