
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  PawPrint,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Facebook,
  Github
} from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // For UX/UI review purposes, simulate a successful login if fields are filled
      // In production, this would be a real fetch call
      setTimeout(() => {
        if (email && password) {
          localStorage.setItem('token', 'mock-token');
          localStorage.setItem('user', JSON.stringify({ email, name: 'User' }));
          navigate('/');
        } else {
          setError('Vui lòng điền đầy đủ thông tin.');
          setIsLoading(false);
        }
      }, 1500);

      /* Real implementation commented out for UI review
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/');
      } else {
        setError(data.message);
        setIsLoading(false);
      }
      */
    } catch (err) {
      setError('Đã xảy ra lỗi. Vui lòng thử lại.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans selection:bg-orange-100 selection:text-orange-900">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-100/50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-3xl opacity-60"></div>
      </div>

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden relative z-10 border border-white/20">

        <div className="hidden lg:flex flex-col justify-between p-12 bg-orange-500 relative overflow-hidden text-white">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-12">
              <div className="bg-white p-2 rounded-xl shadow-lg">
                <PawPrint className="w-8 h-8 text-orange-600" />
              </div>
              <span className="text-3xl font-black tracking-tight">PetGo</span>
            </div>

            <h1 className="text-5xl font-black leading-[1.1] mb-6">
              Welcome back to <br />
              <span className="text-orange-100">PetCare Paradise.</span>
            </h1>
            <p className="text-orange-50 text-xl font-medium max-w-md opacity-90 leading-relaxed">
              Managing your pet's happiness is just a few clicks away. Log in to access your dashboard and bookings.
            </p>
          </div>

          <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-2xl">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold">Secure Authentication</p>
              <p className="text-xs font-medium opacity-70 italic whitespace-nowrap">Your data is protected with 128-bit encryption</p>
            </div>
          </div>

          <div className="absolute bottom-[-10%] right-[-5%] opacity-10">
            <PawPrint className="w-64 h-64 rotate-12" />
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="flex flex-col p-8 sm:p-12 lg:p-16">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="bg-orange-500 p-1.5 rounded-lg">
              <PawPrint className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black text-gray-900">PetGo</span>
          </div>

          <div className="mb-10">
            <h2 
              onClick={() => navigate('/')} 
              className="text-4xl font-black text-gray-900 mb-2 tracking-tight cursor-pointer hover:text-orange-600 transition-colors"
            >
              Sign In
            </h2>
            <p className="text-gray-500 font-medium">Please enter your details to login.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-orange-500/30 focus:bg-white focus:ring-4 focus:ring-orange-500/5 transition-all font-medium text-gray-900"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-end mr-1">
                <label className="text-sm font-black text-gray-900 ml-1 uppercase tracking-widest">Password</label>
                <a href="#" className="text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors">Forgot password?</a>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-orange-500/30 focus:bg-white focus:ring-4 focus:ring-orange-500/5 transition-all font-medium text-gray-900"
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

            <div className="flex items-center gap-2 ml-1">
              <input
                type="checkbox"
                id="remember"
                className="w-5 h-5 rounded-lg border-2 border-gray-200 text-orange-500 focus:ring-orange-500/20 cursor-pointer"
              />
              <label htmlFor="remember" className="text-sm font-bold text-gray-600 cursor-pointer select-none">Remember for 30 days</label>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-lg shadow-xl shadow-gray-200 hover:bg-orange-600 hover:shadow-orange-200 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:pointer-events-none group"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-black text-gray-400">
              <span className="bg-white px-4">Or continue with</span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3.5 px-4 bg-white border-2 border-gray-50 rounded-2xl hover:bg-gray-50 transition-all font-bold text-gray-900">
              <Facebook className="w-5 h-5 text-[#1877F2] fill-current" />
              <span className="text-sm">Facebook</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3.5 px-4 bg-white border-2 border-gray-50 rounded-2xl hover:bg-gray-50 transition-all font-bold text-gray-900">
              <Github className="w-5 h-5 text-[#24292F]" />
              <span className="text-sm">Github</span>
            </button>
          </div>

          <p className="mt-auto pt-10 text-center text-gray-500 font-bold">
            Don't have an account? {' '}
            <Link to="/register" className="text-orange-600 hover:text-orange-700 underline underline-offset-4 decoration-2 decoration-orange-200 hover:decoration-orange-500 transition-all">
              Join PetGo now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
