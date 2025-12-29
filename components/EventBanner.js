// components/EventBanner.js
export default function EventBanner({ event }) {
  if (!event) return null;
  return (
    <div className="bg-primary-dark/20 border-b border-primary/30 text-primary-light p-2 text-center text-sm font-medium">
       ✨ {event.title}: {event.content}
    </div>
  );
}