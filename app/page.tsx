import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col flex-1">
      <section className="flex-grow flex px-4 py-2">
        <section className="flex-1 flex flex-col items-center">
          <h1 className="text-center text-7xl font-bold mt-4">SHS Web Dev Club</h1>
          <p className="w-3/5 text-center text-xl">Join us at our bi-monthly meetings on Wednesdays in room (idk) to learn and practice web development.</p>
          <Link href="/about" className="mt-10 px-32 py-10 text-2xl bg-dark font-semibold rounded-md hover:bg-light hover:rounded-xl transition-all ease-in-out active:tracking-wider">
            Learn More
          </Link>
        </section>
        <section className="flex items-center justify-center shrink-0">
          <svg
            width="500"
            height="500"
            viewBox="0 0 225 225"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M64.5339 25.0661C33.7339 38.7691 6.50894 51.0091 4.03394 52.2661L-0.466064 54.5511L60.0339 55.0511L120.534 55.5511L125.376 58.9121C128.039 60.7611 131.414 64.2891 132.876 66.7521C134.338 69.2151 141.749 80.7531 149.346 92.3911C156.943 104.029 165.155 117.601 167.595 122.551C177.79 143.231 176.911 155.015 164.758 160.576C154.992 165.045 144.818 165.981 102.783 166.278L64.0329 166.551V130.301L64.0339 94.0511H79.1249H94.2159L93.9109 115.801L93.6059 137.551L119.32 137.818C137.044 138.002 145.034 137.753 145.034 137.017C145.034 136.43 136.372 123.768 125.784 108.88L106.534 81.8091L74.5339 82.4281C56.9339 82.7691 37.6969 83.0481 31.7839 83.0491L21.0339 83.0511V122.426C21.0339 144.082 21.2969 163.095 21.6189 164.676C22.1469 167.276 26.9679 170.253 72.0129 195.801C99.4079 211.338 122.301 224.051 122.887 224.051C123.473 224.051 146.358 211.475 173.743 196.104L223.534 168.157L223.792 111.715L224.05 55.2731L173.727 27.6621C146.05 12.4761 122.759 0.0731215 121.969 0.101122C121.18 0.128122 95.3339 11.3631 64.5339 25.0661Z"
              fill="#96B6C5"
            />
          </svg>
        </section>
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
