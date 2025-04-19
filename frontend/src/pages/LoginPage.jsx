// import React, { useState } from 'react';
// import { useAuthStore } from '../store/useAuthStore';
// import { Eye, EyeOff, Mail, MessageSquare, User, Lock, Loader, Loader2 } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import AuthImagePattern from '../components/AuthImagePattern';
// import toast from 'react-hot-toast';
// const LoginPage = () => {
//   const[showPassword, setShowPassword]=useState(false);
// const[formData,setFormData]=useState({
//   email:"",
//   password:"",
// });
// const{login,isLoggingIn}=useAuthStore();
// const handleSubmit=async(e)=>{
//   e.preventDefault();
//   login(formData);
// };
//   return (
//     <div className='min-h-screen grid lg:grid-cols-2'>
//       {/* LEFT */}
//       <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
//         <div className='w-full max-w-md space-y-8'>
//           {/* Logo */}
//           <div className='text-center mb-8'>
//             <div className='flex flex-col items-center gap-2 group'>
//               <div
//                 className='size-12 rounded-xl bg-primary/10 flex items-center justify-center
//               group-hover:bg-primary/20 transition-colors'
//               >
//                 <MessageSquare className="size-6 text-primary" />
//               </div>
//               <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
//               <p className='text-base-content/60'>Get Started</p>
//             </div>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className='space-y-6'>

//             {/* Full Name */}
//             <div className='form-control'>
//               <label className='label'>
//                 <span className='label-text font-medium'>Full Name</span>
//               </label>
//               <div className='relative'>
//                 <div className='absolute inset-y-0 left-0 pl-3 flex items-center z-50 pointer-events-none'>
//                   <User className="w-5 h-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   className="input input-bordered w-full pl-10"
//                   placeholder='Deepak Tyagi'
//                   value={formData.fullName}
//                   onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
//                 />
//               </div>
//             </div>

//             {/* Email */}
//             <div className='form-control'>
//               <label className='label'>
//                 <span className='label-text font-medium'>Email</span>
//               </label>
//               <div className='relative'>
//                 <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none  z-50'>
//                   <Mail className="w-5 h-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="email"
//                   className="input input-bordered w-full pl-10"
//                   placeholder='yourmail@example.com'
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div className='form-control'>
//               <label className='label'>
//                 <span className='label-text font-medium'>Password</span>
//               </label>
//               <div className='relative'>
//                 <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none  z-10'>
//                   <Lock className="w-5 h-5 text-gray-400" />
//                 </div>
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   className="input input-bordered w-full pl-10 pr-10"
//                   placeholder='**********'
//                   value={formData.password}
//                   onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                 />
//                 <button
//                   type="button"
//                   className='absolute inset-y-0 right-0 pr-3 flex items-center'
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <EyeOff className='w-5 h-5 text-gray-400' />
//                   ) : (
//                     <Eye className='w-5 h-5 text-gray-400' />
                   
//                   )}
//                 </button>
//               </div>
//            </div>
// <button type="submit" className='btn btn-primary w-full' disabled={isSigningUp}>
//   {isSigningUp?(
//   <>
//   <Loader2 className='size-5 animate-spin'/>
//   Loading...
//   </>
//   ):(
//     "Create Account"
//   )}
// </button>
//           </form>
//           <div className='text-center'>
//             <p className='text-base-content/60'>
//             Already have an account{" "}
//             <Link to="/login" className='link link-primary'>
//             Sign in
//             </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//       {/*right side*/}
//       <AuthImagePattern
//       title="Join our community"
//       subtitle="Connect with friends,share moments and stay in touch with your loved ones"
//       />
//     </div>

   
    
//   )
  
// }

// export default LoginPage

import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Mail, MessageSquare, Lock, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';
import toast from 'react-hot-toast';


const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!formData.password) return toast.error("Password is required");
    login(formData);
  };

  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      {/* LEFT */}
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8'>
          {/* Logo & Heading */}
          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group'>
              <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className='text-2xl font-bold mt-2'>Welcome Back</h1>
              <p className='text-base-content/60'>Login to your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Email */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Email</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-50'>
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10"
                  placeholder='yourmail@example.com'
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Password</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10'>
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="input input-bordered w-full pl-10 pr-10"
                  placeholder='**********'
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className='absolute inset-y-0 right-0 pr-3 flex items-center'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className='w-5 h-5 text-gray-400' />
                  ) : (
                    <Eye className='w-5 h-5 text-gray-400' />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className='btn btn-primary w-full' disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 className='size-5 animate-spin' />
                  Loading...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Link to sign up */}
          <div className='text-center'>
            <p className='text-base-content/60'>
              Don't have an account?{" "}
              <Link to="/signup" className='link link-primary'>
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <AuthImagePattern
        title="Welcome Back!"
        subtitle="Chat with your friends and never miss a message again."
      />
    </div>
  );
};

export default LoginPage;
