"use client";

import { useState } from "react";

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "--";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

type Props = {
  name: string;
  image: string | null;
};

export function RankAvatar({ name, image }: Props) {
  const [imgError, setImgError] = useState(false);

  const showInitials = !image || imgError;

  return (
    <div className="shrink-0">
      {showInitials ? (
        <div className="size-10 flex items-center justify-center rounded-full bg-linear-to-br from-blue-400 to-indigo-500 text-xs font-bold text-white ring-2 ring-blue-200">
          {getInitials(name)}
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image!}
          alt={name}
          className="size-10 rounded-full object-cover ring-2 ring-blue-200"
          onError={() => setImgError(true)}
        />
      )}
    </div>
  );
}
