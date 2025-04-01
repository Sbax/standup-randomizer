"use client";
import { useEffect, useState } from "react";

import { addDaysToDate } from "@/addDaysToDate";
import { shuffleArray } from "@/shuffleArray";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const teamParam = searchParams.get("team");

  const [teamList, setTeamList] = useState<string[] | null>(null);
  const [shuffledTeamList, setShuffledTeamList] = useState<string[] | null>(
    null
  );

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    if (!teamList) {
      setTeamList(teamParam?.split("\n") ?? null);
    }
  }, [teamParam]);

  const getShuffleTeamList = () => {
    if (!teamList) {
      setShuffledTeamList(null);
      return;
    }

    setShuffledTeamList(shuffleArray(teamList));
  };

  useEffect(() => getShuffleTeamList(), [teamList]);

  useEffect(() => {
    if (!teamList) {
      router.replace(pathname);
      return;
    }

    router.replace(
      pathname + "?" + "team" + "=" + encodeURI(teamList.join("\n"))
    );
  }, [teamList]);

  return (
    <main className="flex space-x-5 p-4">
      <section className="space-y-2 w-1/5">
        <input
          type="date"
          className="input"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          min={new Date().toISOString().split("T")[0]}
        />

        <label className="block" htmlFor="team-list">
          <h2 className="text-xl">Team List</h2>
          <h3 className="text-xs">one per line</h3>
        </label>
        <textarea
          id="team-list"
          className="h-full textarea"
          placeholder="Team list"
          defaultValue={teamList?.join("\n")}
          onChange={(event) =>
            setTeamList(event.target.value.split("\n").filter(Boolean))
          }
        />
      </section>

      {shuffledTeamList && (
        <section>
          <section className="flex mb-4">
            <button className="btn btn-sm" onClick={getShuffleTeamList}>
              🎲
            </button>
            <h1 className="ml-2 text-xl">Shuffled list</h1>
          </section>

          <ol>
            {shuffledTeamList.map((name, index) => (
              <li key={[name, index].join("-")} className="text-lg">
                {name}{" "}
                <span className="text-gray-500 text-sm">
                  ({addDaysToDate(date, index + 1)})
                </span>
              </li>
            ))}
          </ol>
        </section>
      )}
    </main>
  );
}

export const dynamic = "force-dynamic";
