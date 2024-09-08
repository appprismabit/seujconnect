
import InstructorAssignment from "@/dashboard/instructor-dashboard/instructor-assignment";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Seuj Connect : Author Dashboard",
};
const index = () => {
  return (
    <Wrapper>
      <InstructorAssignment />
    </Wrapper>
  );
};

export default index;
