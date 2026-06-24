const Login = require("../../models/auth");

/**
 * Admin Login Controller
 * Handles admin authentication for the Reports page and other admin features
 */

// Admin Login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("[LOGIN DEBUG] Received email:", JSON.stringify(email));
    console.log("[LOGIN DEBUG] Received password:", JSON.stringify(password));

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find admin user by email
    const admin = await Login.findOne({ email: email.toLowerCase(), role: "admin" });
    console.log("[LOGIN DEBUG] Found admin:", admin ? { email: admin.email, role: admin.role, password: JSON.stringify(admin.password) } : null);

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare passwords (plain text for now - see note below)
    // TODO: Implement bcryptjs for password hashing
    if (admin.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Successful login - return admin info
    // TODO: Implement JWT token generation for session management
    return res.status(200).json({
      success: true,
      message: "Admin login successful",
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
      // token: jwtToken, // TODO: Add JWT token here
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during login",
      error: error.message,
    });
  }
};

// Change Admin Password
const changeAdminPassword = async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    if (!email || !currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email, currentPassword and newPassword are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters long",
      });
    }

    const admin = await Login.findOne({ email: email.toLowerCase(), role: "admin" });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin account not found",
      });
    }

    if (admin.password !== currentPassword) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from current password",
      });
    }

    admin.password = newPassword;
    await admin.save();

    return res.status(200).json({
      success: true,
      message: "Admin password changed successfully",
    });
  } catch (error) {
    console.error("Change admin password error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while changing password",
      error: error.message,
    });
  }
};

module.exports = {
  loginAdmin,
  changeAdminPassword,
};
