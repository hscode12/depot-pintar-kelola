import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Plus, Search, Phone, MapPin, User, Edit, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

const CustomerManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'Ibu Sari Wulandari',
      phone: '0812-3456-7890',
      address: 'Jl. Mawar No. 15, Kelurahan Sukamaju',
      totalOrders: 45,
      totalSpent: 2250000,
      status: 'Aktif',
      lastOrder: '2 hari lalu'
    },
    {
      id: 2,
      name: 'Pak Joko Santoso',
      phone: '0821-9876-5432',
      address: 'Jl. Melati No. 8, Kelurahan Bahagia',
      totalOrders: 32,
      totalSpent: 1800000,
      status: 'Aktif',
      lastOrder: '1 minggu lalu'
    },
    {
      id: 3,
      name: 'Toko Berkah Jaya',
      phone: '0813-2468-1357',
      address: 'Jl. Raya Utama No. 45, Kelurahan Merdeka',
      totalOrders: 78,
      totalSpent: 4500000,
      status: 'Premium',
      lastOrder: '1 hari lalu'
    },
    {
      id: 4,
      name: 'Warung Mina Segar',
      phone: '0822-1357-9024',
      address: 'Jl. Pasar No. 12, Kelurahan Damai',
      totalOrders: 23,
      totalSpent: 1200000,
      status: 'Aktif',
      lastOrder: '3 hari lalu'
    },
  ]);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  
  const form = useForm({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      status: 'Aktif'
    }
  });

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const handleAddCustomer = (data) => {
    const newCustomer = {
      id: Math.max(...customers.map(c => c.id), 0) + 1,
      ...data,
      totalOrders: 0,
      totalSpent: 0,
      lastOrder: 'Belum ada'
    };
    setCustomers([...customers, newCustomer]);
    setIsDialogOpen(false);
    form.reset();
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    form.reset(customer);
    setIsDialogOpen(true);
  };

  const handleUpdateCustomer = (data) => {
    setCustomers(customers.map(c => 
      c.id === editingCustomer.id ? { ...c, ...data } : c
    ));
    setIsDialogOpen(false);
    setEditingCustomer(null);
    form.reset();
  };

  const handleDeleteCustomer = (customerId) => {
    setCustomers(customers.filter(c => c.id !== customerId));
  };

  const onSubmit = (data) => {
    if (editingCustomer) {
      handleUpdateCustomer(data);
    } else {
      handleAddCustomer(data);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Manajemen Pelanggan</h2>
          <p className="text-muted-foreground">Kelola data pelanggan depot Anda</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" onClick={() => {
              setEditingCustomer(null);
              form.reset();
            }}>
              <Plus className="w-4 h-4" />
              Tambah Pelanggan
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingCustomer ? 'Edit Pelanggan' : 'Tambah Pelanggan'}</DialogTitle>
              <DialogDescription>
                {editingCustomer ? 'Ubah data pelanggan' : 'Masukkan data pelanggan baru'}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama pelanggan" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telepon</FormLabel>
                      <FormControl>
                        <Input placeholder="Nomor telepon" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alamat</FormLabel>
                      <FormControl>
                        <Input placeholder="Alamat lengkap" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">
                    {editingCustomer ? 'Update' : 'Tambah'}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Pelanggan</CardTitle>
          <CardDescription>
            Total {customers.length} pelanggan terdaftar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama atau nomor telepon..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Telepon</TableHead>
                <TableHead>Alamat</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total Pesanan</TableHead>
                <TableHead>Total Belanja</TableHead>
                <TableHead>Pesanan Terakhir</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell className="max-w-xs truncate">{customer.address}</TableCell>
                  <TableCell>
                    <Badge variant={customer.status === 'Premium' ? 'default' : 'secondary'}>
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{customer.totalOrders}</TableCell>
                  <TableCell>Rp {customer.totalSpent.toLocaleString('id-ID')}</TableCell>
                  <TableCell>{customer.lastOrder}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEditCustomer(customer)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDeleteCustomer(customer.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredCustomers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Tidak ada pelanggan yang ditemukan</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerManagement;