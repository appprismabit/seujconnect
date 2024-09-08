interface DataType {
   id: number;
   icon: string;
   count: number;
   title: string;
}[];

const dashboard_count_data: DataType[] = [
   {
      id: 1,
      icon: "skillgro-book",
      count: 30,
      title: "Published Articles",
   },
   {
      id: 2,
      icon: "skillgro-tutorial",
      count: 10,
      title: "Draft Articles",
   },
   {
      id: 3,
      icon: "skillgro-diploma-1",
      count: 7,
      title: "Pneding For Approval",
   },
];

export default dashboard_count_data;