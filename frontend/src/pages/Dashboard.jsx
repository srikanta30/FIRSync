import Header from "../components/Header";
import Card from "../components/Card";

export default function Dashboard() {
  return (
    <>
      <div className="min-h-full">
        <Header />
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <Card />
          </div>
        </main>
      </div>
    </>
  );
}
