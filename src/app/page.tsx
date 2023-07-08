import UserCard from "@/components/UserCard";

export async function getData () {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return data;
}

export default async function Home() {

  const users = await getData();

  return (
    <div className="mx-auto max-w-lg">
      <h1>Home Page</h1>

      <div className='space-y-3'>
        {users.map((user: any) => (
          <UserCard user={user} key={user.id} />
        ))}
      </div>
    </div>
  )
}
