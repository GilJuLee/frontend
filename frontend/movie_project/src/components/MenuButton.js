import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

export default function TemporaryDrawer() {
  const [showMenu, setShowMenu] = React.useState(false);

  const toggleDrawer = (event) => {
    setShowMenu(!showMenu);
  };
  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
        onClick={toggleDrawer}
      >
        <MenuIcon fontSize="large" />
      </IconButton>
      <Drawer open={showMenu} onClose={toggleDrawer}>
        <Box
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/search">
                {/* search뒤에다가 쿼리스트링 붙여주기 ex.?query=series 그 쿼리스트링을 searchResult페이지에서 searchParams로 읽은다음 관련 결과 띄워주기 */}
                <ListItemText primary="시리즈" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/search">
                <ListItemText primary="영화" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/search">
                <ListItemText primary="NEW! 요즘 대세 콘텐츠" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/search">
                <ListItemText primary="내가 찜한 콘텐츠" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
