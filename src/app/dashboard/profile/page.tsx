'use client';

import { useSession } from "next-auth/react";
import { useEffect } from "react";


export default function ProfilePage() {
    const {data} = useSession();
    useEffect(() => {
        console.log(data)
    },[])
    return (
        <div>
            <h1>Perfil</h1>
            <hr />
            <div className="flex flex-col gap-5">
                <span>{data?.user?.name??'No hay nombre'}</span>
                <span>{data?.user?.email??'No hay email'}</span>
                <span>{(data?.user?.roles??['user']).join(',')??'No hay roles'}</span>
                <span>{data?.user?.id??'No hay id'}</span>
            </div>
        </div>
    );
}