/**
 * Generated for orion-api
 * Do not edit manually.
 * Órion API
 * API para o Site do Ministério Órion
 */
import { customFetch } from "../../fetch";

// ---------------------------------------------------------------------------
// Shared error type
// ---------------------------------------------------------------------------

export type ErrorResponse = {
  error: string;
  code: string;
};

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------

export type Event = {
  id: string;
  name: string;
  date: string;
  location: string;
  grupoId: string | null;
};

export type CreateEventBody = {
  name: string;
  date: string;
  location: string;
  grupoId?: string;
};

// POST /create-event
export type createEventResponse201 = { data: Event; status: 201 };
export type createEventResponse400 = { data: ErrorResponse; status: 400 };
export type createEventResponse401 = { data: ErrorResponse; status: 401 };
export type createEventResponse404 = { data: ErrorResponse; status: 404 };
export type createEventResponse500 = { data: ErrorResponse; status: 500 };

export type createEventResponseSuccess = createEventResponse201 & {
  headers: Headers;
};
export type createEventResponseError = (
  | createEventResponse400
  | createEventResponse401
  | createEventResponse404
  | createEventResponse500
) & { headers: Headers };

export type createEventResponse =
  | createEventResponseSuccess
  | createEventResponseError;

export const getCreateEventUrl = () => `/create-event`;

export const createEvent = async (
  body: CreateEventBody,
  options?: RequestInit,
): Promise<createEventResponse> => {
  return customFetch<createEventResponse>(getCreateEventUrl(), {
    ...options,
    method: "POST",
    headers: { "Content-Type": "application/json", ...options?.headers },
    body: JSON.stringify(body),
  });
};

// GET /events/by-user-group
export type getEventsByUserGroupResponse200 = {
  data: Omit<Event, "grupoId">[];
  status: 200;
};
export type getEventsByUserGroupResponse400 = {
  data: ErrorResponse;
  status: 400;
};
export type getEventsByUserGroupResponse401 = {
  data: ErrorResponse;
  status: 401;
};
export type getEventsByUserGroupResponse404 = {
  data: ErrorResponse;
  status: 404;
};
export type getEventsByUserGroupResponse500 = {
  data: ErrorResponse;
  status: 500;
};

export type getEventsByUserGroupResponseSuccess =
  getEventsByUserGroupResponse200 & { headers: Headers };
export type getEventsByUserGroupResponseError = (
  | getEventsByUserGroupResponse400
  | getEventsByUserGroupResponse401
  | getEventsByUserGroupResponse404
  | getEventsByUserGroupResponse500
) & { headers: Headers };

export type getEventsByUserGroupResponse =
  | getEventsByUserGroupResponseSuccess
  | getEventsByUserGroupResponseError;

export const getGetEventsByUserGroupUrl = () => `/events/by-user-group`;

export const getEventsByUserGroup = async (
  options?: RequestInit,
): Promise<getEventsByUserGroupResponse> => {
  return customFetch<getEventsByUserGroupResponse>(
    getGetEventsByUserGroupUrl(),
    { ...options, method: "GET" },
  );
};

// GET /events
export type EventPublic = {
  id: string;
  name: string;
  date: string;
  location: string;
  grupoId: string | null;
  responsibleGroup: string | null;
  responsibleMembers: {
    name: string;
    image: string | null;
  }[];
};

export type getEventsResponse200 = { data: EventPublic[]; status: 200 };
export type getEventsResponse400 = { data: ErrorResponse; status: 400 };
export type getEventsResponse401 = { data: ErrorResponse; status: 401 };
export type getEventsResponse404 = { data: ErrorResponse; status: 404 };
export type getEventsResponse500 = { data: ErrorResponse; status: 500 };

export type getEventsResponseSuccess = getEventsResponse200 & {
  headers: Headers;
};
export type getEventsResponseError = (
  | getEventsResponse400
  | getEventsResponse401
  | getEventsResponse404
  | getEventsResponse500
) & { headers: Headers };

export type getEventsResponse =
  | getEventsResponseSuccess
  | getEventsResponseError;

export const getGetEventsUrl = () => `/events`;

export const getEvents = async (
  options?: RequestInit,
): Promise<getEventsResponse> => {
  return customFetch<getEventsResponse>(getGetEventsUrl(), {
    ...options,
    method: "GET",
  });
};

// ---------------------------------------------------------------------------
// Groups
// ---------------------------------------------------------------------------

