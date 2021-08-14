//to store result
let result;

//#region Validate Name
const meetNameLength = (value, minLength) => {
    if (value.trim().length >= minLength) {
        return true;
    } else {
        return false;
    }
}

const NAME_LENGTH = 3;
const validateName = (value) => {
    const validName = meetNameLength(value, NAME_LENGTH) ? true : false;
    return validName;
}

//testing
test('validateName() - Validate Firstname/Lastname', () => {
    //valid input
    result = validateName('John');
    expect(result).toBe(true);

    //empty string
    result = validateName('');
    expect(result).toBe(false);

    //string with space(considered empty)
    result = validateName(' ');
    expect(result).toBe(false);

    //invalid name
    result = validateName('Bo');
    expect(result).toBe(false);
});
//#endregion


//#region Validate Confirm Password
const meetPasswordLength = (value, minLength, maxLength) => {
    if (value.length > minLength && value.length < maxLength) {
        return true;
    } else {
        return false;
    }
}

const MIN_LENGTH = 8;
const MAX_LENGTH = 25;

//function to check for password length as well as comparing them
const validateConfirmPassword = (password, confirmPassword) => {
    if (meetPasswordLength(password, MIN_LENGTH, MAX_LENGTH) === true
        && meetPasswordLength(confirmPassword, MIN_LENGTH, MAX_LENGTH) === true) {
        const validConfirmPassword = (password === confirmPassword) ? true : false;
        return validConfirmPassword;
    }
    return false;
}

//testing
test('validateConfirmPassword() - Comparing two Passwords', () => {
    //password with lenght less than MIN_LENGTH(9)
    result = validateConfirmPassword('12345678', '12345678');
    expect(result).toBeFalsy(); //expect(result).toBe(false);

    //same passwords with valid length
    result = validateConfirmPassword('123456789', '123456789');
    expect(result).toBeTruthy(); //expect(result).toBe(true);

    //different passwords
    result = validateConfirmPassword('123456789', '123456789a');
    expect(result).toBeFalsy();
});
//#endregion