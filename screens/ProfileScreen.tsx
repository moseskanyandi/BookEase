import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import profileData from '../constants/profile';
import strings from '../localization/profile';
import type { Props } from '../types/profile';
import styles from './ProfileScreen.styles';

export default function ProfileScreen({ role }: Props) {
  const initials = profileData.name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const handleEditProfile = () => {
    Alert.alert(strings.editAlertTitle, strings.editAlertMessage);
  };

  const displayRole = role ?? profileData.role;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <Text style={styles.name}>{profileData.name}</Text>
        <Text style={styles.role}>{displayRole}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>{strings.phoneLabel}</Text>
          <Text style={styles.value}>{profileData.phone}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>{strings.emailLabel}</Text>
          <Text style={styles.value}>{profileData.email}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
        <Text style={styles.editButtonText}>{strings.editButton}</Text>
      </TouchableOpacity>
    </View>
  );
}
