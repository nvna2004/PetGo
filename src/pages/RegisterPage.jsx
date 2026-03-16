import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  PawPrint,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Facebook,
  Github
} from 'lucide-react';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }

    setIsLoading(true);

    try {
      // For UX/UI review purposes, simulate a successful registration
      setTimeout(() => {
        localStorage.setItem('token', 'mock-token');
        localStorage.setItem('user', JSON.stringify({ email, name }));
        navigate('/');
      }, 1500);
    } catch (err) {
      setError('Đã xảy ra lỗi. Vui lòng thử lại.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans selection:bg-orange-100 selection:text-orange-900">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-100/50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-3xl opacity-60"></div>
      </div>

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden relative z-10 border border-white/20">

        {/* Left Side: Illustration & Branding (Hidden on mobile) */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gray-900 relative overflow-hidden text-white">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-12">
              <div className="bg-orange-500 p-2 rounded-xl shadow-lg">
                <PawPrint className="w-8 h-8 text-white" />
              </div>
              <span className="text-3xl font-black tracking-tight">PetGo</span>
            </div>

            <h1 className="text-5xl font-black leading-[1.1] mb-6 text-white">
              Join the biggest <br />
              <span className="text-orange-500">pet community.</span>
            </h1>
            <p className="text-gray-400 text-xl font-medium max-w-md leading-relaxed">
              Create an account to start booking the best services for your furry friends.
            </p>
          </div>

          <div className="relative z-10 flex flex-col gap-6">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
                <ShieldCheck className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-lg font-black">Trusted Platform</p>
                <p className="text-gray-400 font-medium italic">Verified by thousands of pet owners</p>
              </div>
            </div>

            <div className="w-full h-px bg-white/10"></div>

            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/150?img=${i + 10}`}
                  className="w-10 h-10 rounded-full border-2 border-gray-900 object-cover"
                  alt="User"
                />
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-gray-900 bg-orange-500 flex items-center justify-center text-[10px] font-black">
                +2k
              </div>
              <span className="flex items-center ml-4 text-sm font-bold text-gray-400">Join 2,000+ others already signed up</span>
            </div>
          </div>

          {/* Decorative background paw prints */}
          <div className="absolute top-[-5%] right-[-10%] opacity-5">
            <PawPrint className="w-64 h-64 rotate-[-15deg]" />
          </div>
        </div>

        {/* Right Side: Register Form */}
        <div className="flex flex-col p-8 sm:p-12 lg:p-16">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="bg-orange-500 p-1.5 rounded-lg">
              <PawPrint className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black text-gray-900">PetGo</span>
          </div>

          <div className="mb-8">
            <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Create Account</h2>
            <p className="text-gray-500 font-medium">Start your journey with us today.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-black text-gray-900 ml-1 uppercase tracking-widest">Full Name</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-orange-500/30 focus:bg-white focus:ring-4 focus:ring-orange-500/5 transition-all font-medium text-gray-900"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-black text-gray-900 ml-1 uppercase tracking-widest">Email Address</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-orange-500/30 focus:bg-white focus:ring-4 focus:ring-orange-500/5 transition-all font-medium text-gray-900"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-black text-gray-900 ml-1 uppercase tracking-widest">Password</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-orange-500/30 focus:bg-white focus:ring-4 focus:ring-orange-500/5 transition-all font-medium text-gray-900"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black text-gray-900 ml-1 uppercase tracking-widest">Confirm</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-orange-500/30 focus:bg-white focus:ring-4 focus:ring-orange-500/5 transition-all font-medium text-gray-900"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 ml-1 py-1">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 w-5 h-5 rounded-lg border-2 border-gray-200 text-orange-500 focus:ring-orange-500/20 cursor-pointer"
                required
              />
              <label htmlFor="terms" className="text-sm font-bold text-gray-400 leading-snug cursor-pointer select-none">
                I agree to the <span className="text-orange-500">Terms of Service</span> and <span className="text-orange-500">Privacy Policy</span>.
              </label>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-2xl text-sm font-bold flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-orange-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-orange-100 hover:bg-orange-600 hover:shadow-orange-200 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:pointer-events-none group mt-2"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-black text-gray-400">
              <span className="bg-white px-4">Or sign up with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 px-4 bg-white border-2 border-gray-50 rounded-2xl hover:bg-gray-50 transition-all font-bold text-gray-900">
              <Facebook className="w-5 h-5 text-[#1877F2] fill-current" />
              <span className="text-sm">Facebook</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3 px-4 bg-white border-2 border-gray-50 rounded-2xl hover:bg-gray-50 transition-all font-bold text-gray-900">
              <Github className="w-5 h-5 text-[#24292F]" />
              <span className="text-sm">Github</span>
            </button>
          </div>

          <p className="mt-auto pt-10 text-center text-gray-500 font-bold">
            Already have an account? {' '}
            <Link to="/login" className="text-orange-600 hover:text-orange-700 underline underline-offset-4 decoration-2 decoration-orange-200 hover:decoration-orange-500 transition-all">
              Sign In here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
