"""
A2UI Prompt Builder

Defines the A2UI component schema and UI examples for the restaurant finder agent.
This enables the LLM to generate rich UI widgets for displaying restaurant information.
"""

# The A2UI schema for validation
A2UI_SCHEMA = r"""
{
  "title": "A2UI Message Schema",
  "description": "Describes a JSON payload for an A2UI message. A message MUST contain exactly ONE of the action properties: 'beginRendering', 'surfaceUpdate', 'dataModelUpdate', or 'deleteSurface'.",
  "type": "object",
  "properties": {
    "beginRendering": {
      "type": "object",
      "description": "Signals the client to begin rendering a surface with a root component and specific styles.",
      "properties": {
        "surfaceId": {
          "type": "string",
          "description": "The unique identifier for the UI surface to be rendered."
        },
        "root": {
          "type": "string",
          "description": "The ID of the root component to render."
        },
        "styles": {
          "type": "object",
          "description": "Styling information for the UI.",
          "properties": {
            "font": { "type": "string" },
            "primaryColor": { "type": "string", "pattern": "^#[0-9a-fA-F]{6}$" }
          }
        }
      },
      "required": ["root", "surfaceId"]
    },
    "surfaceUpdate": {
      "type": "object",
      "description": "Updates a surface with a new set of components.",
      "properties": {
        "surfaceId": { "type": "string" },
        "components": {
          "type": "array",
          "minItems": 1,
          "items": {
            "type": "object",
            "properties": {
              "id": { "type": "string" },
              "weight": { "type": "number" },
              "component": { "type": "object" }
            },
            "required": ["id", "component"]
          }
        }
      },
      "required": ["surfaceId", "components"]
    },
    "dataModelUpdate": {
      "type": "object",
      "description": "Updates the data model for a surface.",
      "properties": {
        "surfaceId": { "type": "string" },
        "path": { "type": "string" },
        "contents": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "key": { "type": "string" },
              "valueString": { "type": "string" },
              "valueNumber": { "type": "number" },
              "valueBoolean": { "type": "boolean" },
              "valueMap": { "type": "array" }
            },
            "required": ["key"]
          }
        }
      },
      "required": ["contents", "surfaceId"]
    },
    "deleteSurface": {
      "type": "object",
      "properties": {
        "surfaceId": { "type": "string" }
      },
      "required": ["surfaceId"]
    }
  }
}
"""

