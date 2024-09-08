import React, { useEffect } from "react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import PlaceholdersAndVanishInputDemo from "../../components/Text-input";
import { Button } from "@/components/ui/button";
import { useData } from "../Home/dataContext";
import { PopoverDemo } from "@/components/Popover";
// import { Popover } from "@/components/ui/popover";

export default function Home() {
  const { data, setData, fetchData } = useData();

  useEffect(() => {
    fetchData();
  }, []);

  const checkRepo = async () => {
    console.log(data);
    if (window.localStorage.getItem("token") == null) {
      return;
    }
    let dataUpdated = false;
    for (let i = 0; i < data.length; i++) {
      const currentRepo = data[i].repo_url;
      const repoDetails = currentRepo.split("/").slice(-2);
      const repo_name = repoDetails[1];
      const repo_user = repoDetails[0];
      console.log(currentRepo);
      const response = await fetch(
        `https://api.github.com/repos/${repo_user}/${repo_name}/issues`
      );

      const issues = await response.json();
      const latest_issue = issues[0]?.number;
      console.log(latest_issue);
      if (data[i].last_issue_id < latest_issue) { 
        const copyData = data;
        copyData[i].last_issue_id = latest_issue;
        const latest_issue_link = issues[0].html_url;
        copyData[i].last_issue_link = latest_issue_link;
        setData(copyData);
        dataUpdated = true;
        
        console.log(latest_issue_link);
        if((data[i].particular_user != null || data[i].particular_user !=undefined) && data[i].particular_user!=""){
          if(issues[0].user.login==data[i].particular_user){
            await fetch(`http://localhost:8080/sendmail`, { 
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                'Authorization': window.localStorage.getItem("token"),
              },
              body: JSON.stringify({                          
                repo_name: data[i].repo_name,
                issue_url: latest_issue_link,
                email: localStorage.getItem("loggedInEmail"),
              }),
            });
          }
        }else{
          await fetch("http://localhost:8080/sendmail", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Authorization': window.localStorage.getItem("token"),
            },
            body: JSON.stringify({
              repo_name: data[i].repo_name,
              issue_url: latest_issue_link,
              email: localStorage.getItem("loggedInEmail"),
            }),
          }); 
        }

        const id = data[i]._id;

        await fetch("http://localhost:8080/repos/update", { 
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            'Authorization': window.localStorage.getItem("token"),
          },
          body: JSON.stringify({
            id,
            latest_issue_id: latest_issue,
            latest_issue_link: latest_issue_link
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
      headers: {
        'Authorization': window.localStorage.getItem("token"),
      },
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
                <PopoverDemo default_value = {item.particular_user} idx = {index} repo_id = {item._id}/>
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
