import Agent from "@/components/Agent";

const Page = () => {
  return (
    <>
      <h3>Interview Generation</h3>
      <Agent userName={"user"} userId={"user1"} type={"generate"} />
    </>
  );
};
export default Page;