# Restaurant UI Examples
RESTAURANT_UI_EXAMPLES = """
---BEGIN SINGLE_COLUMN_LIST_EXAMPLE---
[
  {{ "beginRendering": {{ "surfaceId": "default", "root": "root-column", "styles": {{ "primaryColor": "#3B82F6", "font": "Inter" }} }} }},
  {{ "surfaceUpdate": {{
    "surfaceId": "default",
    "components": [
      {{ "id": "root-column", "component": {{ "Column": {{ "children": {{ "explicitList": ["title-heading", "subtitle-text", "item-list"] }} }} }} }},
      {{ "id": "title-heading", "component": {{ "Text": {{ "usageHint": "h1", "text": {{ "path": "title" }} }} }} }},
      {{ "id": "subtitle-text", "component": {{ "Text": {{ "usageHint": "body", "text": {{ "path": "subtitle" }} }} }} }},
      {{ "id": "item-list", "component": {{ "List": {{ "direction": "vertical", "children": {{ "template": {{ "componentId": "item-card-template", "dataBinding": "/items" }} }} }} }} }},
      {{ "id": "item-card-template", "component": {{ "Card": {{ "child": "card-layout" }} }} }},
      {{ "id": "card-layout", "component": {{ "Row": {{ "children": {{ "explicitList": ["template-image", "card-details"] }} }} }} }},
      {{ "id": "template-image", "weight": 1, "component": {{ "Image": {{ "url": {{ "path": "image" }}, "fit": "cover", "usageHint": "mediumFeature" }} }} }},
      {{ "id": "card-details", "weight": 2, "component": {{ "Column": {{ "children": {{ "explicitList": ["template-name", "template-rating", "template-cuisine", "template-address", "template-book-button"] }} }} }} }},
      {{ "id": "template-name", "component": {{ "Text": {{ "usageHint": "h3", "text": {{ "path": "name" }} }} }} }},
      {{ "id": "template-rating", "component": {{ "Text": {{ "usageHint": "body", "text": {{ "path": "rating" }} }} }} }},
      {{ "id": "template-cuisine", "component": {{ "Text": {{ "usageHint": "caption", "text": {{ "path": "cuisine" }} }} }} }},
      {{ "id": "template-address", "component": {{ "Text": {{ "usageHint": "caption", "text": {{ "path": "address" }} }} }} }},
      {{ "id": "template-book-button", "component": {{ "Button": {{ "child": "book-now-text", "primary": true, "action": {{ "name": "book_restaurant", "context": [ {{ "key": "restaurantName", "value": {{ "path": "name" }} }}, {{ "key": "address", "value": {{ "path": "address" }} }}, {{ "key": "imageUrl", "value": {{ "path": "image" }} }} ] }} }} }} }},
      {{ "id": "book-now-text", "component": {{ "Text": {{ "text": {{ "literalString": "Book Now" }} }} }} }}
    ]
  }} }},
  {{ "dataModelUpdate": {{
    "surfaceId": "default",
    "path": "/",
    "contents": [
      {{ "key": "title", "valueString": "Restaurants in Ho Chi Minh City" }},
      {{ "key": "subtitle", "valueString": "Found N restaurants matching your search" }},
      {{ "key": "items", "valueMap": [
        {{ "key": "item1", "valueMap": [
          {{ "key": "name", "valueString": "Restaurant Name" }},
          {{ "key": "rating", "valueString": "⭐ 4.5 | $$ " }},
          {{ "key": "cuisine", "valueString": "Vietnamese" }},
          {{ "key": "address", "valueString": "123 Main St, District 1" }},
          {{ "key": "image", "valueString": "https://images.unsplash.com/photo-1503764654157-72d979d9af2f?w=400" }}
        ] }}
      ] }}
    ]
  }} }}
]
---END SINGLE_COLUMN_LIST_EXAMPLE---

---BEGIN BOOKING_FORM_EXAMPLE---
[
  {{ "beginRendering": {{ "surfaceId": "booking-form", "root": "booking-form-column", "styles": {{ "primaryColor": "#3B82F6", "font": "Inter" }} }} }},
  {{ "surfaceUpdate": {{
    "surfaceId": "booking-form",
    "components": [
      {{ "id": "booking-form-column", "component": {{ "Column": {{ "children": {{ "explicitList": ["booking-title", "restaurant-image", "restaurant-address", "party-size-field", "datetime-field", "dietary-field", "submit-button"] }} }} }} }},
      {{ "id": "booking-title", "component": {{ "Text": {{ "usageHint": "h2", "text": {{ "path": "title" }} }} }} }},
      {{ "id": "restaurant-image", "component": {{ "Image": {{ "url": {{ "path": "imageUrl" }}, "fit": "cover", "usageHint": "largeFeature" }} }} }},
      {{ "id": "restaurant-address", "component": {{ "Text": {{ "usageHint": "body", "text": {{ "path": "address" }} }} }} }},
      {{ "id": "party-size-field", "component": {{ "TextField": {{ "label": {{ "literalString": "Party Size" }}, "text": {{ "path": "partySize" }}, "textFieldType": "number" }} }} }},
      {{ "id": "datetime-field", "component": {{ "DateTimeInput": {{ "label": {{ "literalString": "Date & Time" }}, "value": {{ "path": "reservationTime" }}, "enableDate": true, "enableTime": true }} }} }},
      {{ "id": "dietary-field", "component": {{ "TextField": {{ "label": {{ "literalString": "Dietary Requirements" }}, "text": {{ "path": "dietary" }}, "textFieldType": "longText" }} }} }},
      {{ "id": "submit-button", "component": {{ "Button": {{ "child": "submit-reservation-text", "primary": true, "action": {{ "name": "submit_booking", "context": [ {{ "key": "restaurantName", "value": {{ "path": "restaurantName" }} }}, {{ "key": "partySize", "value": {{ "path": "partySize" }} }}, {{ "key": "reservationTime", "value": {{ "path": "reservationTime" }} }}, {{ "key": "dietary", "value": {{ "path": "dietary" }} }}, {{ "key": "imageUrl", "value": {{ "path": "imageUrl" }} }} ] }} }} }} }},
      {{ "id": "submit-reservation-text", "component": {{ "Text": {{ "text": {{ "literalString": "Submit Reservation" }} }} }} }}
    ]
  }} }},
  {{ "dataModelUpdate": {{
    "surfaceId": "booking-form",
    "path": "/",
    "contents": [
      {{ "key": "title", "valueString": "Book a Table at [RestaurantName]" }},
      {{ "key": "address", "valueString": "[Restaurant Address]" }},
      {{ "key": "restaurantName", "valueString": "[RestaurantName]" }},
      {{ "key": "partySize", "valueString": "2" }},
      {{ "key": "reservationTime", "valueString": "" }},
      {{ "key": "dietary", "valueString": "" }},
      {{ "key": "imageUrl", "valueString": "[ImageUrl]" }}
    ]
  }} }}
]
---END BOOKING_FORM_EXAMPLE---

---BEGIN CONFIRMATION_EXAMPLE---
[
  {{ "beginRendering": {{ "surfaceId": "confirmation", "root": "confirmation-card", "styles": {{ "primaryColor": "#22C55E", "font": "Inter" }} }} }},
  {{ "surfaceUpdate": {{
    "surfaceId": "confirmation",
    "components": [
      {{ "id": "confirmation-card", "component": {{ "Card": {{ "child": "confirmation-column" }} }} }},
      {{ "id": "confirmation-column", "component": {{ "Column": {{ "children": {{ "explicitList": ["confirm-title", "confirm-image", "divider1", "confirm-details", "divider2", "confirm-dietary", "divider3", "confirm-text"] }} }} }} }},
      {{ "id": "confirm-title", "component": {{ "Text": {{ "usageHint": "h2", "text": {{ "path": "title" }} }} }} }},
      {{ "id": "confirm-image", "component": {{ "Image": {{ "url": {{ "path": "imageUrl" }}, "fit": "cover", "usageHint": "mediumFeature" }} }} }},
      {{ "id": "confirm-details", "component": {{ "Text": {{ "usageHint": "body", "text": {{ "path": "bookingDetails" }} }} }} }},
      {{ "id": "confirm-dietary", "component": {{ "Text": {{ "usageHint": "caption", "text": {{ "path": "dietaryRequirements" }} }} }} }},
      {{ "id": "confirm-text", "component": {{ "Text": {{ "usageHint": "h5", "text": {{ "literalString": "We look forward to seeing you!" }} }} }} }},
      {{ "id": "divider1", "component": {{ "Divider": {{}} }} }},
      {{ "id": "divider2", "component": {{ "Divider": {{}} }} }},
      {{ "id": "divider3", "component": {{ "Divider": {{}} }} }}
    ]
  }} }},
  {{ "dataModelUpdate": {{
    "surfaceId": "confirmation",
    "path": "/",
    "contents": [
      {{ "key": "title", "valueString": "✅ Booking Confirmed at [RestaurantName]" }},
      {{ "key": "bookingDetails", "valueString": "📅 [Date] at [Time] | 👥 [PartySize] people" }},
      {{ "key": "dietaryRequirements", "valueString": "Dietary Requirements: [Requirements]" }},
      {{ "key": "imageUrl", "valueString": "[ImageUrl]" }}
    ]
  }} }}
]
---END CONFIRMATION_EXAMPLE---
"""


