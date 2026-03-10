const User = require('../models/User');
const jwt = require('jsonwebtoken');

const sendEmail = require('../utils/sendEmail');

// Helper function to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Helper function to generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Validate input
    if (!name || !email || !password || !phone) {
       return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    // Check for existing user (inactive & expired cleanup)
    const existingUser = await User.findOne({ 
      $or: [{ email }, { phone }] 
    }).select('+active +otpExpires');

    if (existingUser) {
      // If user is NOT active and OTP is expired -> Delete to allow re-registration
      if (!existingUser.active && existingUser.otpExpires < Date.now()) {
        await User.deleteOne({ _id: existingUser._id });
        console.log(`Deleted expired inactive user: ${existingUser.email}`);
      } else {
        // Standard duplicate checks if not expired
        if (existingUser.phone === phone) {
          return res.status(400).json({ success: false, message: 'Số điện thoại này đã được sử dụng' });
        }
        if (existingUser.email === email) {
          return res.status(400).json({ success: false, message: 'Email này đã được sử dụng' });
        }
      }
    }

    // Password validation: min 8 chars, at least 1 uppercase, 1 lowercase
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Mật khẩu phải từ 8 kí tự, bao gồm ít nhất một chữ viết hoa và một chữ viết thường' 
      });
    }

    // Generate OTP properly
    const otp = generateOTP();
    // OTP expires in 10 minutes
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); 

    // Create user but set active = false
    const user = await User.create({
      name,
      email,
      password,
      phone,
      active: false,
      otp,
      otpExpires
    });

    // Send email with OTP
    try {
      const message = `Mã xác nhận OTP của bạn là: ${otp}. Mã này sẽ hết hạn trong 10 phút.`;
      
      await sendEmail({
        email: user.email,
        subject: "PetGo - Xác nhận tài khoản",
        message,
        html: `<h3>Chào mừng bạn đến với PetGo</h3><p>Mã xác nhận OTP của bạn là: <strong>${otp}</strong></p><p>Mã này sẽ hết hạn trong 10 phút.</p>`
      });

      res.status(201).json({
        success: true,
        message: 'Registration successful! Please check your email for the OTP to activate your account.',
        userId: user._id
      });
    } catch (err) {
      console.error('Email sending failed', err);
      // Remove user if email fails to send (optional, but good practice here)
      await User.findByIdAndDelete(user._id);
      return res.status(500).json({ success: false, message: 'Email could not be sent. Please try again later.' });
    }

  } catch (error) {
    console.error('Register Error:', error);
    // Handle MongoDB duplicate key error (code 11000)
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({ 
        success: false, 
        message: `${field === 'email' ? 'Email' : 'Số điện thoại'} đã tồn tại` 
      });
    }
    res.status(500).json({ success: false, message: 'Lỗi máy chủ, vui lòng thử lại sau' });
  }
};

// @desc    Verify Email OTP
// @route   POST /api/users/verify-otp
// @access  Public
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Please provide email and OTP' });
    }

    // Cần select field active, otp, otpExpires vì mặc định schema là select: false
    const user = await User.findOne({ email }).select('+active +otp +otpExpires');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.active) {
      return res.status(400).json({ success: false, message: 'Account is already verified' });
    }

    // Check if OTP matches and has not expired
    if (user.otp !== otp) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ success: false, message: 'OTP has expired. Please request a new one.' });
    }

    // Verification successful, activate user
    user.active = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Account successfully verified! You can now log in.',
    });

  } catch (error) {
    console.error('Verify OTP Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


// @desc    Auth user & get token (Login)
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email & password input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email and password',
      });
    }

    // Xóa '.select('+password')' nếu bên User schema bạn không set `select: false`
    // Ở PetGo User schema của bạn, password có `select: false` nên băt buộc phải `.select('+password')`
    const user = await User.findOne({ email }).select('+password +active');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Kiếm tra account đã active chưa
    if (!user.active) {
       return res.status(401).json({
        success: false,
        message: 'Tài khoản của bạn chưa được kích hoạt. Vui lòng xác thực email trước khi đăng nhập.',
        needsActivation: true // Thêm flag để frontend nhận diện dễ hơn
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Remove password field before returning the user
    user.password = undefined;

    res.status(200).json({
      success: true,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Forgot Password - Send OTP
// @route   POST /api/users/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Vui lòng nhập email' });
    }

    const user = await User.findOne({ email }).select('+otpSentAt +active');

    if (!user) {
      return res.status(404).json({ success: false, message: 'Người dùng không tồn tại' });
    }

    // Check if account is active
    if (!user.active) {
      return res.status(400).json({ 
        success: false, 
        message: 'Tài khoản của bạn chưa được kích hoạt. Vui lòng xác thực email trước khi đặt lại mật khẩu.' 
      });
    }

    // Check cooldown (10 minutes)
    if (user.otpSentAt) {
      const cooldownTime = 10 * 60 * 1000; // 10 minutes
      const timePassed = Date.now() - user.otpSentAt.getTime();
      
      if (timePassed < cooldownTime) {
        const minutesRemaining = Math.ceil((cooldownTime - timePassed) / (60 * 1000));
        return res.status(400).json({ 
          success: false, 
          message: `Bạn phải chờ ${minutesRemaining} phút nữa mới có thể yêu cầu gửi lại mã` 
        });
      }
    }

    // Generate new OTP
    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    user.otpSentAt = new Date();
    await user.save();

    // Send email
    try {
      await sendEmail({
        email: user.email,
        subject: "PetGo - Phục hồi mật khẩu",
        message: `Mã OTP để đặt lại mật khẩu của bạn là: ${otp}. Mã này sẽ hết hạn trong 10 phút.`,
        html: `<h3>Yêu cầu đặt lại mật khẩu</h3><p>Mã OTP của bạn là: <strong>${otp}</strong></p><p>Mã này sẽ hết hạn trong 10 phút. Nếu bạn không yêu cầu, vui lòng bỏ qua email này.</p>`
      });

      res.status(200).json({
        success: true,
        message: 'Mã OTP đã được gửi về email của bạn'
      });
    } catch (err) {
      console.error('Forgot password email failed', err);
      return res.status(500).json({ success: false, message: 'Không thể gửi email lúc này' });
    }

  } catch (error) {
    console.error('Forgot Password Error:', error);
    res.status(500).json({ success: false, message: 'Lỗi máy chủ' });
  }
};

// @desc    Reset Password
// @route   POST /api/users/reset-password
// @access  Public
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ success: false, message: 'Vui lòng cung cấp đầy đủ email, mã OTP và mật khẩu mới' });
    }

    const user = await User.findOne({ email }).select('+otp +otpExpires +password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'Người dùng không tồn tại' });
    }

    if (user.otp !== otp || user.otp === undefined) {
      return res.status(400).json({ success: false, message: 'Mã OTP không chính xác' });
    }

    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ success: false, message: 'Mã OTP đã hết hạn' });
    }

    // Password validation again
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Mật khẩu mới phải từ 8 kí tự, có chữ hoa và chữ thường' 
      });
    }

    // Update password and clear OTP
    user.password = newPassword;
    user.otp = undefined;
    user.otpExpires = undefined;
    user.otpSentAt = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Mật khẩu đã được cập nhật thành công'
    });

  } catch (error) {
    console.error('Reset Password Error:', error);
    res.status(500).json({ success: false, message: 'Lỗi máy chủ' });
  }
};

module.exports = {
  loginUser,
  registerUser,
  verifyOTP,
  forgotPassword,
  resetPassword
};
