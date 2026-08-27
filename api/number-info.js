export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed"
    });
  }

  const number = String(req.query.number || "").trim();

  if (!number) {
    return res.status(400).json({
      success: false,
      message: "Phone number is required"
    });
  }

  // Your API key
  const apiKey =
    "hexa_777c1fb76d403387db74d75f15422d76_1_15";

  try {
    const url = new URL(
      "https://hexaapi.com/api/v1/proxy/number-info"
    );

    url.searchParams.set("api_key", apiKey);
    url.searchParams.set("number", number);

    const response = await fetch(url.toString());
    const text = await response.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      return res.status(502).json({
        success: false,
        message: "Invalid response from API"
      });
    }

    return res.status(response.status).json(data);

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "API connection failed"
    });
  }
}
