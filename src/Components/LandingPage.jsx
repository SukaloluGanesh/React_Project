import React, { useEffect, useState } from "react";
import landImage from "../assets/landImage.webp";

import { Link } from "react-router-dom";
import {
  AppBar,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Toolbar,
  Typography,
  Box,
  Avatar,
  CircularProgress,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import {
  CalendarToday,
  Sync,
  Notifications,
  Public,
  People,
  Lock,
  Twitter,
  LinkedIn,
  Facebook,
  Instagram,
  
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu"
const ScheduleMeLanding = () => {
 
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <>
      <div>
        <AppBar position="static" color="transparent" elevation={0}>
          <Container>
            <Toolbar>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  flexGrow: 1,
                  fontFamily: "'Dancing Script', cursive",
                  fontWeight: 700,
                  fontSize: "2rem",
                  color: "#333",
                }}
              >
                scheduleMe
              </Typography>
              <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
                <Button color="inherit" href="#features">
                  Features
                </Button>
                <Button color="inherit" href="#how-it-works">
                  How It Works
                </Button>
                <Button color="inherit" href="#testimonials">
                  Testimonials
                </Button>
                    <Button color="primary" variant="contained">
                      <Link to="/Login">
                      Sign In
                      </Link>
                    </Button>
              </Box>
              <IconButton
              color="inherit"
              edge="end"
              sx={{ display: { xs: "block", md: "none" } }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
        <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ "& .MuiDrawer-paper": { width: 250 } }}
      >
        <List>
          {[
            { text: "Features", link: "#features" },
            { text: "How It Works", link: "#how-it-works" },
            { text: "Testimonials", link: "#testimonials" },
            { text: "Sign In", link: "/login" },
          ].map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton component="a" href={item.link} onClick={handleDrawerToggle}>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

        {/* Hero Section */}
        <Box sx={{ bgcolor: "#f5f5f5", py: 10 }}>
          <Container>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h2"
                  component="h1"
                  fontWeight={700}
                  color="primary"
                  gutterBottom
                >
                  Scheduling Made Simple
                </Typography>
                <Typography variant="h6" color="textSecondary" paragraph>
                  ScheduleMe helps you effortlessly coordinate meetings and
                  appointments, eliminating the back-and-forth emails and
                  streamlining your scheduling process.
                </Typography>
                <Box sx={{ mt: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ borderRadius: 4, textTransform: "none", px: 3 }}
                  >
                    <Link to='/register'>
                    Sign Up
                    </Link>
                  
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    href="#how-it-works"
                    sx={{ borderRadius: 4, textTransform: "none", px: 3 }}
                  >
                    Learn More
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  src={landImage}
                  alt="ScheduleMe Calendar Interface"
                  sx={{ width: "100%", borderRadius: 2 }}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Box sx={{ py: 8 }} id="features">
          <Container>
            <Typography
              variant="h3"
              textAlign="center"
              fontWeight={700}
              color="primary"
              gutterBottom
              sx={{ mb: 6 }}
            >
              Powerful Features
            </Typography>
            <Grid container spacing={4}>
              {[
                {
                  icon: (
                    <CalendarToday
                      fontSize="large"
                      color="primary"
                      sx={{ fontSize: 48, mb: 2 }}
                    />
                  ),
                  title: "Easy Scheduling",
                  description:
                    "Share your availability with a simple link and let others choose the perfect time slot that works for everyone.",
                },
                {
                  icon: (
                    <Sync
                      fontSize="large"
                      color="primary"
                      sx={{ fontSize: 48, mb: 2 }}
                    />
                  ),
                  title: "Calendar Integration",
                  description:
                    "Seamlessly sync with Google Calendar, Outlook, and other popular calendar services to avoid double-bookings.",
                },
                {
                  icon: (
                    <Notifications
                      fontSize="large"
                      color="primary"
                      sx={{ fontSize: 48, mb: 2 }}
                    />
                  ),
                  title: "Smart Reminders",
                  description:
                    "Set custom reminders for meetings and appointments, ensuring you're always prepared and on time.",
                },
                {
                  icon: (
                    <Public
                      fontSize="large"
                      color="primary"
                      sx={{ fontSize: 48, mb: 2 }}
                    />
                  ),
                  title: "Time Zone Detection",
                  description:
                    "Automatic time zone detection eliminates confusion for international meetings and appointments.",
                },
                {
                  icon: (
                    <People
                      fontSize="large"
                      color="primary"
                      sx={{ fontSize: 48, mb: 2 }}
                    />
                  ),
                  title: "Schedule Tasks & Events",
                  description:
                    "Create and manage tasks, meetings, and events all in one place with intuitive drag-and-drop functionality.",
                },
                {
                  icon: (
                    <Lock
                      fontSize="large"
                      color="primary"
                      sx={{ fontSize: 48, mb: 2 }}
                    />
                  ),
                  title: "Privacy Controls",
                  description:
                    "Maintain control over your schedule with customizable buffer times and privacy settings.",
                },
              ].map((feature, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    elevation={4}
                    sx={{
                      height: "100%",
                      textAlign: "center",
                      p: 3,
                      borderRadius: 2,
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                      },
                    }}
                  >
                    {feature.icon}
                    <Typography variant="h5" component="h3" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      {feature.description}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* How It Works Section */}
        <Box sx={{ bgcolor: "#f5f5f5", py: 8 }} id="how-it-works">
          <Container>
            <Typography
              variant="h3"
              textAlign="center"
              fontWeight={700}
              color="primary"
              gutterBottom
              sx={{ mb: 6 }}
            >
              How It Works
            </Typography>
            <Grid container spacing={4}>
              {[
                {
                  step: 1,
                  title: "Set Your Availability",
                  description:
                    "Define your availability preferences and create customized scheduling links for different meeting types.",
                },
                {
                  step: 2,
                  title: "Share Your Link",
                  description:
                    "Send your personalized scheduling link to clients, colleagues, or anyone you need to meet with.",
                },
                {
                  step: 3,
                  title: "Get Booked & Reminded",
                  description:
                    "Your invitees select a time that works for them, and the meeting is automatically added to everyone's calendar with customizable reminders.",
                },
              ].map((step, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card
                    elevation={4}
                    sx={{
                      height: "100%",
                      p: 3,
                      borderRadius: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        bgcolor: "primary.main",
                        color: "white",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        mb: 2,
                      }}
                    >
                      {step.step}
                    </Box>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {step.title}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      {step.description}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Testimonials Section */}
        <Box sx={{ py: 8 }} id="testimonials">
          <Container>
            <Typography
              variant="h3"
              textAlign="center"
              fontWeight={700}
              color="primary"
              gutterBottom
              sx={{ mb: 6 }}
            >
              What Our Users Say
            </Typography>
            <Grid container spacing={4}>
              {[
                {
                  quote:
                    "ScheduleMe has transformed how I book client meetings. No more endless email chains - just one simple link and we're done!",
                  name: "Sarah Johnson",
                  title: "Marketing Consultant",
                },
                {
                  quote:
                    "The task scheduling feature has been a game-changer for our team. We've improved productivity and reduced missed deadlines by 80%.",
                  name: "Michael Chen",
                  title: "Business Analyst",
                },
                {
                  quote:
                    "I love how ScheduleMe integrates with all my calendars and sends smart reminders. It's intuitive, reliable, and has eliminated missed appointments completely.",
                  name: "Emma Rodriguez",
                  title: "Freelance Designer",
                },
              ].map((testimonial, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card elevation={2} sx={{ height: "100%" }}>
                    <CardContent>
                      <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                        "{testimonial.quote}"
                      </Typography>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item>
                          <Avatar
                            src={`/api/placeholder/60/60`}
                            alt={testimonial.name}
                          />
                        </Grid>
                        <Grid item>
                          <Typography variant="h6" component="h4" sx={{ m: 0 }}>
                            {testimonial.name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {testimonial.title}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Call to Action */}
        <Box
          sx={{
            bgcolor: "primary.main",
            color: "white",
            py: 8,
            textAlign: "center",
          }}
        >
          <Container>
            <Typography
              variant="h3"
              component="h2"
              fontWeight={700}
              gutterBottom
            >
              Ready to simplify your scheduling?
            </Typography>
            <Typography variant="h6" paragraph sx={{ mb: 4 }}>
              Join thousands of professionals who have transformed their
              scheduling process.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{
                bgcolor: "white",
                color: "primary.main",
                borderRadius: 4,
                textTransform: "none",
                px: 4,
                py: 1,
                "&:hover": {
                  bgcolor: "#f5f5f5",
                },
              }}
            >
              <Link to='/register' >
              Sign Up Now
              </Link>
             
            </Button>
          </Container>
        </Box>

        {/* Footer */}
        <Box
          component="footer"
          sx={{ bgcolor: "#263238", color: "white", py: 6 }}
        >
          <Container>
            <Grid container spacing={4}>
              <Grid item xs={12} md={3}>
                <Typography variant="h6" gutterBottom>
                  ScheduleMe
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Simplifying scheduling for professionals and teams around the
                  world.
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Twitter sx={{ cursor: "pointer" }} />
                  <LinkedIn sx={{ cursor: "pointer" }} />
                  <Facebook sx={{ cursor: "pointer" }} />
                  <Instagram sx={{ cursor: "pointer" }} />
                </Box>
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Typography variant="h6" gutterBottom>
                  Product
                </Typography>
                <Box component="ul" sx={{ pl: 0, listStyleType: "none" }}>
                  {["Features", "Integrations", "Enterprise", "Security"].map(
                    (item, index) => (
                      <Box component="li" key={index} sx={{ mb: 1 }}>
                        <Typography
                          variant="body2"
                          component="a"
                          href="#"
                          sx={{
                            color: "#CFD8DC",
                            textDecoration: "none",
                            "&:hover": { color: "white" },
                          }}
                        >
                          {item}
                        </Typography>
                      </Box>
                    )
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Typography variant="h6" gutterBottom>
                  Resources
                </Typography>
                <Box component="ul" sx={{ pl: 0, listStyleType: "none" }}>
                  {["Blog", "Help Center", "Tutorials", "Community"].map(
                    (item, index) => (
                      <Box component="li" key={index} sx={{ mb: 1 }}>
                        <Typography
                          variant="body2"
                          component="a"
                          href="#"
                          sx={{
                            color: "#CFD8DC",
                            textDecoration: "none",
                            "&:hover": { color: "white" },
                          }}
                        >
                          {item}
                        </Typography>
                      </Box>
                    )
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Typography variant="h6" gutterBottom>
                  Company
                </Typography>
                <Box component="ul" sx={{ pl: 0, listStyleType: "none" }}>
                  {["About Us", "Careers", "Contact Us", "Partners"].map(
                    (item, index) => (
                      <Box component="li" key={index} sx={{ mb: 1 }}>
                        <Typography
                          variant="body2"
                          component="a"
                          href="#"
                          sx={{
                            color: "#CFD8DC",
                            textDecoration: "none",
                            "&:hover": { color: "white" },
                          }}
                        >
                          {item}
                        </Typography>
                      </Box>
                    )
                  )}
                </Box>
              </Grid>
            </Grid>
            <Box
              sx={{
                borderTop: 1,
                borderColor: "rgba(255,255,255,0.1)",
                mt: 4,
                pt: 3,
                textAlign: "center",
              }}
            >
              <Typography variant="body2" color="#CFD8DC">
                © {new Date().getFullYear()} ScheduleMe. All rights reserved.
              </Typography>
            </Box>
          </Container>
        </Box>
      </div>
    </>
  );
};

export default ScheduleMeLanding;
