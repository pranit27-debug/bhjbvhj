const {
    signup,
    login,
    getUser,
    updateUser,
    verifyEmail,
    generateJWT,
} = require('./auth.service');
const User = require('./auth.model');
const crypto = require('crypto');
const sendEmail = require('../utils/email');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const response = await signup(req.body);
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const response = await verifyEmail(req.query.token);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { user, token } = await login(req.body);
    res.status(200).json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

exports.getProfile = async (req, res) => {
    try {
    const user = await getUser(req.user.id);
    res.json(user);
    } catch (err) {
    res.status(404).json({ error: err.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
    const userId = req.user.id;

    const updates = {
        name: req.body.name,
        phone: req.body.phone,
    };

    if (req.file && req.file.path) {
        updates.profilePic = req.file.path;
    }

    const updatedUser = await updateUser(userId, updates);

    if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
        message: 'Profile updated successfully',
        user: updatedUser,
    });
    } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
    }
};

exports.logout = async (req, res) => {
  try {
    const userId = req.user.id;
    await User.findByIdAndUpdate(userId, { $inc: { tokenVersion: 1 } });
    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.json({ message: 'If the account exists, a reset link was sent' });

    const token = crypto.randomBytes(20).toString('hex');
    const expires = new Date(Date.now() + 1000 * 60 * 15);
    user.passwordResetToken = token;
    user.passwordResetExpires = expires;
    await user.save();

    const link = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
    await sendEmail(user.email, 'Reset your password', `<p>Click to reset your password:</p><a href="${link}">${link}</a>`);

    res.json({ message: 'If the account exists, a reset link was sent' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const user = await User.findOne({ passwordResetToken: token, passwordResetExpires: { $gt: new Date() } });
    if (!user) return res.status(400).json({ error: 'Invalid or expired token' });

    const hashed = await require('bcrypt').hash(newPassword, 10);
    user.password = hashed;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.resendVerification = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user.verified) return res.json({ message: 'Already verified' });

    const otp = (Math.floor(100000 + Math.random() * 900000)).toString();
    user.emailVerificationOTP = otp;
    user.emailVerificationOTPExpires = new Date(Date.now() + 1000 * 60 * 10);
    await user.save();

    await sendEmail(user.email, 'Your verification code', `<p>Your OTP is <b>${otp}</b>. It expires in 10 minutes.</p>`);
    res.json({ message: 'Verification code sent' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.verifyEmailOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user.verified) return res.json({ message: 'Already verified' });
    if (!user.emailVerificationOTP || !user.emailVerificationOTPExpires) return res.status(400).json({ error: 'OTP not requested' });
    if (user.emailVerificationOTP !== otp || user.emailVerificationOTPExpires < new Date()) return res.status(400).json({ error: 'Invalid or expired OTP' });

    user.verified = true;
    user.verificationToken = undefined;
    user.emailVerificationOTP = undefined;
    user.emailVerificationOTPExpires = undefined;
    await user.save();
    res.json({ message: 'Email verified successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.googleLogin = async (req, res) => {
  try {
    const { idToken, accessToken } = req.body;
    
    if (!idToken) {
      return res.status(400).json({ error: 'Google ID token is required' });
    }

    const { verifyGoogleIdToken, getGoogleUserInfo } = require('../utils/googleAuth');
    
    // Verify the ID token
    const payload = await verifyGoogleIdToken(idToken);
    
    // Get additional user info if access token is provided
    let userInfo = payload;
    if (accessToken) {
      try {
        userInfo = await getGoogleUserInfo(accessToken);
      } catch (error) {
        console.warn('Failed to get additional user info:', error);
        // Continue with ID token payload
      }
    }

    const email = userInfo.email;
    let user = await User.findOne({ email });
    
    if (!user) {
      // Create new user
      user = await User.create({
        name: userInfo.name || userInfo.given_name || email.split('@')[0],
        email,
        password: crypto.randomBytes(16).toString('hex'),
        verified: true,
        googleId: userInfo.sub,
        profilePic: userInfo.picture || undefined
      });
    } else if (!user.googleId) {
      // Link existing account to Google
      user.googleId = userInfo.sub;
      if (userInfo.picture && !user.profilePic) {
        user.profilePic = userInfo.picture;
      }
      await user.save();
    }

    const token = generateJWT(user);
    res.json({ 
      token, 
      user: { 
        id: user._id, 
        email: user.email, 
        name: user.name,
        profilePic: user.profilePic 
      } 
    });
  } catch (err) {
    console.error('Google login error:', err);
    res.status(400).json({ error: err.message || 'Google login failed' });
  }
};

exports.appleLogin = async (req, res) => {
  try {
    const { identityToken, authorizationCode } = req.body;
    
    if (!identityToken) {
      return res.status(400).json({ error: 'Apple identity token is required' });
    }

    const { verifyAppleIdToken } = require('../utils/appleAuth');
    
    // Verify the identity token
    const payload = await verifyAppleIdToken(identityToken);
    
    // Apple might not provide email in subsequent logins
    // Use the email from token or create a placeholder
    const email = payload.email || `${payload.sub}@appleid.apple.com`;
    const name = payload.name || email.split('@')[0];
    
    let user = await User.findOne({ email });
    
    if (!user) {
      // Create new user
      user = await User.create({
        name,
        email,
        password: crypto.randomBytes(16).toString('hex'),
        verified: true,
        appleId: payload.sub
      });
    } else if (!user.appleId) {
      // Link existing account to Apple
      user.appleId = payload.sub;
      await user.save();
    }

    const token = generateJWT(user);
    res.json({ 
      token, 
      user: { 
        id: user._id, 
        email: user.email, 
        name: user.name,
        profilePic: user.profilePic 
      } 
    });
  } catch (err) {
    console.error('Apple login error:', err);
    res.status(400).json({ error: err.message || 'Apple login failed' });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token is required' });
    }

    // Verify refresh token (you can implement a separate refresh token system)
    // For now, we'll just return a new access token if the refresh token is valid
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    const newToken = generateJWT(user);
    res.json({ token: newToken });
  } catch (err) {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current and new password are required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    
    // Increment token version to invalidate existing tokens
    user.tokenVersion = (user.tokenVersion || 0) + 1;
    
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    console.error('Change password error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getUserStats = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get user's request and rating statistics
    const Request = require('../Req&Res/model');
    const Rating = require('../Ratings/model');
    
    const [totalRequests, totalRatings, avgRating] = await Promise.all([
      Request.countDocuments({ borrower: userId }),
      Rating.countDocuments({ toUserId: userId }),
      Rating.aggregate([
        { $match: { toUserId: userId } },
        { $group: { _id: null, avgRating: { $avg: '$rating' } } }
      ])
    ]);
    
    const stats = {
      totalRequests,
      totalRatings,
      avgRating: avgRating.length > 0 ? Math.round(avgRating[0].avgRating * 100) / 100 : 0
    };
    
    res.json({ success: true, stats });
  } catch (err) {
    console.error('Get user stats error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Delete user's data (requests, ratings, etc.)
    const Request = require('../Req&Res/model');
    const Rating = require('../Ratings/model');
    const Offer = require('../offers/model');
    const Payment = require('../Payments/model');
    
    await Promise.all([
      Request.deleteMany({ borrower: userId }),
      Rating.deleteMany({ $or: [{ fromUserId: userId }, { toUserId: userId }] }),
      Offer.deleteMany({ lender: userId }),
      Payment.deleteMany({ userId })
    ]);
    
    // Delete the user
    await User.findByIdAndDelete(userId);
    
    res.json({ message: 'Account deleted successfully' });
  } catch (err) {
    console.error('Delete account error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.googleCallback = async (req, res) => {
  try {
    const { code, state } = req.query;
    
    if (!code) {
      return res.status(400).json({ error: 'Authorization code not provided' });
    }

    // This is a fallback for traditional OAuth flow
    // In modern implementation, you'll use the ID token directly
    res.json({ 
      message: 'Google OAuth callback received. Use ID token for authentication.',
      code,
      state 
    });
  } catch (err) {
    console.error('Google callback error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.appleCallback = async (req, res) => {
  try {
    const { code, state } = req.query;
    
    if (!code) {
      return res.status(400).json({ error: 'Authorization code not provided' });
    }

    // This is a fallback for traditional OAuth flow
    // In modern implementation, you'll use the identity token directly
    res.json({ 
      message: 'Apple Sign-In callback received. Use identity token for authentication.',
      code,
      state 
    });
  } catch (err) {
    console.error('Apple callback error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

