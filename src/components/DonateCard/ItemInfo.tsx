import React, { ReactElement, useRef } from 'react';
import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { Row } from './Row';

import { styles } from './styles'
import { Tag } from './Tag';

interface Props {
  title: string,
  description: string,
  distance: string,
  tags: string[]
}

export const ItemInfo: React.FC<Props> = ({ title, description, distance, tags }) => {
  const loadTags = () => {
    let upChildren: ReactElement[] = [];
    let downChildren: ReactElement[] = [];

    tags.forEach((tag, idx) => {
      let element = <Tag value={tag} key={idx} />;
      if (idx % 2 == 0) {
        downChildren.push(element);
      } else {
        upChildren.push(element);
      }
    });

    return (
      <View style={styles.itemViewTags}>
        <Row children={upChildren} />
        <Row children={downChildren} />
      </View>
    );
  }

  return (
    <View style={styles.itemTextView}>
      <View style={styles.itemViewInfo}>
        <Text style={styles.itemInfo}>{title}</Text>
        <Text style={styles.itemInfo}>{description}</Text>
        <Text style={styles.itemInfo}>{distance} km</Text>
      </View>
      {loadTags()}
    </View>
  );
}