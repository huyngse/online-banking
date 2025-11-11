import z from "zod";

export const signInSchema = z.object({
    email: z.email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters")
})

export const signUpSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    password: z.string().min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[\W_]/, "Password must contain at least one special character"),
    confirmPassword: z.string(),
    ssn: z.string()
        .regex(/^\d{3}-\d{2}-\d{4}$/, "SSN must be in the format XXX-XX-XXXX")
}).refine((data) => data.password === data.confirmPassword, {
    error: "Password do not match",
    path: ["confirmPassword"]
})