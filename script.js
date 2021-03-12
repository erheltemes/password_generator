// Assignment Code
var generateBtn = document.querySelector("#generate");

//user input global vars
var characterCount
var includeLowercase
var includeUppercase  
var includeNumbers 
var includeSpecialCharacters

//character sets
var lowercase = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"];
var uppercase = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"];
var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
var specialCharacters = ["\u0020", "\u0021", "\u0022", "\u0023", "\u0024", "\u0025", "\u0026", "\u0027", "\u0028", "\u0029", "\u002A", "\u002B", "\u002C", "\u002D", "\u002E", "\u002F", "\u0040", "\u005B", "\u005D", "\u005E", "\u005F", "\u0060", "\u007B", "\u007C", "\u007D", "\u007E"]

//created by combining above arrays
var characterSet = []



//checks to see if any variable in trial password matches one in the array
function arraysIntersect (trialPassword, array) {
  for (i = 0; i < array.length; i++) {
    for (j = 0; j < trialPassword.length; j++) {
      if (array[i] === trialPassword[j]) {
        return true 
      }
    } 
  }
  return false
}

//returns false if the user called for a character but trial password did not iclude any of that character
function checkPassword (trialPassword) {
  if (includeLowercase && !arraysIntersect (trialPassword, lowercase)) {
    return false   
  } 
  if (includeUppercase && !arraysIntersect (trialPassword, uppercase)) {
    return false   
  }
  if (includeNumbers && !arraysIntersect (trialPassword, numbers)) {
    return false   
  }
  if (includeSpecialCharacters && !arraysIntersect (trialPassword, specialCharacters)) {
    return false   
  }
  return true
}

//creates random password until it passes check
function createPassword () {
  var trialPassword = []
  for (i = 0; i < characterCount; i++) { 
    var randNum = Math.floor(Math.random() * (characterSet.length));
    trialPassword.push(characterSet[randNum])
  }
  if (!checkPassword(trialPassword)) {
    trialPassword = createPassword()
  }
  return trialPassword
}

//creates character set
function createCharacterSet() {
  if (includeLowercase) {
    characterSet = characterSet.concat(lowercase)
  }
  if (includeUppercase) {
    characterSet = characterSet.concat(uppercase)
  }
  if (includeNumbers) {
    characterSet = characterSet.concat(numbers)
  }
  if (includeSpecialCharacters) {
    characterSet = characterSet.concat(specialCharacters)
  }
  return characterSet
}

//Gain user inputs and generate password
function generatePassword() {
  characterCount = parseFloat(prompt("How many characters?"));
  //confirm if integer
  if (Math.floor(characterCount) !== characterCount){
    window.alert("Error: not an integer")
    return generatePassword()
  }
  //confim between 8 and 128
  if (characterCount < 8 || characterCount > 128) {
    window.alert("Error: not bewteen 8 and 128")
    return generatePassword()
  }

  includeLowercase = confirm("Allow lowercase characters?");
  includeUppercase = confirm("Allow uppercase characters?");
  includeNumbers = confirm("Allow numeric characters?");
  includeSpecialCharacters = confirm("Allow special characters?");

  //if they failed to call any characters: restart
  if (!includeLowercase && !includeUppercase && !includeNumbers && !includeSpecialCharacters) {
    window.alert("Error: no characters selected")
    return generatePassword()
  }

  //create character set
  characterSet = createCharacterSet()

  //create random password and check it
  var checkedPassword = createPassword (characterSet, characterCount)

  // convert array into string
  var finalPassword = checkedPassword.join("")
  

  return finalPassword 
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
