import {useState, useEffect} from 'react'
import CommentListSimple from '../../components/CommentListSimple'
import {fetchUser, fetchComments} from '../../utils/dummyData'
import UserProfileMenu from '../../components/UserProfileMenu.tsx'
import UserProfileTabs from '../../components/UserProfileTabs.tsx'
import { Notebook, Users } from 'tabler-icons-react'
import { loremIpsum } from '../../utils/dummyData'
import {Container, Group, createStyles, Avatar, Card, Text} from '@mantine/core'
import SimpleDrawer from '../../components/SimpleDrawer'

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
  },
  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
  },
  profileHeader: {
    display: "flex",
    alignItems:"center"
  },
}));

function UserProfile() {
    const [user, setUser] = useState({})
    const [comments, setComments] = useState([])
    const { classes } = useStyles();
    useEffect(()=>{
        fetchUser(setUser)
        .catch(err => console.log(err))
    },[])
    useEffect(()=> {
        fetchComments(setComments)
        .catch(err => console.log(err))
    }, [])

      const userLinks = [
        {label: 'My Posts', link: '/auth/dashboard'},
        {label: 'Highlights', link: '/auth/user'},
        {label: 'Omega', link: '/auth/login'}
      ]      

    return( 
      <>
        <Container mt={20} className={classes.container} size="xl">
          <Container>
            <Card className={classes.profileHeader} withBorder p="xl" radius="sm">
            <Avatar radius={100} size={125} src={user?.avatar} alt={user?.name} />
            <Container mr={10} ml={10}>
              <Text align="left" size="lg" weight={500} mt="sm">
                {user?.name}
              </Text>
              <Text  mb={10} size="xs" sx={{ textTransform: 'uppercase' }} weight={700} color="dimmed">
                @username
              </Text>
              <Text align="left" size="sm" color="dimmed">
                {loremIpsum}
              </Text>
              <Group noWrap spacing={10} mt={10}>
                <Notebook size={20} className={classes.icon} />
                <Text size="sm" color="dimmed">
                  185 Posts
                </Text>
                <Users size={20} className={classes.icon} />
                <Text size="sm" color="dimmed">
                  500 Followers
                </Text>
              </Group>
            </Container>
            </Card>
            <UserProfileTabs timeline={<CommentListSimple comments={comments} />} />
          </Container>
          <SimpleDrawer content={<UserProfileMenu mainLinks={userLinks} />} />
        </Container>
      </>
    )
}
export default UserProfile