import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sprout, Phone, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (phone.length < 10) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }
    setIsLoading(true);
    // Simulate OTP sending
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setStep('otp');
    toast.success('OTP sent to your phone! (Use 123456 for demo)');
  };

  const handleLogin = async () => {
    if (otp.length < 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }
    setIsLoading(true);
    const success = await login(phone, otp);
    setIsLoading(false);
    
    if (success) {
      toast.success('Welcome back!');
      navigate('/dashboard');
    } else {
      toast.error('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center">
              <Sprout className="w-8 h-8 text-primary-foreground" />
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your Krishi Sakshi account</p>
        </div>

        {/* Login Form */}
        <div className="glass-card rounded-2xl p-8">
          {step === 'phone' ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground font-medium">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your 10-digit number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="pl-12 h-14 text-lg"
                    maxLength={10}
                  />
                </div>
              </div>

              <Button 
                variant="hero" 
                size="lg" 
                className="w-full"
                onClick={handleSendOtp}
                disabled={isLoading || phone.length < 10}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  <>
                    Send OTP
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center mb-4">
                <p className="text-muted-foreground">
                  Enter the OTP sent to <span className="font-semibold text-foreground">+91 {phone}</span>
                </p>
                <button 
                  onClick={() => setStep('phone')} 
                  className="text-primary text-sm hover:underline"
                >
                  Change number
                </button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="otp" className="text-foreground font-medium">
                  Enter OTP
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="pl-12 h-14 text-lg tracking-widest text-center"
                    maxLength={6}
                  />
                </div>
              </div>

              <Button 
                variant="hero" 
                size="lg" 
                className="w-full"
                onClick={handleLogin}
                disabled={isLoading || otp.length < 6}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    Verify & Login
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>

              <button 
                onClick={handleSendOtp} 
                className="w-full text-center text-primary hover:underline text-sm"
                disabled={isLoading}
              >
                Resend OTP
              </button>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Demo Hint */}
        <div className="mt-6 p-4 rounded-xl bg-accent/20 border border-accent/30 text-center">
          <p className="text-sm text-foreground">
            <span className="font-semibold">Demo Mode:</span> Use OTP <span className="font-mono bg-accent/30 px-2 py-1 rounded">123456</span> for any phone number
          </p>
        </div>
      </div>
    </div>
  );
}
