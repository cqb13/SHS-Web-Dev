type Project = {
  name: string;
  description: string;
  url: string;
  homepage?: string;
  stars: number;
  topics: string[];
};

export default function ProjectCard({
  name,
  description,
  url,
  homepage,
  stars,
  topics
}: Project) {
  return (
    <section className='flex flex-col bg-light rounded-md p-4 h-60 justify-between max-xs:h-72'>
      <div>
        <div className='flex justify-between items-center'>
          <h2 className='text-xl'>{name}</h2>
          <div className='flex items-center justify-between py-2 px-3 rounded-full w-fit bg-highlight max-sm:rounded-lg'>
            <svg
              fill='#496bbe'
              width='30px'
              height='30px'
              viewBox='0 -19 550 550'
              xmlns='http://www.w3.org/2000/svg'
            >
              <title>star</title>
              <path d='M181 286L64 188 218 176 275 30 333 176 486 188 369 286 407 436 275 354 144 440 181 286Z' />
            </svg>
            <div className='w-[1px] mr-2 ml-1'></div>
            <span>{stars}</span>
          </div>
        </div>
        <p>{description}</p>
      </div>
      <div className='flex gap-2 py-4 flex-wrap h-10 overflow-y-scroll'>
        {topics.map((topic) => (
          <span key={topic} className='bg-highlight rounded-md px-2 '>
            {topic}
          </span>
        ))}
      </div>
      <div className='flex gap-2 justify-between'>
        <a
          href={url}
          target='_blank'
          className='bg-highlight rounded-md p-2 hover:opacity-90 hover:rounded-lg transition-all ease-in-out text-center'
        >
          View Repo
        </a>
        {homepage ? (
          <a
            href={homepage}
            target='_blank'
            className='bg-highlight rounded-md p-2 hover:opacity-90 hover:rounded-lg transition-all ease-in-out text-center'
          >
            View Website
          </a>
        ) : null}
      </div>
    </section>
  );
}
