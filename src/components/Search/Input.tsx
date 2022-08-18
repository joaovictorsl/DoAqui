import React from 'react';
import { TextInput, View } from 'react-native';
import { globalStyle } from '../../globalStyle';

import { styles } from './styles';

interface Props {
  handleSubmit: (search: string) => void;
}

export const Search: React.FC<Props> = ({ handleSubmit }) => {

  const [search, setSearch] = React.useState<string>("");

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={globalStyle.textInput}
        placeholder="Buscar"
        placeholderTextColor="#fff"
        value={search}
        onChangeText={(e) => setSearch(e)}
        onSubmitEditing={() => handleSubmit(search)}
        selectTextOnFocus={true}
      />
    </View>
  )
}