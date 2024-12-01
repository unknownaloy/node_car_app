import { User } from "./model.js";
import { compare } from "./crypt.js";

export const showLogin = (req, res) =>
  res.render("auth/login", { title: "Login" });

export async function authenticate(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.redirect("/login");
    return;
  }

  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    res.redirect("/login");
    return;
  }

  const isPasswordMatched = await compare(password, user.password);

  if (isPasswordMatched) {
    req.session.user = {
      email,
      isAuthenticated: true,
    };
    res.redirect("/cars");
  } else {
    res.redirect("/login");
  }
}

export function checkAuth(req, res, next) {
  let isAuthenticated = req.session.user && req.session.user.isAuthenticated;
  // let isAuthenticated = true;

  if (isAuthenticated) {
    next();
  } else {
    res.redirect("/login");
  }
}

export function logout(req, res) {
  req.session.destroy();

  res.redirect("/");
}
