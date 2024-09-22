interface DataType {
  id: number;
  title: string;
  class_name?: string;
  sidebar_details: {
    id: number;
    link: string;
    icon: string;
    title: string;
  }[];
}

const sidebar_data: DataType[] = [
  {
    id: 0,
    title: "Welcome, User",
    sidebar_details: [
      {
        id: 1,
        link: "/author/author-dashboard",
        icon: "fas fa-home",
        title: "Dashboard",
      },
      {
        id: 2,
        link: "/author/author-profile",
        icon: "skillgro-avatar",
        title: "Published Articles",
      },
      {
        id: 3,
        link: "/author/author-articles",
        icon: "skillgro-book",
        title: "Rejected Articles",
      },
      {
        id: 4,
        link: "/author/author-setting",
        icon: "skillgro-settings",
        title: "Settings",
      },
    ],
  },
  {
    id:1,
    title: "Welcome, User",
    sidebar_details: [
      {
        id: 1,
        link: "/author/author-dashboard",
        icon: "fas fa-home",
        title: "Dashboard",
      },
      {
        id: 2,
        link: "/author/author-profile",
        icon: "skillgro-avatar",
        title: "My Profile",
      },
      {
        id: 3,
        link: "/author/author-articles",
        icon: "skillgro-book",
        title: "My Articles",
      },
      {
        id: 4,
        link: "/author/author-setting",
        icon: "skillgro-settings",
        title: "Settings",
      },
    ],
  },
  
];



export default sidebar_data; // Default export
