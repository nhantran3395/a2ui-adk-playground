"""
Restaurant Finder Agent

A Google ADK agent that helps users discover restaurants and make reservations.
Includes A2UI widget generation capabilities for rich UI rendering.
"""

from google.adk.agents import Agent

from prompt_builder import SYSTEM_INSTRUCTION

# Mock restaurant database
RESTAURANTS = [
    {
        "id": "pho-24",
        "name": "Pho 24",
        "cuisine": "Vietnamese",
        "rating": 4.5,
        "price": "$$",
        "address": "123 Nguyen Hue, District 1, Ho Chi Minh City",
        "hours": "7:00 AM - 10:00 PM",
        "phone": "+84 28 1234 5678",
        "image": "https://images.unsplash.com/photo-1503764654157-72d979d9af2f?w=400",
        "description": "Authentic Vietnamese pho and noodle dishes in a modern setting.",
    },
    {
        "id": "pizza-4ps",
        "name": "Pizza 4P's",
        "cuisine": "Italian/Japanese Fusion",
        "rating": 4.7,
        "price": "$$$",
        "address": "8 Thu Khoa Huan, District 1, Ho Chi Minh City",
        "hours": "11:00 AM - 10:00 PM",
        "phone": "+84 28 2345 6789",
        "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
        "description": "Japanese-inspired pizza with fresh, house-made cheese.",
    },
    {
        "id": "quan-an-ngon",
        "name": "Quan An Ngon",
        "cuisine": "Vietnamese",
        "rating": 4.3,
        "price": "$$",
        "address": "138 Nam Ky Khoi Nghia, District 1, Ho Chi Minh City",
        "hours": "9:00 AM - 10:00 PM",
        "phone": "+84 28 3456 7890",
        "image": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=400",
        "description": "Traditional Vietnamese street food in an elegant courtyard.",
    },
    {
        "id": "noir-dining",
        "name": "Noir. Dining in the Dark",
        "cuisine": "International",
        "rating": 4.6,
        "price": "$$$$",
        "address": "178/180D Hai Ba Trung, District 1, Ho Chi Minh City",
        "hours": "6:00 PM - 11:00 PM",
        "phone": "+84 28 4567 8901",
        "image": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400",
        "description": "Unique dining experience in complete darkness, served by visually impaired staff.",
    },
    {
        "id": "the-deck",
        "name": "The Deck Saigon",
        "cuisine": "International/Fusion",
        "rating": 4.4,
        "price": "$$$",
        "address": "38 Nguyen U Di, Thao Dien, District 2, Ho Chi Minh City",
        "hours": "10:00 AM - 11:00 PM",
        "phone": "+84 28 5678 9012",
        "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
        "description": "Riverside dining with stunning views and international cuisine.",
    },
]

# Store for reservations
reservations: list[dict] = []


def search_restaurants(
    location: str, cuisine: str | None = None, price_range: str | None = None
) -> dict:
    """
    Search for restaurants in a location.

    Args:
        location: The city or area to search in (e.g., "Ho Chi Minh City")
        cuisine: Optional cuisine type filter (e.g., "Vietnamese", "Italian")
        price_range: Optional price range filter (e.g., "$$", "$$$")

    Returns:
        A dictionary with search results including restaurant details
    """
    results = RESTAURANTS.copy()

    # Filter by cuisine if specified
    if cuisine:
        cuisine_lower = cuisine.lower()
        results = [r for r in results if cuisine_lower in r["cuisine"].lower()]

    # Filter by price range if specified
    if price_range:
        results = [r for r in results if r["price"] == price_range]

    return {
        "status": "success",
        "location": location,
        "total_results": len(results),
        "restaurants": [
            {
                "id": r["id"],
                "name": r["name"],
                "cuisine": r["cuisine"],
                "rating": r["rating"],
                "price": r["price"],
                "address": r["address"],
                "image": r["image"],
                "description": r["description"],
            }
            for r in results
        ],
    }


def get_restaurant_details(restaurant_name: str) -> dict:
    """
    Get detailed information about a specific restaurant.

    Args:
        restaurant_name: The name of the restaurant to look up

    Returns:
        Detailed restaurant information including hours, phone, full address
    """
    name_lower = restaurant_name.lower()
    for r in RESTAURANTS:
        if name_lower in r["name"].lower():
            return {
                "status": "success",
                "restaurant": {
                    "id": r["id"],
                    "name": r["name"],
                    "cuisine": r["cuisine"],
                    "rating": r["rating"],
                    "price": r["price"],
                    "address": r["address"],
                    "hours": r["hours"],
                    "phone": r["phone"],
                    "image": r["image"],
                    "description": r["description"],
                },
            }

    return {
        "status": "error",
        "message": f"Restaurant '{restaurant_name}' not found",
    }


def book_reservation(
    restaurant_name: str,
    date: str,
    time: str,
    party_size: int,
    guest_name: str | None = None,
) -> dict:
    """
    Book a table at a restaurant.

    Args:
        restaurant_name: Name of the restaurant
        date: Reservation date (e.g., "2024-12-25" or "tomorrow")
        time: Reservation time (e.g., "7:00 PM")
        party_size: Number of guests
        guest_name: Optional name for the reservation

    Returns:
        Confirmation details for the reservation
    """
    # Find the restaurant
    restaurant = None
    name_lower = restaurant_name.lower()
    for r in RESTAURANTS:
        if name_lower in r["name"].lower():
            restaurant = r
            break

    if not restaurant:
        return {
            "status": "error",
            "message": f"Restaurant '{restaurant_name}' not found",
        }

    # Create reservation
    reservation_id = f"RES-{len(reservations) + 1001}"
    reservation = {
        "id": reservation_id,
        "restaurant_id": restaurant["id"],
        "restaurant_name": restaurant["name"],
        "date": date,
        "time": time,
        "party_size": party_size,
        "guest_name": guest_name or "Guest",
        "status": "confirmed",
    }
    reservations.append(reservation)

    return {
        "status": "success",
        "message": f"Reservation confirmed at {restaurant['name']}",
        "reservation": {
            "confirmation_number": reservation_id,
            "restaurant": restaurant["name"],
            "address": restaurant["address"],
            "date": date,
            "time": time,
            "party_size": party_size,
            "guest_name": reservation["guest_name"],
        },
    }


def cancel_reservation(confirmation_number: str) -> dict:
    """
    Cancel an existing reservation.

    Args:
        confirmation_number: The reservation confirmation number (e.g., "RES-1001")

    Returns:
        Cancellation confirmation
    """
    for i, res in enumerate(reservations):
        if res["id"] == confirmation_number:
            reservations[i]["status"] = "cancelled"
            return {
                "status": "success",
                "message": f"Reservation {confirmation_number} has been cancelled",
                "cancelled_reservation": {
                    "confirmation_number": confirmation_number,
                    "restaurant": res["restaurant_name"],
                    "date": res["date"],
                    "time": res["time"],
                },
            }

    return {
        "status": "error",
        "message": f"Reservation '{confirmation_number}' not found",
    }


# Define the root agent
root_agent = Agent(
    name="personal_assistant_agent",
    model="gemini-2.5-flash",
    instruction=SYSTEM_INSTRUCTION,
    description="A restaurant finder assistant that helps users discover restaurants and make reservations with rich A2UI widget rendering.",
    tools=[
        search_restaurants,
        get_restaurant_details,
        book_reservation,
        cancel_reservation,
    ],
)