export type Group = {
  id: string;
  name: string;
  users: { id: string; name: string; email: string }[];
  eventos: { id: string; name: string }[];
};

export type AvailableUser = {
  id: string;
  name: string;
  email: string;
  image: string | null;
};

export type GroupWithUsers = {
  id: string;
  name: string;
  users: { id: string; name: string; email: string }[];
};

export type CreateGroupBody = {
  name: string;
};

// POST /create-group
export type createGroupResponse201 = { data: Group; status: 201 };
export type createGroupResponse400 = { data: ErrorResponse; status: 400 };
export type createGroupResponse401 = { data: ErrorResponse; status: 401 };
export type createGroupResponse404 = { data: ErrorResponse; status: 404 };
export type createGroupResponse500 = { data: ErrorResponse; status: 500 };

export type createGroupResponseSuccess = createGroupResponse201 & {
  headers: Headers;
};
export type createGroupResponseError = (
  | createGroupResponse400
  | createGroupResponse401
  | createGroupResponse404
  | createGroupResponse500
) & { headers: Headers };

export type createGroupResponse =
  | createGroupResponseSuccess
  | createGroupResponseError;

export const getCreateGroupUrl = () => `/create-group`;

export const createGroup = async (
  body: CreateGroupBody,
  options?: RequestInit,
): Promise<createGroupResponse> => {
  return customFetch<createGroupResponse>(getCreateGroupUrl(), {
    ...options,
    method: "POST",
    headers: { "Content-Type": "application/json", ...options?.headers },
    body: JSON.stringify(body),
  });
};

// GET /groups
export type getGroupsResponse200 = { data: Group[]; status: 200 };
export type getGroupsResponse401 = { data: ErrorResponse; status: 401 };
export type getGroupsResponse403 = { data: ErrorResponse; status: 403 };
export type getGroupsResponse500 = { data: ErrorResponse; status: 500 };

export type getGroupsResponseSuccess = getGroupsResponse200 & {
  headers: Headers;
};
export type getGroupsResponseError = (
  | getGroupsResponse401
  | getGroupsResponse403
  | getGroupsResponse500
) & { headers: Headers };

export type getGroupsResponse =
  | getGroupsResponseSuccess
  | getGroupsResponseError;

export const getGetGroupsUrl = () => `/groups`;

export const getGroups = async (
  options?: RequestInit,
): Promise<getGroupsResponse> => {
  return customFetch<getGroupsResponse>(getGetGroupsUrl(), {
    ...options,
    method: "GET",
  });
};

// POST /groups/add-users-to-group
export type AddUsersToGroupBody = {
  groupId: string;
  userIds: string[];
};

export type addUsersToGroupResponse200 = { data: GroupWithUsers; status: 200 };
export type addUsersToGroupResponse400 = { data: ErrorResponse; status: 400 };
export type addUsersToGroupResponse401 = { data: ErrorResponse; status: 401 };
export type addUsersToGroupResponse404 = { data: ErrorResponse; status: 404 };
export type addUsersToGroupResponse500 = { data: ErrorResponse; status: 500 };

export type addUsersToGroupResponseSuccess = addUsersToGroupResponse200 & {
  headers: Headers;
};
export type addUsersToGroupResponseError = (
  | addUsersToGroupResponse400
  | addUsersToGroupResponse401
  | addUsersToGroupResponse404
  | addUsersToGroupResponse500
) & { headers: Headers };

export type addUsersToGroupResponse =
  | addUsersToGroupResponseSuccess
  | addUsersToGroupResponseError;

export const getAddUsersToGroupUrl = () => `/groups/add-users-to-group`;

export const addUsersToGroup = async (
  body: AddUsersToGroupBody,
  options?: RequestInit,
): Promise<addUsersToGroupResponse> => {
  return customFetch<addUsersToGroupResponse>(getAddUsersToGroupUrl(), {
    ...options,
    method: "POST",
    headers: { "Content-Type": "application/json", ...options?.headers },
    body: JSON.stringify(body),
  });
};

// ---------------------------------------------------------------------------
// Daily Check
// ---------------------------------------------------------------------------

export type DailyCheck = {
  id: string;
  userId: string;
  checkDate: string;
  read_bible: boolean;
  read_lesson: boolean;
};

export type UpdateDailyCheckBody = {
  read_bible?: boolean;
  read_lesson?: boolean;
};

// POST /daily-check
export type getOrCreateDailyCheckResponse200 = {
  data: DailyCheck;
  status: 200;
};
export type getOrCreateDailyCheckResponse400 = {
  data: ErrorResponse;
  status: 400;
};
export type getOrCreateDailyCheckResponse401 = {
  data: ErrorResponse;
  status: 401;
};
export type getOrCreateDailyCheckResponse404 = {
  data: ErrorResponse;
  status: 404;
};
export type getOrCreateDailyCheckResponse500 = {
  data: ErrorResponse;
  status: 500;
};

export type getOrCreateDailyCheckResponseSuccess =
  getOrCreateDailyCheckResponse200 & { headers: Headers };
export type getOrCreateDailyCheckResponseError = (
  | getOrCreateDailyCheckResponse400
  | getOrCreateDailyCheckResponse401
  | getOrCreateDailyCheckResponse404
  | getOrCreateDailyCheckResponse500
) & { headers: Headers };

export type getOrCreateDailyCheckResponse =
  | getOrCreateDailyCheckResponseSuccess
  | getOrCreateDailyCheckResponseError;

export const getGetOrCreateDailyCheckUrl = () => `/daily-check`;

export const getOrCreateDailyCheck = async (
  options?: RequestInit,
): Promise<getOrCreateDailyCheckResponse> => {
  return customFetch<getOrCreateDailyCheckResponse>(
    getGetOrCreateDailyCheckUrl(),
    { ...options, method: "POST" },
  );
};

// PATCH /daily-check
export type updateDailyCheckResponse200 = { data: DailyCheck; status: 200 };
export type updateDailyCheckResponse400 = { data: ErrorResponse; status: 400 };
export type updateDailyCheckResponse401 = { data: ErrorResponse; status: 401 };
export type updateDailyCheckResponse404 = { data: ErrorResponse; status: 404 };
export type updateDailyCheckResponse500 = { data: ErrorResponse; status: 500 };

export type updateDailyCheckResponseSuccess = updateDailyCheckResponse200 & {
  headers: Headers;
};
export type updateDailyCheckResponseError = (
  | updateDailyCheckResponse400
  | updateDailyCheckResponse401
  | updateDailyCheckResponse404
  | updateDailyCheckResponse500
) & { headers: Headers };

export type updateDailyCheckResponse =
  | updateDailyCheckResponseSuccess
  | updateDailyCheckResponseError;

export const getUpdateDailyCheckUrl = () => `/daily-check`;

export const updateDailyCheck = async (
  body: UpdateDailyCheckBody,
  options?: RequestInit,
): Promise<updateDailyCheckResponse> => {
  return customFetch<updateDailyCheckResponse>(getUpdateDailyCheckUrl(), {
    ...options,
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...options?.headers },
    body: JSON.stringify(body),
  });
};

// GET /daily-check/history
export type getDailyCheckHistoryResponse200 = {
  data: DailyCheck[];
  status: 200;
};
export type getDailyCheckHistoryResponse400 = {
  data: ErrorResponse;
  status: 400;
};
export type getDailyCheckHistoryResponse401 = {
  data: ErrorResponse;
  status: 401;
};
export type getDailyCheckHistoryResponse404 = {
  data: ErrorResponse;
  status: 404;
};
export type getDailyCheckHistoryResponse500 = {
  data: ErrorResponse;
  status: 500;
};

export type getDailyCheckHistoryResponseSuccess =
  getDailyCheckHistoryResponse200 & { headers: Headers };
export type getDailyCheckHistoryResponseError = (
  | getDailyCheckHistoryResponse400
  | getDailyCheckHistoryResponse401
  | getDailyCheckHistoryResponse404
  | getDailyCheckHistoryResponse500
) & { headers: Headers };

export type getDailyCheckHistoryResponse =
  | getDailyCheckHistoryResponseSuccess
  | getDailyCheckHistoryResponseError;

export const getGetDailyCheckHistoryUrl = () => `/daily-check/history`;

export const getDailyCheckHistory = async (
  options?: RequestInit,
): Promise<getDailyCheckHistoryResponse> => {
  return customFetch<getDailyCheckHistoryResponse>(
    getGetDailyCheckHistoryUrl(),
    { ...options, method: "GET" },
  );
};

// ---------------------------------------------------------------------------
// Ranking
// ---------------------------------------------------------------------------

export type RankingEntry = {
  id: string;
  name: string;
  image: string | null;
  bibleCount: number;
  lessonCount: number;
  score: number;
};

export type getRankingResponse200 = { data: RankingEntry[]; status: 200 };
export type getRankingResponse500 = { data: ErrorResponse; status: 500 };

export type getRankingResponseSuccess = getRankingResponse200 & {
  headers: Headers;
};
export type getRankingResponseError = getRankingResponse500 & {
  headers: Headers;
};

export type getRankingResponse =
  | getRankingResponseSuccess
  | getRankingResponseError;

export const getGetRankingUrl = () => `/ranking`;

export const getRanking = async (
  options?: RequestInit,
): Promise<getRankingResponse> => {
  return customFetch<getRankingResponse>(getGetRankingUrl(), {
    ...options,
    method: "GET",
  });
};

// ---------------------------------------------------------------------------
// User Profile
// ---------------------------------------------------------------------------

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  image: string | null;
  group: {
    id: string;
    name: string;
  } | null;
  currentStreak: number;
  bestStreak: number;
  groupEvents: {
    id: string;
    name: string;
    date: string;
    location: string;
    grupoId: string | null;
    responsibleMembers: {
      name: string;
      image: string | null;
    }[];
  }[];
};

export type getUserProfileResponse200 = { data: UserProfile; status: 200 };
export type getUserProfileResponse401 = { data: ErrorResponse; status: 401 };
export type getUserProfileResponse404 = { data: ErrorResponse; status: 404 };
export type getUserProfileResponse500 = { data: ErrorResponse; status: 500 };

export type getUserProfileResponseSuccess = getUserProfileResponse200 & {
  headers: Headers;
};
export type getUserProfileResponseError = (
  | getUserProfileResponse401
  | getUserProfileResponse404
  | getUserProfileResponse500
) & { headers: Headers };

export type getUserProfileResponse =
  | getUserProfileResponseSuccess
  | getUserProfileResponseError;

export const getGetUserProfileUrl = () => `/users/profile`;

export const getUserProfile = async (
  options?: RequestInit,
): Promise<getUserProfileResponse> => {
  return customFetch<getUserProfileResponse>(getGetUserProfileUrl(), {
    ...options,
    method: "GET",
  });
};

// GET /users/available
export type getAvailableUsersResponse200 = {
  data: AvailableUser[];
  status: 200;
};
export type getAvailableUsersResponse401 = { data: ErrorResponse; status: 401 };
export type getAvailableUsersResponse403 = { data: ErrorResponse; status: 403 };
export type getAvailableUsersResponse500 = { data: ErrorResponse; status: 500 };

export type getAvailableUsersResponseSuccess = getAvailableUsersResponse200 & {
  headers: Headers;
};
export type getAvailableUsersResponseError = (
  | getAvailableUsersResponse401
  | getAvailableUsersResponse403
  | getAvailableUsersResponse500
) & { headers: Headers };

export type getAvailableUsersResponse =
  | getAvailableUsersResponseSuccess
  | getAvailableUsersResponseError;

export const getGetAvailableUsersUrl = () => `/users/available`;

export const getAvailableUsers = async (
  options?: RequestInit,
): Promise<getAvailableUsersResponse> => {
  return customFetch<getAvailableUsersResponse>(getGetAvailableUsersUrl(), {
    ...options,
    method: "GET",
  });
};

// PATCH /events/:id
export type UpdateEventBody = {
  name?: string;
  date?: string;
  location?: string;
  grupoId?: string | null;
};

export type updateEventResponse200 = { data: Event; status: 200 };
export type updateEventResponse400 = { data: ErrorResponse; status: 400 };
export type updateEventResponse401 = { data: ErrorResponse; status: 401 };
export type updateEventResponse404 = { data: ErrorResponse; status: 404 };
export type updateEventResponse500 = { data: ErrorResponse; status: 500 };

export type updateEventResponseSuccess = updateEventResponse200 & {
  headers: Headers;
};
export type updateEventResponseError = (
  | updateEventResponse400
  | updateEventResponse401
  | updateEventResponse404
  | updateEventResponse500
) & { headers: Headers };

export type updateEventResponse =
  | updateEventResponseSuccess
  | updateEventResponseError;

export const getUpdateEventUrl = (id: string) => `/events/${id}`;

export const updateEvent = async (
  id: string,
  body: UpdateEventBody,
  options?: RequestInit,
): Promise<updateEventResponse> => {
  return customFetch<updateEventResponse>(getUpdateEventUrl(id), {
    ...options,
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...options?.headers },
    body: JSON.stringify(body),
  });
};
