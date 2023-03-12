import { Link } from "@remix-run/react";
import { useOptionalUser } from "~/utils";
import Layout from "../components/Layout";
import type { Note } from "~/models/note.server";
import { LoaderArgs } from "@remix-run/node";
import { getAllNoteListItems } from "~/models/note.server";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

type LoaderData = {
  noteListItems: Note[];
};

export async function loader({ request }: LoaderArgs) {
  const noteListItems = await getAllNoteListItems();
  return json({ noteListItems });
}

export default function Index() {
  const data = useLoaderData<typeof loader>() as LoaderData;

  const user = useOptionalUser();

  console.log(data);

  return (
    <Layout>
      <h2>Homepage</h2>
      {user ? (
        <Link
          to="/notes"
          className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-violet-700 shadow-sm hover:bg-violet-50 sm:px-8"
        >
          View Notes for {user.email}
        </Link>
      ) : (
        <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
          <Link
            to="/join"
            className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-violet-700 shadow-sm hover:bg-violet-50 sm:px-8"
          >
            Sign up
          </Link>
          <Link
            to="/login"
            className="flex items-center justify-center rounded-md bg-violet-500 px-4 py-3 font-medium text-white hover:bg-violet-600  "
          >
            Log In
          </Link>
        </div>
      )}
      <ul>
        {data.noteListItems.map((item) => {
          return <li key={item.id}>{item.title}</li>;
        })}
      </ul>
    </Layout>
  );
}
