import { Res } from "../../frameworks/types/serverPackageTypes";

// Mail format
const mailValidation = (email: string): boolean => {
  let emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password complexity check
const isStrongPassword = (password: string): boolean => {
  // Minimum 8 characters, at least one uppercase letter, one lowercase letter, one digit, and one special character
  const passwordRegex: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
  return passwordRegex.test(password);
};

export const inputValidation = (
  body: Record<string, string>,
  route: string,
  res: Res
) => {
   let newBody:{[key:string]:string}={};
  // Trim and validate required fields
  for (let prop in body) {
    //trim
    newBody[prop] = body[prop].trim();
    //empty space checking
    if (!newBody[prop]) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }
  }

  // Additional validations based on the route
  switch (route) {
    case "registerUser":
      let { name, email, password, confirmPassword } = newBody;

      // Validate name length
      if (name.length < 3) {
        return res.status(400).json({
          success: false,
          message: "Name should have at least 3 characters",
        });
      }
       if (!mailValidation(email)) {
         return res.status(400).json({
           success: false,
           message: "Invalid email format",
         });
       }

      // Validate password length and complexity
      if (password.length < 8 || !isStrongPassword(password)) {
        return res.status(400).json({
          success: false,
          message: "Password does not meet complexity requirements",
        });
      }

      // Confirm password matching
      if (password !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "Password mismatches",
        });
      }
      break;

    default:
       return newBody;
  }
  
};
