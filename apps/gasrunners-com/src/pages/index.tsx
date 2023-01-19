import { type NextPage } from "next";
import Link from "../components/Link";

const Home: NextPage = () => {
  return (
    <>
      <main
        className="flex h-screen w-screen items-center justify-center"
      >
        <div className="text-center">
          <h1>gasrunners</h1>

          <Link href="https://twitter.com/0xgafu" external>@0xgafu</Link>
          <Link href="https://github.com/gasrunners" external>Github</Link>
        </div>
      </main>
    </>
  );
};

export default Home;
