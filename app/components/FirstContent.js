export default function HomePage() {
  return (
    <>
      <div className="center-container">
        <h1 className="title">VIP Digital Hub</h1>
      </div>

      <style jsx>{`
        .center-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh; /* full viewport height */
          width: 100%;
          background-color: white;
        }

        .title {
          font-size: 4.5rem;
          font-weight: bold;
          color: #2563eb;
        }

        /* Make sure html and body take full height */
        :global(html, body) {
          height: 100%;
          margin: 0;
        }
      `}</style>
    </>
  );
}
