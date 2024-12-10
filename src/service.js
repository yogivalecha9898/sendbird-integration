export const issueSessionToken = async (
  userId,
  expiryDuration = 30 * 60 * 1000
) => {
  const appId = process.env.REACT_APP_APP_ID;
  const apiToken = process.env.REACT_APP_API_TOKEN;
  const url = `https://api-${appId}.sendbird.com/v3/users/${userId}/token`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf8",
      "Api-Token": apiToken,
    },
    body: JSON.stringify({ expires_at: Date.now() + expiryDuration }),
  });

  const data = await response.json();
  if (!data.token) throw new Error("Failed to issue session token");

  console.log("Session token issued:", data.token);
  return data.token;
};
