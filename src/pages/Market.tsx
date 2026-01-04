import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Input } from '@/components/ui/input';
import { TrendingUp, Search, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function Market() {
  const { marketPrices } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('');

  const states = [...new Set(marketPrices.map(p => p.state))];
  
  const filteredPrices = marketPrices.filter(price => {
    const matchesSearch = price.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         price.market.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = !selectedState || price.state === selectedState;
    return matchesSearch && matchesState;
  });

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Market Prices</h1>
              <p className="text-muted-foreground">Real-time mandi prices for all major crops</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="glass-card rounded-2xl p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search crop or market..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12"
              />
            </div>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="h-12 px-4 rounded-lg border border-input bg-background text-foreground min-w-[200px]"
            >
              <option value="">All States</option>
              {states.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Price Legend */}
        <div className="flex flex-wrap gap-4 mb-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-muted-foreground" />
            <span className="text-muted-foreground">Min Price</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">Modal Price (Most Common)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="text-muted-foreground">Max Price</span>
          </div>
        </div>

        {/* Price Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPrices.map((price, index) => {
            // Simulate price change (for visual demo)
            const changePercent = ((Math.random() - 0.4) * 10).toFixed(1);
            const isPositive = parseFloat(changePercent) > 0;
            
            return (
              <div key={price.id} className="glass-card rounded-2xl p-6 hover-lift">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{price.cropName}</h3>
                    {price.variety && (
                      <p className="text-sm text-muted-foreground">{price.variety}</p>
                    )}
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-success' : 'text-destructive'}`}>
                    {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    {changePercent}%
                  </div>
                </div>

                <div className="flex items-end justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Modal Price</p>
                    <p className="text-3xl font-bold text-primary">₹{price.modalPrice}</p>
                    <p className="text-xs text-muted-foreground">per quintal</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Min: </span>
                      <span className="font-medium text-foreground">₹{price.minPrice}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Max: </span>
                      <span className="font-medium text-success">₹{price.maxPrice}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{price.market}</span>
                    <span className="text-muted-foreground">{price.state}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredPrices.length === 0 && (
          <div className="glass-card rounded-2xl p-12 text-center">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Results Found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-8 p-4 rounded-xl bg-muted/50 text-center">
          <p className="text-sm text-muted-foreground">
            Prices are indicative and may vary. Please verify with local mandi for actual rates.
            Last updated: {new Date().toLocaleString('en-IN')}
          </p>
        </div>
      </div>
    </div>
  );
}
