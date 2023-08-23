import Image from "next/image";

type MemberCardProps = {
  name: string;
  icon: string;
  github: string;
};

export default function MemberCard({ name, icon, github }: MemberCardProps) {
  return (
    <div className='bg-dark p-4 flex flex-col gap-2 rounded-lg items-center'>
      <Image
        className='bg-highlight rounded-full'
        src={icon}
        width={96}
        height={96}
        alt={`${name}'s pfp`}
      />
      <a
        href={github}
        target='_blank'
        className='text-center p-1 rounded-sm hover:bg-highlight hover:rounded-md transition-all ease-in-out'
      >
        {name}
      </a>
    </div>
  );
}
