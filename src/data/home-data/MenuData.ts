interface MenuItem {
  id: number;
  title: string;
  link: string;
  menu_class?: string;
  home_sub_menu?: {
    menu_details: {
      link: string;
      title: string;
      badge?: string;
      badge_class?: string;
    }[];
  }[];
  sub_menus?: {
    link: string;
    title: string;
    dropdown?: boolean;
    mega_menus?: {
      link: string;
      title: string;
    }[];
  }[];
}
[];
const menu_data: MenuItem[] = [
  {
    id: 1,
    title: "Home",
    link: "/",
    menu_class: "menu",
  },
  {
    id: 2,
    title: "Crop Cultivation Techniques",
    link: "#",
    sub_menus: [
      { link: "/success-story", title: "Seasonal crop guides" },
      { link: "/", title: "Organic farming methods" },
      { link: "/lesson", title: "Advanced irrigation techniques" },
      {
        link: "/lesson",
        title: "Best practices in pest and disease management",
      },
    ],
  },
  {
    id: 3,
    title: "Sustainable Agriculture",
    link: "#",
    sub_menus: [
      { link: "/about-us", title: "Eco-friendly farming practices" },

      { link: "/login", title: "Water conservation in agriculture" },
      { link: "/registration", title: "Agroforestry and permaculture" },
      { link: "/not-found", title: "Renewable energy use in farming" },
    ],
  },
  {
    id: 4,
    title: " Agri-Tech Innovations",
    link: "#",
    sub_menus: [
      {
        link: "/about-us",
        title: "Latest technological advancements in farming",
      },

      { link: "/login", title: "Precision farming techniques" },
      {
        link: "/registration",
        title: "Agri-apps and digital tools for farmers",
      },
      { link: "/not-found", title: "Use of AI in agriculture" },
    ],
  },
  {
    id: 5,
    title: "Farmer Success Stories",
    link: "#",
    sub_menus: [
      {
        link: "/about-us",
        title: "Inspirational stories from progressive farmers",
      },

      {
        link: "/login",
        title: "Innovative farming solutions and techniques from the field",
      },
      {
        link: "/registration",
        title: "Case studies of profitable small farms and cooperatives",
      },
    ],
  },
  /*  {
    id: 4,
    title: "Dashboard",
    link: "#",
    sub_menus: [
      {
        link: "#",
        title: "Instructor Dashboard",
        dropdown: true,
        mega_menus: [
          { link: "/instructor-dashboard", title: "Dashboard" },
          { link: "/instructor-profile", title: "Profile" },
          { link: "/instructor-enrolled-courses", title: "Enrolled Courses" },
          { link: "/instructor-wishlist", title: "Wishlist" },
          { link: "/instructor-review", title: "Reviews" },
          { link: "/instructor-attempts", title: "My Quiz Attempts" },
          { link: "/instructor-history", title: "Order History" },
          { link: "/instructor-courses", title: "My Course" },
          { link: "/instructor-announcement", title: "Announcements" },
          { link: "/instructor-quiz", title: "Quiz Attempts" },
          { link: "/instructor-assignment", title: "Assignments" },
          { link: "/instructor-setting", title: "Settings" },
        ],
      },
      {
        link: "#",
        title: "Student Dashboard",
        dropdown: true,
        mega_menus: [
          { link: "/student-dashboard", title: "Dashboard" },
          { link: "/student-profile", title: "Profile" },
          { link: "/student-enrolled-courses", title: "Enrolled Courses" },
          { link: "/student-wishlist", title: "Wishlist" },
          { link: "/student-review", title: "Reviews" },
          { link: "/student-attempts", title: "My Quiz Attempts" },
          { link: "/student-history", title: "Order History" },
          { link: "/student-setting", title: "Settings" },
        ],
      },
    ],
  }, */
];
export default menu_data;
