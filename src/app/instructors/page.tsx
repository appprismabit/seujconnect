import Instructors from "@/components/inner-pages/instructors/instructor";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "",
};
const index = () => {
   return (
      <Wrapper>
         <Instructors />
      </Wrapper>
   )
}

export default index