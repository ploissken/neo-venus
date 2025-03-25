import Link from "next/link";

export default function About() {
  return (
    <>
      <div>About</div>
      <Link href="/about">About Us</Link>
      <Link href="/user-profile">User Profile</Link>
    </>
  );
}
