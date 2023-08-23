type ActivityCardProps = {
  content: string;
  links?: [string, string][]; // [name, link]
};

export default function ActivityCard({ content, links }: ActivityCardProps) {
  return (
    <div className='bg-highlight py-2 px-4 rounded-lg'>
      <p className='text-lg'>{content}</p>
      {links && (
        <div className='flex flex-col mt-2'>
          {links.map(([name, link]) => (
            <a
              key={name}
              href={link}
              target='_blank'
              rel='noopener noreferrer'
              className='px-2 py-1 rounded-md hover:bg-light active:tracking-wider transition-all ease-in-out w-fit'
            >
              {name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
