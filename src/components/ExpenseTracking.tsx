import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Plus, TrendingDown, DollarSign, Calendar, Edit, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

const ExpenseTracking = () => {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      description: 'Pembelian Galon Kosong',
      category: 'Operasional',
      amount: 2500000,
      date: '2024-01-15',
      supplier: 'CV Plastik Jaya'
    },
    {
      id: 2,
      description: 'Biaya Listrik',
      category: 'Utilitas',
      amount: 450000,
      date: '2024-01-14',
      supplier: 'PLN'
    },
    {
      id: 3,
      description: 'Gaji Karyawan',
      category: 'SDM',
      amount: 3200000,
      date: '2024-01-10',
      supplier: '-'
    },
    {
      id: 4,
      description: 'Maintenance Mesin',
      category: 'Maintenance',
      amount: 750000,
      date: '2024-01-08',
      supplier: 'Bengkel Teknik'
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const form = useForm({
    defaultValues: {
      description: '',
      category: '',
      amount: '',
      date: '',
      supplier: ''
    }
  });

  const monthlyStats = {
    totalExpenses: expenses.reduce((total, expense) => total + expense.amount, 0),
    totalTransactions: expenses.length,
    averageExpense: expenses.length > 0 ? expenses.reduce((total, expense) => total + expense.amount, 0) / expenses.length : 0
  };

  const handleAddExpense = (data) => {
    const newExpense = {
      id: Math.max(...expenses.map(e => e.id), 0) + 1,
      ...data,
      amount: parseInt(data.amount)
    };
    setExpenses([...expenses, newExpense]);
    setIsDialogOpen(false);
    form.reset();
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    form.reset({ ...expense, amount: expense.amount.toString() });
    setIsDialogOpen(true);
  };

  const handleUpdateExpense = (data) => {
    setExpenses(expenses.map(e => 
      e.id === editingExpense.id ? { ...e, ...data, amount: parseInt(data.amount) } : e
    ));
    setIsDialogOpen(false);
    setEditingExpense(null);
    form.reset();
  };

  const handleDeleteExpense = (expenseId) => {
    setExpenses(expenses.filter(e => e.id !== expenseId));
  };

  const onSubmit = (data) => {
    if (editingExpense) {
      handleUpdateExpense(data);
    } else {
      handleAddExpense(data);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Pengeluaran</h2>
          <p className="text-muted-foreground">Lacak dan kelola pengeluaran depot Anda</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" onClick={() => {
              setEditingExpense(null);
              form.reset();
            }}>
              <Plus className="w-4 h-4" />
              Tambah Pengeluaran
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingExpense ? 'Edit Pengeluaran' : 'Tambah Pengeluaran'}</DialogTitle>
              <DialogDescription>
                {editingExpense ? 'Ubah data pengeluaran' : 'Masukkan data pengeluaran baru'}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deskripsi</FormLabel>
                      <FormControl>
                        <Input placeholder="Deskripsi pengeluaran" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kategori</FormLabel>
                      <FormControl>
                        <Input placeholder="Kategori pengeluaran" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jumlah</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Jumlah pengeluaran" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tanggal</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="supplier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Supplier/Vendor</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama supplier atau vendor" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">
                    {editingExpense ? 'Update' : 'Tambah'}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pengeluaran</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp {monthlyStats.totalExpenses.toLocaleString('id-ID')}</div>
            <p className="text-xs text-muted-foreground">Bulan ini</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transaksi</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthlyStats.totalTransactions}</div>
            <p className="text-xs text-muted-foreground">Pengeluaran bulan ini</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rata-rata Pengeluaran</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp {monthlyStats.averageExpense.toLocaleString('id-ID')}</div>
            <p className="text-xs text-muted-foreground">Per transaksi</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Pengeluaran</CardTitle>
          <CardDescription>Riwayat pengeluaran depot Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Deskripsi</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Jumlah</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Supplier/Vendor</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.description}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{expense.category}</Badge>
                  </TableCell>
                  <TableCell className="text-red-600">-Rp {expense.amount.toLocaleString('id-ID')}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>{expense.supplier}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEditExpense(expense)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDeleteExpense(expense.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseTracking;