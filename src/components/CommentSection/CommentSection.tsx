import { useFocusEffect } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { View, TextInput, FlatList } from 'react-native';
import { globalStyle } from '../../globalStyle';
import { CommentInterface } from '../../models/Comment';
import { LoadingScreen } from '../../screens/Loading/Loading';
import { FirebaseContext } from '../../services/context/FirebaseContext';
import { UserContext } from '../../services/context/UserContext';
import { Comment } from '../Comment/Comment';

import { styles } from './styles'

export const CommentSection: React.FC = ({ id, ownerEmail }) => {
  let { doAquiFirebase } = useContext(FirebaseContext);
  let { user } = useContext(UserContext);
  let [loading, setLoading] = useState(false);
  let [comments, setComments] = useState<CommentInterface[]>([]);
  let [content, setContent] = useState<string>("");

  const fetchComments = async () => {
    setLoading(true);
    let newComments = await doAquiFirebase.getComments(id);
    setComments(newComments);
    setLoading(false);
  }

  const handleSubmit = async () => {
    setLoading(true);
    await doAquiFirebase.createComment(content, user.account?.email, id);
    let newComments = await doAquiFirebase.getComments(id);
    newComments.sort((c1, c2) => c1.createdAt.seconds - c2.createdAt.seconds);
    setContent("");
    setComments(newComments);
    setLoading(false);
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchComments();
    }, []));

  const render = () => {
    if (loading) {
      return <LoadingScreen bgColor="#202020" />
    }

    return (
      <>
        <FlatList
          style={{ width: '100%' }}
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={(comment: CommentInterface, idx: number) => {
            return < Comment value={comment.item} ownerEmail={ownerEmail} key={idx} />
          }}
          contentContainerStyle={{ width: '100%', paddingTop: 10, paddingLeft: 10, }}
        />
        {user.account?.email
          ?
          <TextInput
            value={content}
            onChangeText={text => setContent(text)}
            style={globalStyle.textInput} placeholder="Deixe um comentário!" placeholderTextColor="white" onSubmitEditing={() => handleSubmit()} />
          : null
        }
      </>
    )
  }


  return (
    <View style={styles.commentSection}>
      {render()}
    </View>
  )
}
