// ... existing code ...
export interface SignupForm {
    username: string;        // Required: Unique username for the user
    email: string;           // Required: User's email address
    password: string;        // Required: User's password
    confirmPassword: string; // Required: Confirmation of the user's password
    firstName?: string;      // Optional: User's first name
    lastName?: string;       // Optional: User's last name
    phoneNumber?: string;    // Optional: User's phone number
    termsAccepted: boolean;   // Required: Indicates if the user accepts terms and conditions
}
// ... existing code ...