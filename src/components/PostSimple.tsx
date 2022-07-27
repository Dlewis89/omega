import React, {useState} from 'react';
import { createStyles, Text, Avatar, Group, Card, ActionIcon } from '@mantine/core';
import { ThumbUp, RotateClockwise2, Message2 } from 'tabler-icons-react';
// import { relativeTime, loremIpsum } from '../utils/dummyData';
// import PostListSimple from './PostListSimple';
import AddComment from './AddComment.tsx';
// import { useClickOutside } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
  body: {
    paddingTop: theme.spacing.sm,
    textAlign: "left",
  },
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    maxWidth: "820px",
    margin: "auto",

  },
  postedAt: {
    textAlign: "left"
  },
  engagement :{
    paddingTop: 10,
    marginLeft: -10  
  },
  icons: {
    color: theme.colorScheme === 'dark' ? "#FFF" : theme.colors.gray[7]  
  },
  liked: {
    color: theme.colors.blue[5]
  },
  visible: {
    display: "block"
  },
  hidden: {
    display: "none"
  },
  userHeader: {
    // display: "flex",
    // alignContent: "top"
  }
}));

interface CommentSimpleProps {
  postedAt: string;
  body: string;
  author: {
    name: string;
    image: string;
  }
  postComments: {
    postedAt: string;
    body: string;
    author: {
      name: string;
      image: string;
    }
  }[]
}

function PostSimple({ postedAt, body, author, postComments }: CommentSimpleProps) {
  const [thumbsUp, setThumbsUp] = useState(false)
  const [visible, setVisible] = useState(false)
  // const clickOutsideRef = useClickOutside(() => setVisible(false));

//   const postCommentsData = [
//     {
//     postedAt: relativeTime(1658553610894),
//     body: loremIpsum,
//     author: {
//       name: {first: "John", last: "Dode"},
//       image: ""
//         }
//     } 
//   ]

  function handleEngagement() {
   return thumbsUp ? classes.liked : "icons"
  }
  const { classes } = useStyles();
  return (
    <Card withBorder p="xl" radius="sm" className={classes.card}>
      <Group align="initial" className={classes.userHeader}>
        <Avatar size="lg" src={author.image} alt={author.name} radius="xl" />
        <div>
          <Text size="sm">{author.name}</Text>
          <Text className={classes.postedAt} size="xs" color="dimmed">
            {postedAt}
          </Text>
      <Text className={classes.body} size="sm">
        {body}
      </Text>
      <Group className={classes.engagement} spacing="xl">
        <ActionIcon size="xl" radius="lg">
          <div>
            <Message2 
              strokeWidth={1} 
              size={36} 
              className={classes.icons} 
              onClick={()=> setVisible(!visible)}
              />
            </div>
        </ActionIcon>
        <ActionIcon size="xl" radius="lg">
          <div>
            <ThumbUp 
              strokeWidth={1} 
              size={36} 
              className={handleEngagement()} 
              onClick={()=> setThumbsUp(!thumbsUp) } 
              />
          </div>
        </ActionIcon>
        <ActionIcon size="xl" radius="lg">
        <div>
          <RotateClockwise2 
            strokeWidth={1} 
            size={36} 
            className={classes.icons} 
            />
        </div>
        </ActionIcon>        
      </Group>
        </div>
      </Group>
      {/* {postComments.length > 0 && <PostListSimple postComments={postComments} /> } */}
      <AddComment visible={visible} setVisible={setVisible} />
      </Card>
  );
}
export default PostSimple