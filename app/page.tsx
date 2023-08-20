export default function Home() {
  return (
    <main className="flex flex-col flex-1">
      <section className="flex-grow">
        <h1>test</h1>
      </section>
      <section className="px-4">
        {/*will take to projects page, with search params for that specific item*/}
        <h2 className="text-3xl text-center xs:text-left">We Code It all</h2>
        <div className="flex flex-col text-3xl items-center xs:flex-row xs:gap-2">
          <h2 className="p-1 hover:bg-highlight hover:rounded-md rounded-sm transition ease-in-out xs:p-2">
            Websites
          </h2>
          <div className=" h-1 w-11 bg-black max-sm:hidden" />
          <h2 className="p-1 hover:bg-highlight hover:rounded-md rounded-sm transition ease-in-out xs:p-2">
            Apps
          </h2>
          <div className=" h-1 w-11 bg-black max-sm:hidden" />
          <h2 className="p-1 hover:bg-highlight hover:rounded-md rounded-sm transition ease-in-out xs:p-2">
            Games
          </h2>
        </div>
      </section>
    </main>
  );
}
