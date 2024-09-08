import NotFound from "@/components/inner-pages/error";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Seuj Connect:",
};
const page = () => {
   return (
      <Wrapper>
         <NotFound />
      </Wrapper>
   )
}

export default page