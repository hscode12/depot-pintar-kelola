import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, TrendingUp, DollarSign, Calendar } from 'lucide-react';

const RevenueTracking = () => {
  const recentTransactions = [
    {
      id: 1,
      customer: 'Ibu Sari Wulandari',
      amount: 45000,
      quantity: '3 Galon',
      date: '2024-01-15',
      time: '14:30',
      type: 'Penjualan'
    },
    {
      id: 2,
      customer: 'Toko Berkah Jaya',
      amount: 150000,
      quantity: '10 Galon',
      date: '2024-01-15',
      time: '12:15',
      type: 'Penjualan'
    },
    {
      id: 3,
      customer: 'Pak Joko Santoso',
      amount: 60000,
      quantity: '4 Galon',
      date: '2024-01-14',
      time: '16:45',
      type: 'Penjualan'
    },
    {
      id: 4,
      customer: 'Warung Mina Segar',
      amount: 90000,
      quantity: '6 Galon',
      date: '2024-01-14',
      time: '10:20',
      type: 'Penjualan'
    },
  ];

  const monthlyStats = {
    totalRevenue: 12500000,
    totalTransactions: 245,
    averageOrder: 51020,
    growth: 12.5
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Pendapatan</h2>
          <p className="text-muted-foreground">Lacak dan analisis pendapatan depot Anda</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Tambah Transaksi
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pendapatan</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp {monthlyStats.totalRevenue.toLocaleString('id-ID')}</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Bulan ini</span>
              <span className="text-success font-medium">+{monthlyStats.growth}%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transaksi</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthlyStats.totalTransactions}</div>
            <p className="text-xs text-muted-foreground">Transaksi bulan ini</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rata-rata Order</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp {monthlyStats.averageOrder.toLocaleString('id-ID')}</div>
            <p className="text-xs text-muted-foreground">Per transaksi</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hari Ini</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 485.000</div>
            <p className="text-xs text-muted-foreground">15 transaksi</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaksi Terbaru</CardTitle>
          <CardDescription>Riwayat penjualan 30 hari terakhir</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{transaction.customer}</h3>
                      <p className="text-sm text-muted-foreground">{transaction.quantity}</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-success">
                    +Rp {transaction.amount.toLocaleString('id-ID')}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {transaction.date} • {transaction.time}
                  </div>
                  <Badge variant="secondary" className="mt-1">
                    {transaction.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenueTracking;