import _ from "lodash";

const get =
  <T>(url: string, queryParams?: any) =>
  () => {
    queryParams = _.omitBy(queryParams, _.isUndefined);
    const token = localStorage.getItem("token");
    return fetch(buildURL(url, _.isEmpty(queryParams) ? "" : queryParams), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    }).then((res) => parseResponse<T>(res));
  };

const post =
  <X extends Record<string, any>, T>(url: string) =>
  (body: X) => {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => parseResponse<T>(res));
  };

export const buildURL = (url: string, queryParams: any) => {
  if (
    !queryParams ||
    queryParams.hasOwnProperty("pageParam") ||
    queryParams.hasOwnProperty("queryKey")
  ) {
    return url;
  }
  const esc = encodeURIComponent;
  const query = Object.keys(queryParams)
    .map((k) => esc(k) + "=" + esc(queryParams[k]))
    .join("&");

  return `${url}?${query}`;
};

const parseResponse = async <T>(res: Response) => {
  if (res.ok) {
    const jsonResponse: any = (await res.json()) as T;
    return jsonResponse;
  }
  if ((res.headers.get("Content-Type") || "").includes("application/json")) {
    return Promise.reject((await res.json()) as any);
  }
  return Promise.reject({ error: await res.text() });
};

export const clientAPIs = {
  getTwilioToken: () => get<{ twilioToken: string }>(`/api/twilio/token`)(),
  createConversation: ({ to, from }: any) =>
    post<any, any>(`/api/twilio/conversations/${to}`)({ from }),
};
