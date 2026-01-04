import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  User, 
  MapPin, 
  Sprout, 
  Save, 
  Edit2, 
  CheckCircle,
  Loader2 
} from 'lucide-react';
import { toast } from 'sonner';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

const CROP_TYPES = [
  'Rice', 'Wheat', 'Maize', 'Cotton', 'Sugarcane', 'Groundnut', 'Soybean',
  'Jowar', 'Bajra', 'Ragi', 'Pulses', 'Mustard', 'Sunflower', 'Vegetables',
  'Fruits', 'Spices', 'Tea', 'Coffee', 'Jute', 'Other'
];

export default function Profile() {
  const { profile, updateProfile } = useAuth();
  const { crops } = useData();
  const [isEditing, setIsEditing] = useState(!profile?.village);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    village: profile?.village || '',
    district: profile?.district || '',
    state: profile?.state || '',
    totalAcreage: profile?.totalAcreage || 0,
    cropsThisYear: profile?.cropsThisYear || 0,
    cropTypes: profile?.cropTypes || [],
    cropReclamationHistory: profile?.cropReclamationHistory || '',
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleCropType = (crop: string) => {
    const current = formData.cropTypes;
    if (current.includes(crop)) {
      handleChange('cropTypes', current.filter((c) => c !== crop));
    } else {
      handleChange('cropTypes', [...current, crop]);
    }
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    if (!formData.village.trim() || !formData.district.trim() || !formData.state) {
      toast.error('Please fill in your location details');
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    updateProfile(formData);
    setIsLoading(false);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Farmer Profile</h1>
            <p className="text-muted-foreground mt-1">
              {isEditing ? 'Update your farming details' : 'Your registered information'}
            </p>
          </div>
          {!isEditing && (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>

        {/* Profile Card */}
        <div className="glass-card rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                  <User className="w-6 h-6 text-primary-foreground" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Personal Details</h2>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground font-medium">Full Name</Label>
                {isEditing ? (
                  <Input
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    className="h-12"
                  />
                ) : (
                  <p className="text-lg text-foreground py-3">{formData.name || 'Not set'}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-foreground font-medium">Phone Number</Label>
                <p className="text-lg text-foreground py-3">+91 {profile?.phone}</p>
              </div>

              {profile?.email && (
                <div className="space-y-2">
                  <Label className="text-foreground font-medium">Email</Label>
                  <p className="text-lg text-foreground py-3">{profile.email}</p>
                </div>
              )}
            </div>

            {/* Location Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-accent-foreground" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Location</h2>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground font-medium">Village</Label>
                {isEditing ? (
                  <Input
                    value={formData.village}
                    onChange={(e) => handleChange('village', e.target.value)}
                    placeholder="Enter your village name"
                    className="h-12"
                  />
                ) : (
                  <p className="text-lg text-foreground py-3">{formData.village || 'Not set'}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-foreground font-medium">District</Label>
                {isEditing ? (
                  <Input
                    value={formData.district}
                    onChange={(e) => handleChange('district', e.target.value)}
                    placeholder="Enter your district"
                    className="h-12"
                  />
                ) : (
                  <p className="text-lg text-foreground py-3">{formData.district || 'Not set'}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-foreground font-medium">State</Label>
                {isEditing ? (
                  <select
                    value={formData.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                    className="w-full h-12 px-4 rounded-lg border border-input bg-background text-foreground"
                  >
                    <option value="">Select State</option>
                    {INDIAN_STATES.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                ) : (
                  <p className="text-lg text-foreground py-3">{formData.state || 'Not set'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Farming Information */}
          <div className="mt-10 pt-8 border-t border-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
                <Sprout className="w-6 h-6 text-success" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Farming Details</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label className="text-foreground font-medium">Total Acreage (in acres)</Label>
                {isEditing ? (
                  <Input
                    type="number"
                    value={formData.totalAcreage}
                    onChange={(e) => handleChange('totalAcreage', parseFloat(e.target.value) || 0)}
                    placeholder="Enter total land area"
                    className="h-12"
                    min="0"
                    step="0.5"
                  />
                ) : (
                  <p className="text-lg text-foreground py-3">{formData.totalAcreage} acres</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-foreground font-medium">Number of Crops This Year</Label>
                {isEditing ? (
                  <Input
                    type="number"
                    value={formData.cropsThisYear}
                    onChange={(e) => handleChange('cropsThisYear', parseInt(e.target.value) || 0)}
                    placeholder="Enter number of crops"
                    className="h-12"
                    min="0"
                  />
                ) : (
                  <p className="text-lg text-foreground py-3">{formData.cropsThisYear} crops</p>
                )}
              </div>
            </div>

            {/* Crop Types */}
            <div className="mt-6">
              <Label className="text-foreground font-medium mb-3 block">Crop Types</Label>
              {isEditing ? (
                <div className="flex flex-wrap gap-2">
                  {CROP_TYPES.map((crop) => (
                    <button
                      key={crop}
                      onClick={() => toggleCropType(crop)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        formData.cropTypes.includes(crop)
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {formData.cropTypes.includes(crop) && (
                        <CheckCircle className="w-4 h-4 inline mr-1" />
                      )}
                      {crop}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {formData.cropTypes.length > 0 ? (
                    formData.cropTypes.map((crop) => (
                      <span
                        key={crop}
                        className="px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary"
                      >
                        {crop}
                      </span>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No crops selected</p>
                  )}
                </div>
              )}
            </div>

            {/* Crop Reclamation History */}
            <div className="mt-6">
              <Label className="text-foreground font-medium">Crop Reclamation History</Label>
              {isEditing ? (
                <Textarea
                  value={formData.cropReclamationHistory}
                  onChange={(e) => handleChange('cropReclamationHistory', e.target.value)}
                  placeholder="Describe any land reclamation or soil improvement history..."
                  className="mt-2 min-h-[120px]"
                />
              ) : (
                <p className="text-foreground py-3">
                  {formData.cropReclamationHistory || 'Not provided'}
                </p>
              )}
            </div>
          </div>

          {/* Save Button */}
          {isEditing && (
            <div className="mt-8 flex justify-end gap-4">
              <Button variant="ghost" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button variant="hero" onClick={handleSave} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Profile
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { label: 'Total Crops', value: crops.length, color: 'primary' },
            { label: 'Acreage', value: `${formData.totalAcreage} ac`, color: 'success' },
            { label: 'Crop Types', value: formData.cropTypes.length, color: 'accent' },
            { label: 'This Year', value: formData.cropsThisYear, color: 'info' },
          ].map((stat) => (
            <div key={stat.label} className="glass-card rounded-xl p-4 text-center">
              <div className={`text-2xl font-bold text-foreground`}>{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
