// validators for authentification

export function isValidPassword(password) {
    /*
    The password must be at least 8 characters long.
    It must contain at least one uppercase letter.
    It must contain at least one lowercase letter.
    It must contain at least one digit.
    */

    if (password.length < 8) {
        return false;
    }
    
    // Regular expressions for different criteria
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    
    // Check all criteria
    if (hasUpperCase && hasLowerCase && hasDigit) {
        return true;
    } else {
        return false;
    }
}

export function isValidEmail(email) {
    /*
    One or more characters that can be letters (uppercase or lowercase), digits, dots, underscores, or hyphens.
    Followed by an '@' symbol.
    Followed by one or more characters that can be letters, digits, dots, or hyphens.
    Followed by a dot.
    Ending with a top-level domain (TLD) consisting of at least two letters.
    Validation:
    */

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

export function isValidUsername(username) {
    /*
    It is between 3 and 15 characters long.
    It contains only letters, numbers, underscores, or hyphens.
    It does not start or end with an underscore or hyphen
    */

    const usernamePattern = /^(?![_-])(?!.*[_-]$)[a-zA-Z0-9_-]{3,15}$/;
    return usernamePattern.test(username);
}


export function isValidDisplayName(displayname) {
    /*
    The length of the string should be between 3 and 15 characters.
    The string should contain only letters (including Cyrillic letters), numbers, and the special characters @&%$!?+-=)(*<>\/|_#.
    */

    if (displayname.length < 3 || displayname.length > 15) {
        return false;
    }
    const regex = /^[a-zA-Z0-9@&%$!?+\-=)(*<>/|_#а-яА-ЯёЁ]+$/;
    return regex.test(displayname);
}