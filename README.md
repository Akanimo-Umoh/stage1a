# Todo Card — Stage 1a

## What changed from Stage 0

### New features added

**Edit mode**

- Clicking the Edit button opens a modal form pre-populated with the card's current values
- Save updates the card in place without a page reload
- Cancel closes the modal and restores the previous values
- Focus returns to the Edit button after the modal closes
- Tab key is trapped inside the modal while it is open
- Pressing Enter inside any input field triggers the save action

**Status control**

- Replaced the static status display with a live `<select>` dropdown
- Allowed statuses: Pending, In Progress, Done
- Status stays in sync with the checkbox at all times — checking the box sets status to Done, unchecking reverts to Pending, and manually selecting Done checks the box

**Priority indicator**

- Added a visual indicator beside the priority label
- Indicator changes color based on priority: red for High, green for Medium, blue for Low
- Updating priority via the edit form updates the indicator immediately

**Expand / collapse**

- Descriptions longer than 40 characters are collapsed by default to 2 lines
- A Show more / Show less toggle button reveals or hides the full description
- Toggle uses `aria-expanded` and `aria-controls` for accessibility

**Overdue indicator**

- Tasks past their due date show a red dot badge and red time text
- Time remaining updates every 30 seconds automatically
- Completed tasks stop updating and display "Completed" instead

**Done state**

- Cards marked as Done receive a muted appearance with reduced opacity
- The title gets a strikethrough style
- Time remaining freezes and shows "Completed"

---

## Design decisions

- The edit form is a global modal rather than an inline form per card, keeping the DOM lighter with many cards on the page
- `article.dataset.dueDate` is used to track each card's due date independently so the `setInterval` does not rely on array indices, which would break after deletions
- Status values are stored in lowercase with hyphens (`pending`, `in-progress`, `done`) internally and formatted for display using a `formatStatus()` helper
- The `toMidnight` helper sets the due time to `23:59:59` so a task is only considered overdue after the full due date has passed, not from midnight of that day

---

## Known limitations

- The overdue badge and red styling are applied at render time only. If a task becomes overdue while the page is open, the badge will not appear until the page is refreshed (the time text updates correctly via `setInterval` but the badge element is not injected dynamically)
- Deleting a card currently shows a browser `alert()` and does not remove the card from the DOM
- Tag editing is not supported in the edit form
- Status editing is not available inside the edit form — only via the inline dropdown on the card

---

## Accessibility notes

- All edit form fields have `<label for>` associations
- The status dropdown has an `aria-label` describing which task it controls
- The expand toggle uses `aria-expanded` and `aria-controls` pointing to the collapsible section's `id`
- Time remaining uses `aria-live="polite"` so screen readers are notified of updates
- Focus is managed on modal open (moves to first input) and close (returns to the Edit button that opened it)
