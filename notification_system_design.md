# Stage 1 – Priority Inbox Implementation

## Problem Statement

Users receive large volumes of notifications and miss important ones.
A priority inbox was implemented to highlight the most critical notifications first.

## Priority Strategy

Notifications are ranked using:

Placement > Result > Event

Within the same category, notifications are sorted by most recent timestamp.

Only the top 10 notifications are displayed.

## Algorithm Used

Steps:

1. Fetch notifications from API
2. Assign weight to notification types
3. Sort using priority weight
4. Sort by timestamp when weights match
5. Select top 10 notifications

Time complexity:

O(n log n)

## Efficient Future Optimization Strategy

To handle continuous incoming notifications efficiently:

Maintain a min-heap of size 10.

Process:

• Compare incoming notification priority  
• Insert if higher priority  
• Remove lowest priority element  

This ensures complexity:

O(n log k)

where k = 10

## Logging Strategy

Logging middleware captures:

• API request start  
• API success response  
• Sorting completion  
• Error scenarios  

This improves traceability and debugging reliability.