import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { RegistrationFormData } from '../../Interface';
import styles from './RegistrationForm.module.css';

// interface RegistrationFormProps {
//     onSubmit?: (data: RegistrationFormData) => void;
// }

const initialFormState: RegistrationFormData = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
};

export const RegistrationForm: React.FC = () => {
    const [formData, setFormData] = useState<RegistrationFormData>(initialFormState);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleRegistration = (data: RegistrationFormData) => {
        // Send data to your backend API
        console.log('Form data received:', data);
    };
    
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
        handleRegistration(formData);
    };

    const handleReset = () => {
        setFormData(initialFormState);
        setSubmitted(false);
    };

    return (
        <div className={styles.container}>
            <button className={styles.close} onClick={() => navigate('/')}>
                <X
                    className={styles.closeIcon}
                />
            </button>
            
            <div className={styles.header}>
                <h2 className={styles.title}>User Registration</h2>
                <p className={styles.subtitle}>Please fill in your personal, contact, and address details.</p>
            </div>

            {submitted && (
                <div className={styles.successBanner}>
                    Registration submitted successfully!
                </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
                {/* Personal Information */}
                <fieldset className={styles.section}>
                    <legend className={styles.sectionTitle}>Personal Information</legend>
                
                    <div className={styles.row}>
                        <div className={styles.fieldGroup}>
                            <label htmlFor="firstName" className={styles.label}>First Name *</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className={styles.input}
                                placeholder="Subi"
                                required
                            />
                        </div>

                        <div className={styles.fieldGroup}>
                            <label htmlFor="lastName" className={styles.label}>Last Name *</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className={styles.input}
                                placeholder="Doe"
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.fieldGroup}>
                            <label htmlFor="dateOfBirth" className={styles.label}>Date of Birth *</label>
                            <input
                                type="date"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                className={styles.input}
                                required
                            />
                        </div>

                        <div className={styles.fieldGroup}>
                            <span className={styles.label}>Gender *</span>
                            <div className={styles.radioGroup}>
                                <label className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        checked={formData.gender === 'male'}
                                        onChange={handleChange}
                                        required
                                    />
                                    Male
                                </label>
                                <label className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        checked={formData.gender === 'female'}
                                        onChange={handleChange}
                                    />
                                    Female
                                </label>
                                <label className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="other"
                                        checked={formData.gender === 'other'}
                                        onChange={handleChange}
                                    />
                                    Other
                                </label>
                            </div>
                        </div>
                    </div>
                </fieldset>

                {/* Contact Information */}
                <fieldset className={styles.section}>
                    <legend className={styles.sectionTitle}>Contact Details</legend>
                    
                    <div className={styles.row}>
                        <div className={styles.fieldGroup}>
                            <label htmlFor="email" className={styles.label}>Email Address *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={styles.input}
                                placeholder="subi.doe@example.com"
                                required
                            />
                        </div>

                        <div className={styles.fieldGroup}>
                            <label htmlFor="phone" className={styles.label}>Phone Number *</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className={styles.input}
                                placeholder="+1 (555) 123-4567"
                                required
                            />
                        </div>
                    </div>
                </fieldset>

                {/* Address Information */}
                <fieldset className={styles.section}>
                    <legend className={styles.sectionTitle}>Address Information</legend>
                    
                    <div className={styles.fieldGroup}>
                        <label htmlFor="streetAddress" className={styles.label}>Street Address *</label>
                        <input
                            type="text"
                            id="streetAddress"
                            name="streetAddress"
                            value={formData.streetAddress}
                            onChange={handleChange}
                            className={styles.input}
                            placeholder="123 Main Street, Apt 4B"
                            required
                        />
                    </div>

                    <div className={styles.row}>
                        <div className={styles.fieldGroup}>
                            <label htmlFor="city" className={styles.label}>City *</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className={styles.input}
                                placeholder="New York"
                                required
                            />
                        </div>

                        <div className={styles.fieldGroup}>
                            <label htmlFor="state" className={styles.label}>State / Province *</label>
                            <input
                                type="text"
                                id="state"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                className={styles.input}
                                placeholder="NY"
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.fieldGroup}>
                            <label htmlFor="postalCode" className={styles.label}>Postal / Zip Code *</label>
                            <input
                                type="text"
                                id="postalCode"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleChange}
                                className={styles.input}
                                placeholder="10001"
                                required
                            />
                        </div>

                        <div className={styles.fieldGroup}>
                            <label htmlFor="country" className={styles.label}>Country *</label>
                            <select
                                id="country"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                className={styles.select}
                                required
                            >
                                <option value="" disabled>Select a country</option>
                                <option value="IN">India</option>
                                <option value="US">United States</option>
                                <option value="UK">United Kingdom</option>
                                <option value="CA">Canada</option>
                                <option value="AU">Australia</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </div>
                    </div>
                </fieldset>

                {/* Actions */}
                <div className={styles.actions}>
                    <button type="button" onClick={handleReset} className={styles.resetButton}>
                        Clear Form
                    </button>
                    <button type="submit" className={styles.submitButton}>
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};
