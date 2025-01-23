function generatePassword(passwordLength, includeLowerCase,includeUpperCase, includeNumbers,  includeSymbols){
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "01123456789";
  const symbolChars = "!@#$%^&*()_+-=[]{}|;:',.<>?/~`";

  let allowedChars = "";
  let password = "";

  allowedChars += includeLowerCase ? lowercaseChars : "";
  allowedChars += includeUpperCase ? uppercaseChars : "";
  allowedChars += includeNumbers ? numberChars : "";
  allowedChars += includeSymbols ? symbolChars : "";

  if(passwordLength <= 0){
    return `Password length must be at least 1`
  }
  if(allowedChars.length === 0 ){
    return `At least 1 set of characters needs to be selected`
  }

  for (let i = 0; i < passwordLength; i++){
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    password += allowedChars[randomIndex];
  }
  
  return password;
}

const passwordLength = 12;
const includeLowerCase = true;
const includeUpperCase = true;
const includeNumbers = true;
const includeSymbols = true;

const password = generatePassword(passwordLength, includeLowerCase,includeUpperCase, includeNumbers,  includeSymbols);

console.log(`Generated password: ${password}`);