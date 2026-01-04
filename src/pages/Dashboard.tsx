import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { 
  Sprout, 
  TrendingUp, 
  Landmark, 
  Calendar, 
  BarChart3,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const { profile } = useAuth();
  const { crops, marketPrices, schemes } = useData();

  // Calculate stats
  const totalCrops = crops.length;
  const activeCrops = crops.filter(c => c.status === 'growing' || c.status === 'sown').length;
  const harvestedCrops = crops.filter(c => c.status === 'harvested').length;
  const totalYield = crops.reduce((sum, c) => sum + (c.yieldEstimate || 0), 0);

  // Get upcoming harvests
  const upcomingHarvests = crops
    .filter(c => c.status !== 'harvested' && c.status !== 'failed')
    .sort((a, b) => new Date(a.expectedHarvestDate).getTime() - new Date(b.expectedHarvestDate).getTime())
    .slice(0, 3);

  // Get relevant schemes
  const activeSchemes = schemes.filter(s => !s.deadline || new Date(s.deadline) > new Date());

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Namaste, {profile?.name || 'Farmer'}! 🙏
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's an overview of your farm and latest updates
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { 
              label: 'Total Crops', 
              value: totalCrops, 
              icon: Sprout, 
              color: 'primary',
              change: '+2 this season',
              positive: true
            },
            { 
              label: 'Active Crops', 
              value: activeCrops, 
              icon: Calendar, 
              color: 'success',
              change: `${harvestedCrops} harvested`,
              positive: true
            },
            { 
              label: 'Total Acreage', 
              value: `${profile?.totalAcreage || 0} ac`, 
              icon: BarChart3, 
              color: 'accent',
              change: 'Under cultivation',
              positive: true
            },
            { 
              label: 'Est. Yield', 
              value: `${totalYield} q`, 
              icon: TrendingUp, 
              color: 'info',
              change: 'Quintals expected',
              positive: true
            },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="glass-card rounded-2xl p-6 hover-lift">
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-xl bg-${stat.color}/20 flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-primary`} />
                  </div>
                  {stat.positive ? (
                    <ArrowUpRight className="w-5 h-5 text-success" />
                  ) : (
                    <ArrowDownRight className="w-5 h-5 text-destructive" />
                  )}
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">{stat.change}</div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Market Prices */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">Today's Market Prices</h2>
                </div>
                <Link to="/market">
                  <Button variant="ghost" size="sm">View All</Button>
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 text-sm font-medium text-muted-foreground">Crop</th>
                      <th className="text-left py-3 text-sm font-medium text-muted-foreground">Market</th>
                      <th className="text-right py-3 text-sm font-medium text-muted-foreground">Min</th>
                      <th className="text-right py-3 text-sm font-medium text-muted-foreground">Max</th>
                      <th className="text-right py-3 text-sm font-medium text-muted-foreground">Modal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marketPrices.slice(0, 5).map((price) => (
                      <tr key={price.id} className="border-b border-border/50 hover:bg-muted/30">
                        <td className="py-4">
                          <div className="font-medium text-foreground">{price.cropName}</div>
                          <div className="text-xs text-muted-foreground">{price.variety}</div>
                        </td>
                        <td className="py-4 text-muted-foreground">{price.market}</td>
                        <td className="py-4 text-right text-muted-foreground">₹{price.minPrice}</td>
                        <td className="py-4 text-right text-muted-foreground">₹{price.maxPrice}</td>
                        <td className="py-4 text-right font-semibold text-primary">₹{price.modalPrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Upcoming Harvests */}
            <div className="glass-card rounded-2xl p-6 mt-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-success" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">Upcoming Harvests</h2>
                </div>
                <Link to="/crops">
                  <Button variant="ghost" size="sm">Manage Crops</Button>
                </Link>
              </div>

              {upcomingHarvests.length > 0 ? (
                <div className="space-y-4">
                  {upcomingHarvests.map((crop) => (
                    <div key={crop.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                          <Sprout className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{crop.name}</div>
                          <div className="text-sm text-muted-foreground">{crop.acreage} acres</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-foreground">
                          {new Date(crop.expectedHarvestDate).toLocaleDateString('en-IN', { 
                            day: 'numeric', 
                            month: 'short' 
                          })}
                        </div>
                        <div className="text-sm text-muted-foreground">Expected</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Sprout className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No crops added yet</p>
                  <Link to="/crops" className="mt-4 inline-block">
                    <Button variant="outline" size="sm">Add Your First Crop</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Government Schemes */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-info/20 flex items-center justify-center">
                  <Landmark className="w-5 h-5 text-info" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Active Schemes</h2>
              </div>

              <div className="space-y-4">
                {activeSchemes.slice(0, 3).map((scheme) => (
                  <div key={scheme.id} className="p-4 rounded-xl bg-muted/50 hover:bg-muted/70 transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">{scheme.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {scheme.description}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        scheme.category === 'subsidy' ? 'bg-success/20 text-success' :
                        scheme.category === 'insurance' ? 'bg-info/20 text-info' :
                        scheme.category === 'loan' ? 'bg-warning/20 text-warning' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {scheme.category}
                      </span>
                    </div>
                    {scheme.deadline && (
                      <div className="mt-3 flex items-center gap-2 text-xs text-warning">
                        <AlertTriangle className="w-4 h-4" />
                        Deadline: {new Date(scheme.deadline).toLocaleDateString('en-IN')}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <Link to="/schemes" className="block mt-4">
                <Button variant="outline" className="w-full">View All Schemes</Button>
              </Link>
            </div>

            {/* Quick Actions */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link to="/crops" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Sprout className="w-5 h-5 mr-3" />
                    Add New Crop
                  </Button>
                </Link>
                <Link to="/assistant" className="block">
                  <Button variant="hero" className="w-full justify-start">
                    <CheckCircle className="w-5 h-5 mr-3" />
                    Ask AI Assistant
                  </Button>
                </Link>
              </div>
            </div>

            {/* Weather Alert (Placeholder) */}
            <div className="bg-info/10 border border-info/30 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-info/20 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-info" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Weather Advisory</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Moderate rainfall expected in your area this week. Good time for sowing rabi crops.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
