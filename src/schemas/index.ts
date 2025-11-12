import z from "zod";

export const signInSchema = z.object({
    email: z.email("Please enter a valid email"),
    password: z.string("Password is required").min(8, "Password must be at least 8 characters")
})

export const signUpSchema = z.object({
    firstName: z.string("First name is required")
        .min(2, "First name must be at least 2 characters")
        .max(50, "Firt name is too long"),
    lastName: z.string("Last name is required")
        .min(2, "Last name must be at least 2 characters")
        .max(50, "Last name is too long"),
    password: z.string("Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password is too long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[\W_]/, "Password must contain at least one special character"),
    confirmPassword: z.string("Confirm password is required"),
    ssn: z.string("SSN is required")
        .regex(/^\d{3}-\d{2}-\d{4}$/, "SSN must be in the format XXX-XX-XXXX"),
    address: z.string("Address is required").max(100, "Address is too long"),
    state: z.string().max(100, "State name is too long").optional(),
    postalCode: z.string("Postal code is required")
        .regex(/^\d{5}(-\d{4})?$/, "Invalid postal code format"),
    dateOfBirth: z.date("Date of birth must be a valid date"),
    email: z.email("Please enter a valid email"),
}).refine((data) => data.password === data.confirmPassword, {
    error: "Password do not match",
    path: ["confirmPassword"]
})