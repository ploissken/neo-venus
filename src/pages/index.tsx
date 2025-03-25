import Link from "next/link";
import Button from "@mui/material/Button";

export default function Index() {
  return (
    <>
      <div>Home</div>
      <Button variant="contained">Hello world</Button>
      <ul>
        <li>
          <Link href="/user-profile">User Profile</Link>
        </li>
        <li>
          <Link href="/about">About Us</Link>
        </li>
      </ul>
    </>
  );
}
