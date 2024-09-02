// src/components/Text-input.js

"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useState } from "react";
import { useData } from "../pages/Home/dataContext";

export default function PlaceholdersAndVanishInputDemo() {
  const { fetchData } = useData();
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const [data, setData] = useState("");

  const onSubmit = async () => {
    try {
      const url = data;
      const response = await fetch("http://localhost:8080/repos/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          UserId: localStorage.getItem("UserId"),
          repo_url: url,
        }),
      });

      if (response.ok) {
        console.log("Repository added successfully");
        setData(""); // Clear input after submission
        fetchData(); // Re-fetch data after successful submission
      } else {
        console.error("Failed to add repository");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleChange = (e) => {
    setData(e.target.value);
  };

  return (
    <div className="h-[10rem] w-full flex flex-col justify-center items-center px-4">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
        value={data}
      />
    </div>
  );
}
