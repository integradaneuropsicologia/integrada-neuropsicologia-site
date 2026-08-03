type GoogleLocalizedText = {
  text?: string;
};

type GoogleReview = {
  name?: string;
  relativePublishTimeDescription?: string;
  text?: GoogleLocalizedText;
  rating?: number;
  authorAttribution?: {
    displayName?: string;
    uri?: string;
  };
  googleMapsUri?: string;
};

type GooglePlace = {
  displayName?: GoogleLocalizedText;
  rating?: number;
  userRatingCount?: number;
  googleMapsLinks?: {
    reviewsUri?: string;
  };
  reviews?: GoogleReview[];
};

const businessQuery =
  "Integrada Neuropsicologia, Rua Jacarezinho 1266, Mercês, Curitiba, Paraná, Brasil";

const responseHeaders = {
  "Cache-Control": "public, max-age=900, s-maxage=21600, stale-while-revalidate=86400",
  "Content-Type": "application/json; charset=utf-8",
};

async function fetchPlace(apiKey: string) {
  const placeId = process.env.GOOGLE_PLACE_ID?.trim();

  if (placeId) {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=pt-BR&regionCode=BR`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask":
            "displayName,rating,userRatingCount,googleMapsLinks,reviews",
        },
      },
    );

    if (!response.ok) throw new Error(`Google Places respondeu com ${response.status}`);
    return (await response.json()) as GooglePlace;
  }

  const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask":
        "places.displayName,places.rating,places.userRatingCount,places.googleMapsLinks,places.reviews",
    },
    body: JSON.stringify({
      textQuery: businessQuery,
      languageCode: "pt-BR",
      regionCode: "BR",
      pageSize: 1,
    }),
  });

  if (!response.ok) throw new Error(`Google Places respondeu com ${response.status}`);
  const payload = (await response.json()) as { places?: GooglePlace[] };
  return payload.places?.[0];
}

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();

  if (!apiKey) {
    return Response.json(
      { error: "google_places_not_configured" },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const place = await fetchPlace(apiKey);
    const reviews = (place?.reviews ?? [])
      .filter((review) => review.text?.text && review.authorAttribution?.displayName)
      .map((review, index) => ({
        id: review.name ?? `${review.authorAttribution?.displayName}-${index}`,
        author: review.authorAttribution?.displayName ?? "Cliente",
        authorUri: review.authorAttribution?.uri,
        rating: review.rating ?? 5,
        text: review.text?.text ?? "",
        published: review.relativePublishTimeDescription,
        googleMapsUri: review.googleMapsUri,
      }));

    if (!place || reviews.length === 0) {
      return Response.json(
        { error: "google_reviews_not_found" },
        { status: 404, headers: { "Cache-Control": "no-store" } },
      );
    }

    return Response.json(
      {
        placeName: place.displayName?.text ?? "Integrada Neuropsicologia",
        rating: place.rating,
        reviewCount: place.userRatingCount,
        reviewsUri: place.googleMapsLinks?.reviewsUri,
        reviews,
      },
      { headers: responseHeaders },
    );
  } catch (error) {
    console.error(
      "Não foi possível carregar as avaliações do Google:",
      error instanceof Error ? error.message : "erro desconhecido",
    );
    return Response.json(
      { error: "google_places_unavailable" },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }
}
