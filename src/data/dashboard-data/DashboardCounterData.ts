interface DataType {
   id: number;
   class_name?: string;
   dashboard_count_data: {
      id: number;
      icon: string;
      count: number;
      title: string;
      flag: any;
   }[];

}

const dashboard_count_data: DataType[] = [
   {
      id: 0,
      dashboard_count_data: [
         {
            id: 0,
            icon: "fa fa-file-archive",
            count: 10,
            title: "Draft Articles",
            flag: "draft"
         },
         {
            id: 1,
            icon: "fa fa-hourglass-half",
            count: 7,
            title: "Pending Articles",
            flag: "request_for_approval"
         },
         {
            id: 2,
            icon: "skillgro-book",
            count: 30,
            title: "Published Articles",
            flag: "published"
         },
         {
            id: 3,
            icon: "fa fa-ban",
            count: 7,
            title: "Rejected Articles",
            flag: "rejected"
         },
      ],
   },



];

export default dashboard_count_data;
