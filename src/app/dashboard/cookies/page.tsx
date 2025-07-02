import { cookies } from "next/headers";
import { TabBar } from "@/components";

export const metadata = {
 title: 'Cookies page',
 description: 'Menejo de cookies en next',
};

export default async function CookiesPage() {
    const cookieStore = await cookies();
    const cookieTap = cookieStore.get('selectedTap')?.value ?? '1';

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col">
                <span className="text-3xl">Taps</span>
                <TabBar 
                    defaultTapSelected={+cookieTap}
                />
            </div>
        </div>
    );
}