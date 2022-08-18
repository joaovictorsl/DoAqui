import React from 'react';
import { View, Text } from 'react-native';

import { styles } from './styles'

export const Comment: React.FC = ({ value: comment, ownerEmail }) => {
  return (
    <View style={styles.commentBody}>
      <Text style={{ ...styles.userEmail, color: ownerEmail == comment.userEmail ? "#F06907" : "#fff" }}>{comment.userEmail}:</Text>
      <Text style={styles.content}>{comment.content}</Text>
    </View>
  )
}
