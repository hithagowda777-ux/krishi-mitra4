import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { 
  Landmark, 
  ExternalLink, 
  Calendar, 
  CheckCircle, 
  AlertTriangle,
  Shield,
  Wallet,
  FileText
} from 'lucide-react';

export default function Schemes() {
  const { schemes } = useData();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'subsidy': return Wallet;
      case 'insurance': return Shield;
      case 'loan': return Landmark;
      default: return FileText;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'subsidy': return 'bg-success/20 text-success';
      case 'insurance': return 'bg-info/20 text-info';
      case 'loan': return 'bg-warning/20 text-warning';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-info/20 flex items-center justify-center">
              <Landmark className="w-6 h-6 text-info" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Government Schemes</h1>
              <p className="text-muted-foreground">Explore schemes and subsidies for farmers</p>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['All', 'Subsidy', 'Insurance', 'Loan', 'Other'].map((cat) => (
            <button
              key={cat}
              className="px-4 py-2 rounded-full text-sm font-medium bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Schemes List */}
        <div className="space-y-6">
          {schemes.map((scheme) => {
            const CategoryIcon = getCategoryIcon(scheme.category);
            const isDeadlineSoon = scheme.deadline && 
              (new Date(scheme.deadline).getTime() - new Date().getTime()) < 30 * 24 * 60 * 60 * 1000;

            return (
              <div key={scheme.id} className="glass-card rounded-2xl p-6 hover-lift">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${getCategoryColor(scheme.category)}`}>
                    <CategoryIcon className="w-8 h-8" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h2 className="text-xl font-semibold text-foreground">{scheme.name}</h2>
                        <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium capitalize ${getCategoryColor(scheme.category)}`}>
                          {scheme.category}
                        </span>
                      </div>
                      {scheme.deadline && (
                        <div className={`flex items-center gap-2 text-sm ${isDeadlineSoon ? 'text-warning' : 'text-muted-foreground'}`}>
                          {isDeadlineSoon && <AlertTriangle className="w-4 h-4" />}
                          <Calendar className="w-4 h-4" />
                          <span>Deadline: {new Date(scheme.deadline).toLocaleDateString('en-IN')}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-muted-foreground mb-4">{scheme.description}</p>

                    {/* Benefits */}
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-foreground mb-2">Benefits</h3>
                      <div className="flex flex-wrap gap-2">
                        {scheme.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg">
                            <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Eligibility */}
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-foreground mb-2">Eligibility</h3>
                      <ul className="grid sm:grid-cols-2 gap-2">
                        {scheme.eligibility.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action */}
                    {scheme.link && (
                      <a href={scheme.link} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm">
                          Apply Now
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Help Section */}
        <div className="mt-12 glass-card rounded-2xl p-8 text-center">
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
            <Landmark className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Need Help Applying?</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Our AI assistant can help you understand scheme requirements and guide you through the application process.
          </p>
          <Button variant="hero" size="lg" onClick={() => window.location.href = '/assistant'}>
            Ask AI Assistant
          </Button>
        </div>
      </div>
    </div>
  );
}
