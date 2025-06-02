const token = jwt.sign(
  { userId: user._id, name: user.name },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);
