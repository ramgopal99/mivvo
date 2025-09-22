import { Exercise } from '../../../data/lessonsData';

export const exercise_4_8: Exercise = {
  id: 4.8,
  title: "EXERCISE",
  status: 'completed',
  type: 'code',
  codeQuestions: [
    {
      id: "ex1",
      question: "Create a program that:\n1. Creates tuples for RGB color values: red (255, 0, 0), green (0, 255, 0), blue (0, 0, 255)\n2. Uses a loop to print each color name and its RGB values\n3. Demonstrates tuple unpacking by assigning each RGB tuple to separate variables\n4. Shows that tuples are immutable by trying to modify a value (commented out)",
      solution: `# Create RGB color tuples
red = (255, 0, 0)
green = (0, 255, 0)
blue = (0, 0, 255)

# Create list of color names and tuples
colors = [("Red", red), ("Green", green), ("Blue", blue)]

# Print each color with its RGB values
for name, rgb in colors:
    r, g, b = rgb  # Tuple unpacking
    print(f"{name}: RGB({r}, {g}, {b})")

# Demonstrate tuple immutability (this would cause an error if uncommented)
# red[0] = 200  # TypeError: 'tuple' object does not support item assignment
print("Tuples are immutable - values cannot be changed after creation!")`
    },
    {
      id: "ex2",
      question: "Write a program that:\n1. Creates a tuple of coordinates for different cities\n2. Uses tuple operations to combine coordinates from two lists\n3. Demonstrates tuple slicing to get subsets of coordinates\n4. Uses tuple methods (count, index) to analyze the coordinate data\n5. Shows tuple concatenation and repetition",
      solution: `# Create city coordinates as tuples
cities = [
    ("New York", (40.7128, -74.0060)),
    ("London", (51.5074, -0.1278)),
    ("Tokyo", (35.6762, 139.6503))
]

# Print city coordinates
for city_name, coords in cities:
    lat, lon = coords
    print(f"{city_name}: {lat}°N, {lon}°E")

# Extract all latitudes and longitudes
latitudes = tuple(coord[0] for _, coord in cities)
longitudes = tuple(coord[1] for _, coord in cities)

print(f"All latitudes: {latitudes}")
print(f"All longitudes: {longitudes}")

# Demonstrate slicing
print(f"First two latitudes: {latitudes[:2]}")
print(f"Last longitude: {longitudes[-1]}")

# Use tuple methods
print(f"Number of northern cities: {sum(1 for lat in latitudes if lat > 0)}")
print(f"Tokyo longitude index: {longitudes.index(139.6503)}")

# Tuple concatenation and repetition
all_coords = latitudes + longitudes
print(f"All coordinates combined: {all_coords}")
repeated_coords = latitudes * 2
print(f"Latitudes repeated: {repeated_coords}")`
    },
    {
      id: "ex3",
      question: "Create a student grading system using tuples:\n1. Store student records as tuples: (name, age, grade)\n2. Create a list of these student tuples\n3. Use tuple unpacking in loops to access individual fields\n4. Calculate statistics using tuple operations\n5. Demonstrate tuple as dictionary keys",
      solution: `# Create student records as tuples
students = [
    ("Alice", 20, 95),
    ("Bob", 19, 87),
    ("Charlie", 21, 92),
    ("Diana", 20, 88),
    ("Eve", 19, 96)
]

# Print all students using tuple unpacking
print("Student Records:")
for name, age, grade in students:
    print(f"{name}: Age {age}, Grade {grade}")

# Calculate statistics
grades = tuple(student[2] for student in students)
print(f"\nGrade Statistics:")
print(f"Average grade: {sum(grades)/len(grades):.1f}")
print(f"Highest grade: {max(grades)}")
print(f"Lowest grade: {min(grades)}")

# Count grades by range
excellent = sum(1 for grade in grades if grade >= 90)
good = sum(1 for grade in grades if 80 <= grade < 90)
fair = sum(1 for grade in grades if grade < 80)

print(f"Excellent (90+): {excellent}")
print(f"Good (80-89): {good}")
print(f"Needs improvement (<80): {fair}")

# Use tuples as dictionary keys (student lookup by name and age)
student_lookup = {student[:2]: student[2] for student in students}
print(f"\nAlice's grade: {student_lookup[('Alice', 20)]}")
print(f"Bob's grade: {student_lookup[('Bob', 19)]}")`
    },
    {
      id: "ex4",
      question: "Write a program that simulates a simple game leaderboard:\n1. Store player scores as tuples: (player_name, score, level)\n2. Use tuple operations to find top players\n3. Demonstrate tuple sorting by creating sorted versions\n4. Use tuple unpacking for displaying results\n5. Show tuple comparison operations",
      solution: `# Create player scores as tuples
leaderboard = [
    ("Alice", 1500, 5),
    ("Bob", 1200, 4),
    ("Charlie", 1800, 6),
    ("Diana", 1350, 5),
    ("Eve", 1650, 5)
]

# Display current leaderboard
print("Current Leaderboard:")
for i, (name, score, level) in enumerate(leaderboard, 1):
    print(f"{i}. {name}: {score} points (Level {level})")

# Find top player
top_player = max(leaderboard, key=lambda x: x[1])
print(f"\nTop Player: {top_player[0]} with {top_player[1]} points")

# Sort by score (highest first) - creates new sorted tuple
sorted_by_score = tuple(sorted(leaderboard, key=lambda x: x[1], reverse=True))
print("\nSorted by Score:")
for i, (name, score, level) in enumerate(sorted_by_score, 1):
    print(f"{i}. {name}: {score}")

# Sort by level (highest first)
sorted_by_level = tuple(sorted(leaderboard, key=lambda x: x[2], reverse=True))
print("\nSorted by Level:")
for i, (name, score, level) in enumerate(sorted_by_level, 1):
    print(f"{i}. {name}: Level {level} ({score} points)")

# Compare tuples
player1 = ("Alice", 1500, 5)
player2 = ("Bob", 1200, 4)
print(f"\nComparing players:")
print(f"Alice > Bob (by score): {player1[1] > player2[1]}")
print(f"Alice tuple > Bob tuple: {player1 > player2}")

# Find players above certain score
high_scores = tuple(player for player in leaderboard if player[1] >= 1500)
print(f"\nPlayers with 1500+ points: {len(high_scores)}")
for name, score, level in high_scores:
    print(f"- {name}: {score} points")`
    },
    {
      id: "ex5",
      question: "Create a coordinate geometry calculator:\n1. Store points as tuples: (x, y)\n2. Calculate distance between points using tuple unpacking\n3. Demonstrate tuple operations for coordinate transformations\n4. Use tuple methods to analyze point patterns\n5. Show practical uses of tuple immutability",
      solution: `# Import math for distance calculation
import math

# Create coordinate points as tuples
points = [
    (0, 0),      # Origin
    (3, 4),      # Point A
    (6, 8),      # Point B
    (-2, 5),     # Point C
    (3, 0)       # Point D
]

# Function to calculate distance (returns tuple)
def calculate_distance(point1, point2):
    x1, y1 = point1
    x2, y2 = point2
    distance = math.sqrt((x2 - x1)**2 + (y2 - y1)**2)
    return (point1, point2, round(distance, 2))

# Calculate distances from origin
print("Distances from origin (0, 0):")
for point in points[1:]:  # Skip origin
    _, _, distance = calculate_distance((0, 0), point)
    print(f"Point {point}: {distance} units")

# Find closest and farthest points from origin
distances = [calculate_distance((0, 0), point)[2] for point in points[1:]]
min_dist = min(distances)
max_dist = max(distances)

print(f"\nClosest distance: {min_dist}")
print(f"Farthest distance: {max_dist}")

# Coordinate transformations using tuple operations
print("\nCoordinate Transformations:")

# Scale all points by factor of 2
scaled_points = tuple((x * 2, y * 2) for x, y in points)
print(f"Original points: {points}")
print(f"Scaled by 2: {scaled_points}")

# Translate all points (add 10 to x, 5 to y)
translated_points = tuple((x + 10, y + 5) for x, y in points)
print(f"Translated (+10, +5): {translated_points}")

# Demonstrate tuple immutability - create new tuples instead of modifying
print("\nTuple Immutability Demo:")
original_point = (3, 4)
print(f"Original point: {original_point}")

# Can't modify: original_point[0] = 5  # Would cause error
# Instead, create new tuple
modified_point = (5, original_point[1])
print(f"Modified point: {modified_point}")
print(f"Original unchanged: {original_point}")

# Use tuples as dictionary keys (regions)
regions = {
    (0, 0): "Origin",
    (3, 4): "First Quadrant",
    (-2, 5): "Second Quadrant",
    (3, 0): "X-axis",
    (6, 8): "First Quadrant"
}

print(f"\nPoint regions:")
for point in points:
    region = regions.get(point, "Unknown region")
    print(f"Point {point}: {region}")`
    }
  ]
};
