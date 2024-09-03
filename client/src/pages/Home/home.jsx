import React, { useEffect } from "react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import PlaceholdersAndVanishInputDemo from "../../components/Text-input";
import { Button } from "@/components/ui/button";
import { useData } from "../Home/dataContext";
import { Popover } from "@/components/ui/popover";

export default function Home() {
  const { data, setData, fetchData } = useData();

  useEffect(() => {
    fetchData();
  }, []);

  const checkRepo = async () => {
    if (window.localStorage.getItem("token") == null) {
      return;
    }
    let dataUpdated = false;
    for (let i = 0; i < data.length; i++) {
      const currentRepo = data[i].repo_url;
      const repoDetails = currentRepo.split("/").slice(-2);
      const repo_name = repoDetails[1];
      const repo_user = repoDetails[0];

      const response = await fetch(
        `https://api.github.com/repos/${repo_user}/${repo_name}/issues`
      );

      const issues = await response.json();
      const latest_issue = issues[0]?.number;

      if (data[i].last_issue_id < latest_issue) {
        dataUpdated = true;

        await fetch("http://localhost:8080/sendmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            email: localStorage.getItem("loggedInEmail"),
          }),
        });

        const id = data[i]._id;

        await fetch("http://localhost:8080/repos/update", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            id,
            latest_issue_id: latest_issue,
          }),
        });
      }
    }
    if (dataUpdated) {
      fetchData();
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      checkRepo();
    }, 45000);

    return () => clearInterval(intervalId);
  }, [data]);

  const deleteRepo = async (repo_id) => {
    await fetch(`http://localhost:8080/repos/${repo_id}`, {
      method: "DELETE",
    });
    setData((prevData) => {
      return prevData.filter((item) => item._id !== repo_id);
    });
  };

  return (
    <div className="h-screen rounded-md bg-neutral-900 flex flex-col items-center justify-center relative w-full">
      <h2 className="relative z-10 text-3xl md:text-5xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8">
        <span>Github Issue-Tracker</span>
      </h2>
      <span className="text-sml tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8">
        By Mohd Shaheer & Anurag Negi
      </span>
      <PlaceholdersAndVanishInputDemo />
      <div className="flex flex-col gap-6">
        {Array.isArray(data) &&
          data.map((item, index) => (
            <div
              key={index}
              className="flex flex-row items-center ml-[6rem] justify-center gap-4 relative z-10"
            >
              <div className="flex items-center justify-center w-[40rem] h-20 border border-white rounded-md p-2">
                <h1 className="relative z-10 text-3xl md:text-xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8">
                  {item.repo_name}
                </h1>
                <Popover/>
              </div>
              <Button
                className="border border-white rounded-md p-2"
                onClick={() => deleteRepo(item._id)}
              >
                DELETE
              </Button>
            </div>
          ))}
      </div>
      <ShootingStars className="absolute inset-0" />
      <StarsBackground className="absolute inset-0" />
    </div>
  );
}
