import Link from "next/link";

export default function About() {
  return (
    <ul>
      <h1>about</h1>
      <li>
        <Link href="/user-profile">User Profile</Link>
      </li>
      <li>
        <Link href="/about">About Us</Link>
      </li>
      <li>
        <Link href="/sign-in">Sign In</Link>
      </li>
    </ul>
  );
}
