import AddPost from "@/components/AddPost";
import Feed from "@/components/Feed";
import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";
import Stories from "@/components/Stories";

export default function Home() {
  return (
    <div className="flex gap-6 pt-6">
      <section className="hidden xl:block w-[20%]">
        <LeftMenu type="home" />
      </section>
      <section className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          {/* <Stories /> */}
          <AddPost />
          <Feed />
        </div>
      </section>
      <section className="hidden lg:block w-[30%]">
        <RightMenu />
      </section>
    </div>
  );
}
