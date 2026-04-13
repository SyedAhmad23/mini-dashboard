import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
}

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Simplistic phone regex, at least 10 digits
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;

    if (!formData.fullName.trim())
      newErrors.fullName = "Full Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone Number is required.";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone number is invalid (minimum 10 digits).";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for field upon typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(false);

    if (validate()) {
      setTimeout(() => {
        setIsSubmitted(true);
        setFormData({ fullName: "", email: "", phone: "", password: "" });
        navigate("/");
      }, 500);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 p-8 sm:p-10 animate-fade-in">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
          Create Account
        </h2>
        <p className="text-slate-500 font-medium">
          Join the Mini Dashboard today.
        </p>
      </div>

      {isSubmitted && (
        <div className="mb-8 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 animate-slide-up">
          <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />
          <p className="text-sm font-semibold text-emerald-800">
            Registration successful! Welcome aboard.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. John Doe"
            className={`input-field !px-4 ${errors.fullName ? "border-red-400 focus:border-red-500 focus:ring-red-500/20" : ""}`}
          />
          {errors.fullName && (
            <div className="flex items-center gap-1.5 mt-2 text-red-500">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">{errors.fullName}</span>
            </div>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className={`input-field !px-4 ${errors.email ? "border-red-400 focus:border-red-500 focus:ring-red-500/20" : ""}`}
          />
          {errors.email && (
            <div className="flex items-center gap-1.5 mt-2 text-red-500">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">{errors.email}</span>
            </div>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            className={`input-field !px-4 ${errors.phone ? "border-red-400 focus:border-red-500 focus:ring-red-500/20" : ""}`}
          />
          {errors.phone && (
            <div className="flex items-center gap-1.5 mt-2 text-red-500">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">{errors.phone}</span>
            </div>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`input-field !px-4 !pr-10 ${errors.password ? "border-red-400 focus:border-red-500 focus:ring-red-500/20" : ""}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <div className="flex items-center gap-1.5 mt-2 text-red-500">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">{errors.password}</span>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full btn-primary cursor-pointer h-14 text-lg font-bold flex justify-center items-center gap-2"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
