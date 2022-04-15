type Poll = {
  choices?: string[];
  multiple?: boolean;
  expiresAt?: number;
  expiredAfter?: number;
};

enum Visibility {
  Home = "home",
  Public = "public",
  Followers = "followers",
  Specified = "specified",
  Private = "private",
}

export const connectMainJSON = JSON.stringify({
  type: "connect",
  body: {
    channel: "main",
    id: "main",
  },
});

export const connectGlobalTLJSON = JSON.stringify({
  type: "connect",
  body: {
    channel: "globalTimeline",
    id: "main",
  },
});

const fetchJson = async (
  url: string,
  json: string,
  credentials = "omit"
): Promise<Record<string, any>> => {
  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: credentials,
    body: json,
  } as RequestInit;

  const response = await fetch(url, init);
  if (response.ok) {
    console.log(`${response.status} OK`);
    return await response.json();
  } else {
    console.log(`${response.status} Error`);
    return await response.json();
  }
};

export const note = ({
  text,
  visibility,
  replyId = "",
  renoteId = "",
  cw,
  localOnly = false,
  poll = { multiple: false },
  visibleUserIds,
  token,
}: {
  text: string;
  visibility: Visibility;
  replyId?: string;
  renoteId?: string;
  cw?: string;
  localOnly?: boolean;
  poll?: Poll;
  visibleUserIds?: string[];
  token?: string;
}): Promise<Record<string, any>> => {
  const noteObj = {
    visibility: visibility,
    text: text,
    replyId: replyId,
    renoteId: renoteId,
    localOnly: localOnly,
    cw: cw,
    poll: poll,
    visibleUserIds: visibleUserIds,
    i: token,
  };

  const noteJson = JSON.stringify(noteObj);

  return fetchJson(
    "https://misskey.m544.net/api/notes/create",
    noteJson,
    "include"
  );
};

export const replyByHome = (text: string, replyId: string, token?: string) => {
  return note({
    text: text,
    visibility: Visibility.Home,
    replyId: replyId,
    token: token,
  });
};

export const replyBySpecified = (
  text: string,
  replyId: string,
  token?: string
) => {
  return note({
    text: text,
    visibility: Visibility.Specified,
    replyId: replyId,
    token: token,
  });
};
