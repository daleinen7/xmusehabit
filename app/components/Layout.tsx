export default function Layout({ children }) {
  return (
    <>
      <header>Hi, this is a header</header>
      <main>{children}</main>
      <footer>Goodbye for now.</footer>
    </>
  );
}
