import { useState, useEffect, useContext } from "react";
import AuthorizedUserContext from "../../contexts/AuthorizedUserContext";
// import CommentListSimple from '../../components/CommentListSimple'
import PostListSimple from "../../components/PostListSimple";
// import {fetchComments} from '../../utils/dummyData'
import { fetchUser } from "../../firebase/userModel";
import { fetchPostsByUserId } from "../../firebase/postModel";
import UserProfileTabs from "../../components/UserProfileTabs.tsx";
import { Notebook, Users } from "tabler-icons-react";
import {
  Container,
  Group,
  createStyles,
  Avatar,
  Card,
  Text,
  MediaQuery,
} from "@mantine/core";
import { useParams, useNavigate } from "react-router-dom";
// import EditProfileDrawer from '../../components/EditProfileDrawer'
import UpdateProfileModal from "../../components/UpdateProfileModal";
import ContentSkeleton from "../../components/ContentSkeleton";
import FollowUser from "../../components/FollowUser";
// import SimpleNotification from '../../components/SimpleNotification'
// import UpdateProfile from '../updateprofile/UpdateProfile'
// import UserProfileMenu from '../../components/UserProfileMenu.tsx'
// import SimpleDrawer from '../../components/SimpleDrawer'

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
  },
  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
  },
  profileHeader: {
    display: "flex",
    alignItems: "center",
    minWidth: "715px",
  },
  mobile: {
    display: "none",
  },
  profileHeaderMobile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  containerMobile: {
    display: "flex",
    padding: 0,
  },
  desktop: {
    display: "none",
  },
}));

function UserProfile() {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const { classes } = useStyles();
  const { authUser } = useContext(AuthorizedUserContext);
  let { uid } = useParams();
  let navigate = useNavigate;

  useEffect(() => {
    fetchUser(uid)
      .then((res) => {
        setUser({ ...res });
      })
      .catch((err) => console.log(err));
  }, [uid, authUser.uid, navigate]);
  useEffect(() => {
    fetchPostsByUserId(uid, setPosts).catch((err) => console.log(err));
  }, [uid]);
  console.log(posts, "<==================");
  return (
    <>
      <MediaQuery largerThan="sm" styles={classes.mobile}>
        <Container mt={20} className={classes.containerMobile} size="xl">
          <Container p={0}>
            <Card
              className={classes.profileHeaderMobile}
              withBorder
              p="xl"
              radius={0}
            >
              <Avatar
                radius={100}
                size={200}
                src={user?.avatarUrl}
                alt={user?.name}
              />
              <Container mr={10} ml={10}>
                <Text align="left" size="lg" weight={500} mt="sm">
                  {user?.name}
                </Text>
                <Text
                  mb={10}
                  size="xs"
                  sx={{ textTransform: "uppercase" }}
                  weight={700}
                  color="dimmed"
                >
                  {user.userName ? `@${user.userName}` : null}
                </Text>
                <Group mb={10} noWrap spacing={10} mt={10}>
                  <Notebook size={20} className={classes.icon} />
                  <Text size="sm" color="dimmed">
                    {user?.posts}
                  </Text>
                  <Users size={20} className={classes.icon} />
                  <Text size="sm" color="dimmed">
                    {user?.followers}
                  </Text>
                </Group>
                <Text align="left" size="sm" color="dimmed">
                  {user?.bio}
                </Text>
                {uid === authUser.uid ? (
                  <UpdateProfileModal align={"center"} user={user} />
                ) : (
                  <FollowUser />
                )}
              </Container>
            </Card>
            <UserProfileTabs
              timeline={
                posts.length > 0 ? (
                  <PostListSimple {...{ posts, setPosts }} />
                ) : (
                  <ContentSkeleton />
                )
              }
            />
          </Container>
          {/* <SimpleDrawer content={<UserProfileMenu mainLinks={userLinks} />} /> */}
        </Container>
      </MediaQuery>
      <MediaQuery smallerThan="sm" styles={classes.desktop}>
        <Container mt={20} className={classes.container} size="xl">
          <Container>
            <Card
              className={classes.profileHeader}
              withBorder
              p="xl"
              radius={0}
            >
              <Avatar
                radius={100}
                size={125}
                src={user?.avatarUrl}
                alt={user?.name}
              />
              <Container mr={10} ml={10}>
                <Text align="left" size="lg" weight={500} mt="sm">
                  {user?.name}
                </Text>
                <Text
                  mb={10}
                  size="xs"
                  sx={{ textTransform: "uppercase" }}
                  weight={700}
                  color="dimmed"
                >
                  {user.userName ? `@${user.userName}` : null}
                </Text>
                <Group mb={10} noWrap spacing={10} mt={10}>
                  <Notebook size={20} className={classes.icon} />
                  <Text size="sm" color="dimmed">
                    {posts.length}
                  </Text>
                  <Users size={20} className={classes.icon} />
                  <Text size="sm" color="dimmed">
                    {user?.followers}
                  </Text>
                </Group>
                <Text align="left" size="sm" color="dimmed">
                  {user?.bio}
                </Text>
                {uid === authUser.uid ? (
                  <UpdateProfileModal align={"left"} user={user} />
                ) : (
                  <FollowUser />
                )}
              </Container>
            </Card>
            <UserProfileTabs
              timeline={
                posts.length > 0 ? (
                  <PostListSimple {...{ posts, setPosts }} />
                ) : (
                  <ContentSkeleton />
                )
              }
            />
          </Container>
          {/* <SimpleDrawer content={<UserProfileMenu mainLinks={userLinks} />} /> */}
        </Container>
      </MediaQuery>
    </>
  );
}
export default UserProfile;
