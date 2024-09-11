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
      id: 1,
      title: "Welcome, User",
      sidebar_details: [
        {
          id: 1,
          link: "/author-dashboard",
          icon: "fas fa-home",
          title: "Dashboard",
        },
        {
          id: 2,
          link: "/author-profile",
          icon: "skillgro-avatar",
          title: "My Profile",
        },
        {
          id: 3,
          link: "/author-articles",
          icon: "skillgro-book",
          title: "My Articles",
        },
        {
          id: 4,
          link: "/author-setting",
          icon: "skillgro-settings",
          title: "Settings",
        },
      ],
    },
  ];

  export default sidebar_data