def get_ui_prompt(base_url: str, examples: str) -> str:
    """
    Constructs the full prompt with UI instructions, rules, examples, and schema.
    """
    formatted_examples = examples.format(base_url=base_url)

    return f"""
    You are a helpful restaurant finding assistant. Your final output MUST be a a2ui UI JSON response.

    To generate the response, you MUST follow these rules:
    1.  Your response MUST be in two parts, separated by the delimiter: `---a2ui_JSON---`.
    2.  The first part is your conversational text response (keep it brief).
    3.  The second part is a single, raw JSON array which is a list of A2UI messages.
    4.  The JSON part MUST validate against the A2UI JSON SCHEMA provided below.
    5.  DO NOT wrap the JSON in markdown code blocks.

    --- UI TEMPLATE RULES ---
    -   If the query is for a list of restaurants, use the restaurant data you have received from the `search_restaurants` tool to populate the `dataModelUpdate.contents` array.
    -   Use the `SINGLE_COLUMN_LIST_EXAMPLE` template for restaurant lists.
    -   If the query is to book a restaurant (e.g., "USER_WANTS_TO_BOOK..."), use the `BOOKING_FORM_EXAMPLE` template.
    -   If the query is a booking submission (e.g., "User submitted a booking..."), use the `CONFIRMATION_EXAMPLE` template.

    {formatted_examples}

    ---BEGIN A2UI JSON SCHEMA---
    {A2UI_SCHEMA}
    ---END A2UI JSON SCHEMA---
    """


def get_text_prompt() -> str:
    """
    Constructs the prompt for a text-only agent.
    """
    return """
    You are a helpful restaurant finding assistant. Your final output MUST be a text response.

    To generate the response, you MUST follow these rules:
    1.  **For finding restaurants:**
        a. You MUST call the `search_restaurants` tool. Extract the cuisine, location from the user's query.
        b. After receiving the data, format the restaurant list as a clear, human-readable text response.

    2.  **For booking a table (when you receive a query like 'USER_WANTS_TO_BOOK...'):**
        a. Respond by asking the user for the necessary details to make a booking (party size, date, time, dietary requirements).

    3.  **For confirming a booking (when you receive a query like 'User submitted a booking...'):**
        a. Call the `book_reservation` tool to make the reservation.
        b. Respond with a simple text confirmation of the booking details.
    """
