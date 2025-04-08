import { signin } from './../db/auths';
import { z } from 'zod';

//Define Constants
const MIN_NAME_LENGTH = 3;
const MIN_PASSWORD_LENGTH = 8;
const SPECIAL_CHARS = '`!@#$%^&*(),.?":{}|<>';


//Define Error Messages
const ERROR_MESSAGES = {
    name: `ชื่อต้องมีความยาวอย่างน้อย ${MIN_NAME_LENGTH} ตัวอักษร`,
    email: {
        format: 'กรุณาหรอกอีเมล์ให้ถูกต้อง',
        domain: 'อีเมล์ต้องเป็น Gmail,  Hotmail, Outlook หรือ Yahoo'
    },
    password: {
        length: `รหัสผ่านต้องมีความยาวอย่างน้อยย ${MIN_PASSWORD_LENGTH} ตัวอักษร`,
        uppercase: 'หรัสผ่านต้องมีตัวพิมพ์ใหญ่อย่างน้อย 1 ตัวอักษร',
        lowercase: 'รหัสผ่านต้องมีตัวพิมพ์เล็กอย่างน้อย 1 ตัวอักษร',
        number: 'รหัสผ่านต้องมีตัวเลขอย่างน้อย 1 ตัวอักษร',
        special: `รหัสผ่านต้องมีตัวอักษรพิเศษอย่างน้อย 1 ตัวอักษร (${SPECIAL_CHARS})`,
    },
    confirmPassword: 'รหัสผ่านไม่ตรงกัน',


}

// Define valid email domains
const VALID_EMAIL = [
    'gmail.com',
    'hotmail.com',
    'outlook.com',
    'yahoo.com'
]

//Function Check Email Domain
const isValidEmailDomain = (email: string) => {
    const domain = email ? email.split('@')[1].toLowerCase() : ''
    return VALID_EMAIL.includes(domain)
}

// Password Schema
const passowrdSchema = z.string()
    .min(MIN_PASSWORD_LENGTH, { message: ERROR_MESSAGES.password.length })
    .regex(/[A-Z]/, { message: ERROR_MESSAGES.password.uppercase })
    .regex(/[a-z]/, { message: ERROR_MESSAGES.password.lowercase })
    .regex(/[0-9]/, { message: ERROR_MESSAGES.password.number })
    .regex(
        new RegExp(`[${SPECIAL_CHARS}]`),
        { message: ERROR_MESSAGES.password.special }
    )


// Main Signup Schema
export const signupSchema = z.object({
    name: z.string()
        .optional()
        .refine(
            (name) => !name || name.length >= MIN_NAME_LENGTH,
            { message: ERROR_MESSAGES.name }
        ),

    email: z.string()
        .email({ message: ERROR_MESSAGES.email.format })
        .refine(
            (email) => isValidEmailDomain(email),
            { message: ERROR_MESSAGES.email.domain }
        ),
    password: passowrdSchema,

    confirmPassword: z.string()
}).refine(
    (data) => data.password === data.confirmPassword,
    {
        message: ERROR_MESSAGES.confirmPassword,
        path: ['confirmPassword'],
    }
)


// Main Signin Schema
export const signinSchema = z.object({
    email: z.string()
        .email({ message: ERROR_MESSAGES.email.format })
        .refine(
            (email) => isValidEmailDomain(email),
            { message: ERROR_MESSAGES.email.domain }
        ),
    password: passowrdSchema,
})





