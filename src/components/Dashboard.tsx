import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Users, Droplets } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Pendapatan',
      value: 'Rp 12.500.000',
      description: 'Bulan ini',
      trend: '+12%',
      icon: TrendingUp,
      trendUp: true,
    },
    {
      title: 'Total Pengeluaran',
      value: 'Rp 8.200.000',
      description: 'Bulan ini',
      trend: '+5%',
      icon: TrendingDown,
      trendUp: false,
    },
    {
      title: 'Pelanggan Aktif',
      value: '347',
      description: 'Pelanggan terdaftar',
      trend: '+23',
      icon: Users,
      trendUp: true,
    },
    {
      title: 'Total Penjualan',
      value: '2,450 Galon',
      description: 'Bulan ini',
      trend: '+8%',
      icon: Droplets,
      trendUp: true,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <p className="text-muted-foreground">Ringkasan performa depot Anda</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{stat.description}</span>
                  <span className={`font-medium ${stat.trendUp ? 'text-success' : 'text-warning'}`}>
                    {stat.trend}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Penjualan Terbaru</CardTitle>
            <CardDescription>Transaksi 7 hari terakhir</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { customer: 'Ibu Sari', amount: 'Rp 45.000', gallons: '3 Galon', time: '2 jam lalu' },
                { customer: 'Pak Joko', amount: 'Rp 60.000', gallons: '4 Galon', time: '4 jam lalu' },
                { customer: 'Toko Berkah', amount: 'Rp 150.000', gallons: '10 Galon', time: '6 jam lalu' },
                { customer: 'Warung Mina', amount: 'Rp 90.000', gallons: '6 Galon', time: '8 jam lalu' },
              ].map((sale, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div>
                    <p className="font-medium">{sale.customer}</p>
                    <p className="text-sm text-muted-foreground">{sale.gallons}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{sale.amount}</p>
                    <p className="text-sm text-muted-foreground">{sale.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status Stok</CardTitle>
            <CardDescription>Inventory galon kosong dan isi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                  <span>Galon Isi</span>
                </div>
                <span className="font-semibold">156 buah</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-warning"></div>
                  <span>Galon Kosong</span>
                </div>
                <span className="font-semibold">43 buah</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-destructive"></div>
                  <span>Perlu Restock</span>
                </div>
                <span className="font-semibold">8 item</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;