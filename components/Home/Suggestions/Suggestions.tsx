import React, { useEffect, useState } from "react";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../../../firebase";
import { useAuth } from "../../../context/AuthContext";

interface ISuggestionsProps {}

export const Suggestions: React.FC<ISuggestionsProps> = ({}) => {
  const [suggestions, setSuggestions] = useState<any>([]);
  const { user } = useAuth();

  async function getUsers() {
    const doc = query(
      collection(db, "users"),
      where("uid", "!=", user.uid),
      limit(5)
    );

    getDocs(doc).then((querySnapshot) => {
      let values: any = [];
      querySnapshot.forEach((doc) => {
        let data = {
          ...doc.data(),
          id: doc.id,
        };
        values.push(data);
      });
      setSuggestions(values);
    });
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {suggestions.length > 0 ? (
        <div className="mt-5 ml-10 w-full">
          <div className="flex justify-between text-sm mb-5">
            <h3 className="text-sm font-medium text-gray-400">
              Suggestions for you
            </h3>
            <button className="text-gray-600 font-semibold text-xs">
              See All
            </button>
          </div>

          {suggestions.map((user: any) => (
            <div
              key={user.uid}
              className="flex items-center justify-between mt-3"
            >
              <img
                src={user.profilePicture}
                alt="Suggestions Profile Picture"
                className="rounded-full w-9 h-9"
              />
              <div className="flex-1 ml-4">
                <h2 className="font-semibold text-sm">{user.username}</h2>
                <h3 className="text-xs text-gray-400">
                  {user.fullName}
                </h3>
              </div>
              <button className="text-xs text-blue-400 font-medium">
                Follow
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};
