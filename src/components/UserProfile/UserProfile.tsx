import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { UserData } from '../../Interface';
import styles from './UserProfile.module.css';

interface UserProfileProps {
    initialUser: UserData;
    onClose: () => void;
    onSave?: (updatedUser: UserData) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ initialUser, onClose, onSave }) => {
  const [user, setUser] = useState<UserData>(initialUser);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<UserData>(initialUser);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e: React.SubmitEvent) => {
    e.preventDefault();
    setUser(formData);
    setIsEditing(false);
    if (onSave) {
      onSave(formData);
    }
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  return (
      <div className={styles.container}>
          
        <button className={styles.close} onClick={onClose}>
            <X
                className={styles.closeIcon}
            />
        </button>
          
        <div className={styles.card}>
            {/* Cover Banner */}
            <div
                className={styles.coverBanner}
                style={
                    user.coverUrl ? { backgroundImage: `url(${user.coverUrl})` } : undefined
                }
            />

            {/* Avatar & Action Button */}
            <div className={styles.headerSection}>
                <img
                    src={user.avatarUrl}
                    alt={`${user.name}'s avatar`}
                    className={styles.avatar}
                />
                {!isEditing && (
                    <button
                        type="button"
                        className={styles.editButton}
                        onClick={() => setIsEditing(true)}
                    >
                        Edit Profile
                    </button>
                )}
            </div>

            {/* Profile Content or Edit Form */}
            {isEditing ? (
                <form onSubmit={handleSave} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Full Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="role">Role / Title</label>
                        <input
                            id="role"
                            name="role"
                            type="text"
                            value={formData.role}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="location">Location</label>
                        <input
                            id="location"
                            name="location"
                            type="text"
                            value={formData.location}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="bio">Bio</label>
                        <textarea
                            id="bio"
                            name="bio"
                            rows={3}
                            value={formData.bio}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className={styles.formActions}>
                        <button
                            type="button"
                            className={styles.cancelButton}
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button type="submit" className={styles.saveButton}>
                            Save Changes
                        </button>
                    </div>
                </form>
            ) : (
                <div className={styles.infoSection}>
                    <h1 className={styles.name}>{user.name}</h1>
                    <p className={styles.username}>@{user.username}</p>
                    <p className={styles.role}>{user.role}</p>

                    <p className={styles.bio}>{user.bio}</p>

                    <div className={styles.metaList}>
                        <span>📍 {user.location}</span>
                        <span>✉️ {user.email}</span>
                    </div>

                    {/* Stats Bar */}
                    <div className={styles.statsBar}>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>{user.stats.posts}</span>
                            <span className={styles.statLabel}>Posts</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>{user.stats.followers}</span>
                            <span className={styles.statLabel}>Followers</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>{user.stats.following}</span>
                            <span className={styles.statLabel}>Following</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};
