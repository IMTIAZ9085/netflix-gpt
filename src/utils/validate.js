export const checkValidData = (email, password) => {

      const isValidEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);

      // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
      const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

      if (!isValidEmail) return "Email ID is not valid";

      if (!isValidPassword) return "Password is not valid";


      return null;

}