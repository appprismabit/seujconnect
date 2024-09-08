import InstructorProfile from "@/dashboard/instructor-dashboard/profile";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Seuj Connect",
};
const index = () => {
  return (
    <Wrapper>
      <InstructorProfile />
    </Wrapper>
  )
}

export default index