import * as yup from 'yup'

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

const registerValidation = yup.object({
    username: yup
    .string()
    .required(),

    email: yup
    .string()
    .email("Invalid Email")
    .required(),

    password: yup
    .string()
    .required()
    .matches(
        PASSWORD_REGEX,
        "Password must Contain at least 8 Characters(1 Uppercase, 1 Lowercase, 1 Number and 1 special case Character)"
      ),

    confirmPassword: yup
    .string()
    .required()
    .when("password", {
        is: val => (val && val.length > 0 ? 1 : 0),
        then: yup.string().oneOf([yup.ref("password")], "Password does not match")
    })
})

const loginValidation = yup.object({
    email: yup
    .string()
    .email("Invalid Email")
    .required(),
    
    password: yup
    .string()
    .required()
    .matches(
        PASSWORD_REGEX,
        "Password must Contain at least 8 Characters(1 Uppercase, 1 Lowercase, 1 Number and 1 special case Character)"
      ),
})

export { registerValidation, loginValidation}