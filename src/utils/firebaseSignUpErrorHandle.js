import { toast } from "react-hot-toast";

const firebaseSignUpErrorHandle = (error) => {
  // console.error("Firebase Error:", error.code);

  switch (error.code) {
    case "auth/email-already-in-use":
      toast.error("This email is already registered.");
      break;
    case "auth/invalid-email":
      toast.error("Invalid email format.");
      break;
    case "auth/weak-password":
      toast.error("Password is too weak. Use at least 6 characters.");
      break;
    case "auth/operation-not-allowed":
      toast.error("Email/password accounts are not enabled.");
      break;
    case "auth/missing-email":
      toast.error("Please enter an email address.");
      break;
    case "auth/missing-password":
      toast.error("Please enter your password.");
      break;
    case "auth/invalid-password":
      toast.error("Invalid password format.");
      break;
    case "auth/too-many-requests":
      toast.error("Too many attempts. Please try again later.");
      break;
    case "auth/network-request-failed":
      toast.error("Network error. Check your internet connection.");
      break;
    case "auth/internal-error":
      toast.error("Internal server error. Try again.");
      break;
    case "auth/invalid-credential":
      toast.error("Invalid credentials provided.");
      break;
    case "auth/user-not-found":
      toast.error("No user found with this email.");
      break;
    case "auth/wrong-password":
      toast.error("Incorrect password.");
      break;
    default:
      toast.error("Something went wrong. Please try again.");
  }
};

export default firebaseSignUpErrorHandle;
