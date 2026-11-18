export interface UserData {
    name: string;
    username: string;
    role: string;
    bio: string;
    location: string;
    email: string;
    avatarUrl: string;
    coverUrl?: string;
    stats: {
        posts: number;
        followers: number;
        following: number;
    };
}

export interface RegistrationFormData {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: 'male' | 'female' | 'other' | '';
    email: string;
    phone: string;
    streetAddress: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}