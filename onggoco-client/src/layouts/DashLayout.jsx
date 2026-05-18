import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  CssBaseline,
  Avatar,
  Tooltip,
  useMediaQuery,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Dashboard as DashboardIcon,
  BarChart as BarChartIcon,
  People as PeopleIcon,
  Article as ArticleIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  NotificationsNone as NotificationsIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#f97316" },
    background: { default: "#0d0d0d", paper: "#161616" },
  },
  typography: { fontFamily: "'Syne', 'DM Sans', sans-serif" },
});

const DRAWER_WIDTH = 220;
const MINI_WIDTH = 64;

const navItems = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { label: "Reports", icon: <BarChartIcon />, path: "/dashboard/reports" },
  { label: "Users", icon: <PeopleIcon />, path: "/dashboard/users" },
  { label: "Articles", icon: <ArticleIcon />, path: "/dashboard/articles" },
];

export default function DashLayout() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width:768px)");
  const drawerWidth = open ? DRAWER_WIDTH : MINI_WIDTH;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("firstName");
    localStorage.removeItem("type");
    navigate("/auth/signin");
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#0d0d0d" }}>
        <CssBaseline />
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');* { box-sizing: border-box; }`}</style>

        {/* Top AppBar */}
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            zIndex: 1200,
            bgcolor: "#111111",
            borderBottom: "1px solid rgba(249,115,22,0.12)",
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            transition: "width 0.3s ease, margin 0.3s ease",
          }}
        >
          <Toolbar
            sx={{
              justifyContent: "space-between",
              minHeight: "60px !important",
              px: 3,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              {isMobile && (
                <IconButton
                  onClick={() => setOpen(!open)}
                  sx={{ color: "#f97316" }}
                  size="small"
                >
                  <MenuIcon />
                </IconButton>
              )}
              <Typography
                sx={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  color: "#f1f5f9",
                  letterSpacing: "0.03em",
                }}
              >
                {navItems.find((n) => n.path === location.pathname)?.label ??
                  "Dashboard"}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Tooltip title="Notifications">
                <IconButton
                  size="small"
                  sx={{ color: "#475569", "&:hover": { color: "#f97316" } }}
                >
                  <NotificationsIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Settings">
                <IconButton
                  size="small"
                  sx={{ color: "#475569", "&:hover": { color: "#f97316" } }}
                >
                  <SettingsIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Logout">
                <IconButton
                  onClick={handleLogout}
                  size="small"
                  sx={{ color: "#475569", "&:hover": { color: "#f97316" } }}
                >
                  <LogoutIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  ml: 1,
                  bgcolor: "#f97316",
                  color: "#000",
                  fontSize: "0.7rem",
                  fontWeight: 800,
                  fontFamily: "'Syne', sans-serif",
                  cursor: "pointer",
                }}
              >
                AD
              </Avatar>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Sidebar Drawer */}
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? open : true}
          onClose={() => setOpen(false)}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              overflowX: "hidden",
              bgcolor: "#111111",
              borderRight: "1px solid rgba(249,115,22,0.12)",
              transition: "width 0.3s ease",
              display: "flex",
              flexDirection: "column",
            },
          }}
        >
          {/* Brand */}
          <Box
            sx={{
              minHeight: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: open ? "space-between" : "center",
              px: open ? 2 : 1,
              borderBottom: "1px solid rgba(249,115,22,0.12)",
              flexShrink: 0,
            }}
          >
            {open && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                <Box
                  sx={{
                    width: 28,
                    height: 28,
                    bgcolor: "#f97316",
                    transform: "rotate(45deg)",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Box
                    sx={{
                      transform: "rotate(-45deg)",
                      color: "#000",
                      fontSize: "0.65rem",
                      fontWeight: 800,
                      lineHeight: 1,
                    }}
                  >
                    P
                  </Box>
                </Box>
                <Typography
                  sx={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "0.85rem",
                    color: "#f1f5f9",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  PANEL
                </Typography>
              </Box>
            )}
            <IconButton
              onClick={() => setOpen(!open)}
              size="small"
              sx={{ color: "#475569", "&:hover": { color: "#f97316" } }}
            >
              {open ? (
                <ChevronLeftIcon fontSize="small" />
              ) : (
                <MenuIcon fontSize="small" />
              )}
            </IconButton>
          </Box>

          {/* Nav Items */}
          <List sx={{ mt: 2, px: 1, flexGrow: 1 }}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                  <Tooltip title={!open ? item.label : ""} placement="right">
                    <ListItemButton
                      onClick={() => navigate(item.path)}
                      sx={{
                        borderRadius: "8px",
                        minHeight: 44,
                        justifyContent: open ? "initial" : "center",
                        px: 1.5,
                        position: "relative",
                        bgcolor: isActive
                          ? "rgba(249,115,22,0.1)"
                          : "transparent",
                        "&:hover": {
                          bgcolor: isActive
                            ? "rgba(249,115,22,0.15)"
                            : "rgba(255,255,255,0.03)",
                        },
                        "&::before": isActive
                          ? {
                              content: '""',
                              position: "absolute",
                              left: 0,
                              top: "18%",
                              height: "64%",
                              width: "3px",
                              bgcolor: "#f97316",
                              borderRadius: "0 3px 3px 0",
                            }
                          : {},
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 1.5 : "auto",
                          justifyContent: "center",
                          color: isActive ? "#f97316" : "#475569",
                          "& svg": { fontSize: 20 },
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      {open && (
                        <ListItemText
                          primary={item.label}
                          primaryTypographyProps={{
                            fontFamily: "'Syne', sans-serif",
                            fontSize: "0.85rem",
                            fontWeight: isActive ? 700 : 400,
                            color: isActive ? "#f1f5f9" : "#64748b",
                          }}
                        />
                      )}
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
              );
            })}
          </List>

          {/* Bottom user card */}
          {open && (
            <Box
              sx={{
                mx: 1,
                mb: 2,
                p: 1.5,
                borderRadius: "10px",
                border: "1px solid rgba(249,115,22,0.15)",
                bgcolor: "rgba(249,115,22,0.04)",
                flexShrink: 0,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: "#f97316",
                    color: "#000",
                    fontSize: "0.7rem",
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                  }}
                >
                  AD
                </Avatar>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      color: "#f1f5f9",
                      lineHeight: 1.2,
                    }}
                  >
                    Admin
                  </Typography>
                  <Typography sx={{ fontSize: "0.68rem", color: "#475569" }}>
                    admin@panel.dev
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </Drawer>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            mt: "60px",
            bgcolor: "#0d0d0d",
            minHeight: "calc(100vh - 60px)",
            width: 0,
            overflow: "auto",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
