'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
    icon: React.ReactNode;
    path: string;
    label: string;
}

export const SidebarItem = ({icon, path, label='label'}:Props) => {
    const pathName = usePathname();
    return (
        <>
            {/* Active className: text-white bg-gradient-to-r from-sky-600 to-cyan-400 */}
            {/* <li>
                <Link href="/dashboard" className="relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400">
                    <CiBookmarkCheck size={30} />
                    <span className="-mr-1 font-medium">Dashboard</span>
                </Link>
            </li> */}
            <li>
                <Link 
                    href={path} 
                    className={`
                        px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 border-1 border-white hover:border-1 hover:border-gray-200
                        ${pathName === path && 'text-white bg-gradient-to-r from-sky-600 to-cyan-400'}`
                    }
                >
                    {icon}
                    <span className="group-hover:text-gray-700">{label}</span>
                </Link>
            </li>
        </>
    )
}
