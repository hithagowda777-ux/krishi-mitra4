import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Sprout, 
  Plus, 
  Calendar, 
  Trash2, 
  Edit2, 
  CheckCircle,
  Loader2,
  X
} from 'lucide-react';
import { toast } from 'sonner';
import { Crop } from '@/types/farmer';

const CROP_OPTIONS = [
  'Rice', 'Wheat', 'Maize', 'Cotton', 'Sugarcane', 'Groundnut', 'Soybean',
  'Jowar', 'Bajra', 'Ragi', 'Pulses', 'Mustard', 'Sunflower', 'Vegetables',
  'Fruits', 'Spices', 'Tea', 'Coffee', 'Jute', 'Other'
];

export default function Crops() {
  const { crops, addCrop, updateCrop, deleteCrop } = useData();
  const { profile } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingCrop, setEditingCrop] = useState<Crop | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    variety: '',
    sowingDate: '',
    expectedHarvestDate: '',
    acreage: 0,
    yieldEstimate: 0,
    status: 'sown' as Crop['status'],
    notes: '',
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      variety: '',
      sowingDate: '',
      expectedHarvestDate: '',
      acreage: 0,
      yieldEstimate: 0,
      status: 'sown',
      notes: '',
    });
    setEditingCrop(null);
  };

  const handleSubmit = async () => {
    if (!formData.name) {
      toast.error('Please select a crop');
      return;
    }
    if (!formData.sowingDate) {
      toast.error('Please enter sowing date');
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (editingCrop) {
      updateCrop(editingCrop.id, {
        ...formData,
        sowingDate: new Date(formData.sowingDate),
        expectedHarvestDate: new Date(formData.expectedHarvestDate),
      });
      toast.success('Crop updated successfully!');
    } else {
      addCrop({
        ...formData,
        farmerId: profile?.id || '',
        sowingDate: new Date(formData.sowingDate),
        expectedHarvestDate: new Date(formData.expectedHarvestDate),
      });
      toast.success('Crop added successfully!');
    }

    setIsLoading(false);
    resetForm();
    setShowForm(false);
  };

  const handleEdit = (crop: Crop) => {
    setEditingCrop(crop);
    setFormData({
      name: crop.name,
      variety: crop.variety || '',
      sowingDate: new Date(crop.sowingDate).toISOString().split('T')[0],
      expectedHarvestDate: new Date(crop.expectedHarvestDate).toISOString().split('T')[0],
      acreage: crop.acreage,
      yieldEstimate: crop.yieldEstimate || 0,
      status: crop.status,
      notes: crop.notes || '',
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this crop?')) {
      deleteCrop(id);
      toast.success('Crop deleted successfully!');
    }
  };

  const getStatusColor = (status: Crop['status']) => {
    switch (status) {
      case 'sown': return 'bg-info/20 text-info';
      case 'growing': return 'bg-success/20 text-success';
      case 'harvested': return 'bg-primary/20 text-primary';
      case 'failed': return 'bg-destructive/20 text-destructive';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Crops</h1>
            <p className="text-muted-foreground mt-1">Manage your crop records and track progress</p>
          </div>
          <Button variant="hero" onClick={() => { resetForm(); setShowForm(true); }}>
            <Plus className="w-5 h-5" />
            Add Crop
          </Button>
        </div>

        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm p-4">
            <div className="bg-card rounded-2xl p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-large animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-foreground">
                  {editingCrop ? 'Edit Crop' : 'Add New Crop'}
                </h2>
                <button onClick={() => { setShowForm(false); resetForm(); }} className="p-2 hover:bg-muted rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <Label className="font-medium">Crop Name *</Label>
                  <select
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full h-12 px-4 rounded-lg border border-input bg-background text-foreground"
                  >
                    <option value="">Select Crop</option>
                    {CROP_OPTIONS.map((crop) => (
                      <option key={crop} value={crop}>{crop}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label className="font-medium">Variety</Label>
                  <Input
                    value={formData.variety}
                    onChange={(e) => handleChange('variety', e.target.value)}
                    placeholder="e.g., Basmati, Yellow, Hybrid"
                    className="h-12"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-medium">Sowing Date *</Label>
                    <Input
                      type="date"
                      value={formData.sowingDate}
                      onChange={(e) => handleChange('sowingDate', e.target.value)}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-medium">Expected Harvest</Label>
                    <Input
                      type="date"
                      value={formData.expectedHarvestDate}
                      onChange={(e) => handleChange('expectedHarvestDate', e.target.value)}
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-medium">Acreage (acres)</Label>
                    <Input
                      type="number"
                      value={formData.acreage}
                      onChange={(e) => handleChange('acreage', parseFloat(e.target.value) || 0)}
                      className="h-12"
                      min="0"
                      step="0.5"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-medium">Est. Yield (quintals)</Label>
                    <Input
                      type="number"
                      value={formData.yieldEstimate}
                      onChange={(e) => handleChange('yieldEstimate', parseFloat(e.target.value) || 0)}
                      className="h-12"
                      min="0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="font-medium">Status</Label>
                  <div className="flex flex-wrap gap-2">
                    {(['sown', 'growing', 'harvested', 'failed'] as const).map((status) => (
                      <button
                        key={status}
                        onClick={() => handleChange('status', status)}
                        className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                          formData.status === status
                            ? getStatusColor(status)
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        {formData.status === status && <CheckCircle className="w-4 h-4 inline mr-1" />}
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="font-medium">Notes</Label>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    placeholder="Any additional notes about this crop..."
                    className="min-h-[80px]"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="ghost" onClick={() => { setShowForm(false); resetForm(); }}>
                    Cancel
                  </Button>
                  <Button variant="hero" onClick={handleSubmit} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        {editingCrop ? 'Update Crop' : 'Add Crop'}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Crops List */}
        {crops.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {crops.map((crop) => (
              <div key={crop.id} className="glass-card rounded-2xl p-6 hover-lift">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                      <Sprout className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{crop.name}</h3>
                      {crop.variety && (
                        <p className="text-sm text-muted-foreground">{crop.variety}</p>
                      )}
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(crop.status)}`}>
                    {crop.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-muted-foreground">Sowing Date</p>
                    <p className="font-medium text-foreground">
                      {new Date(crop.sowingDate).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Expected Harvest</p>
                    <p className="font-medium text-foreground">
                      {new Date(crop.expectedHarvestDate).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Acreage</p>
                    <p className="font-medium text-foreground">{crop.acreage} acres</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Est. Yield</p>
                    <p className="font-medium text-foreground">{crop.yieldEstimate || '—'} quintals</p>
                  </div>
                </div>

                {crop.notes && (
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{crop.notes}</p>
                )}

                <div className="flex justify-end gap-2 pt-4 border-t border-border">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(crop)}>
                    <Edit2 className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(crop.id)} className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-2xl p-12 text-center">
            <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6">
              <Sprout className="w-10 h-10 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">No Crops Yet</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Start tracking your crops by adding your first crop. You can monitor sowing dates, 
              expected harvests, and yields all in one place.
            </p>
            <Button variant="hero" size="lg" onClick={() => setShowForm(true)}>
              <Plus className="w-5 h-5" />
              Add Your First Crop
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
