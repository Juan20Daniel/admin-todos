import { WidgetItem } from "@/components";
import { auth } from '~/auth';
import { redirect } from "next/navigation";


export default async function DashboardPage() {
  const session = await auth();
  if(!session) {
    redirect('/api/auth/signin');
  }
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">   
      <WidgetItem title='Usuario connectado S-Side'>
        <div className="flex flex-col">
          
          <span>{session.user?.name}</span>
          <span>{session.user?.email}</span>
         
        </div>
      </WidgetItem>
    </div>  
  );
}