import { getUserSession } from "@/helpers/getUserSession";

const DashboardHomePage = async () => {
  /*   const session = await getServerSession(authOptions);
  console.log(session); */

  //above er kaj tai ene kora hoise extra function kore
  const session = await getUserSession();

  return (
    <div className="p-10 text-2xl">
      <h1>welcome, {session?.user?.name}</h1>
      <h1>Email : {session?.user?.email}</h1>
    </div>
  );
};

export default DashboardHomePage;
