import AuthorProfile from "@/dashboard/instructor-dashboard/profile";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Seuj Connect",
};
const index = () => {
  return (
    <Wrapper>
      <AuthorProfile />
    </Wrapper>
  );
};

export default index;
