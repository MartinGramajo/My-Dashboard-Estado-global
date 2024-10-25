

// prc snippets

import WidgetsGrid from "@/app/components/simplewidget/WidgetsGrid";


export const metadata = {
 title: 'Main Page',
 description: 'Main Page',
};

export default function MainPage() {
  return (
    <div className="text-black p-2">
      <h1 className="mt-2 text-3xl">Dashboard</h1>
      <span className="text-xl"> Información general </span>

        <WidgetsGrid />
      
    </div>
  );
}