import bcrypt from 'bcrypt';

export const hashPassword = async (req, res, next) => {
  try {
    if (!req.body.password) {
      return next();
    }

    const saltRounds = 10;
    req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Password hashing failed',
      error: error.message,
    });
  }
};
