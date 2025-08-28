import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Phone, MapPin, User } from 'lucide-react';

const CustomerManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const customers = [
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
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Manajemen Pelanggan</h2>
          <p className="text-muted-foreground">Kelola data pelanggan depot Anda</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Tambah Pelanggan
        </Button>
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

          <div className="grid gap-4">
            {filteredCustomers.map((customer) => (
              <Card key={customer.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{customer.name}</h3>
                          <Badge variant={customer.status === 'Premium' ? 'default' : 'secondary'}>
                            {customer.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span>{customer.phone}</span>
                          </div>
                          <div className="flex items-start gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{customer.address}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Total Pesanan: </span>
                            <span className="font-medium">{customer.totalOrders}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Total Belanja: </span>
                            <span className="font-medium">Rp {customer.totalSpent.toLocaleString('id-ID')}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Pesanan Terakhir: </span>
                            <span className="font-medium">{customer.lastOrder}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

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