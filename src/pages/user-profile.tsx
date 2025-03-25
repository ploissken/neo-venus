import Image from "next/image";

export default function UserProfile() {
  return (
    <div>
      <main>
        <Image
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol>
          <li>user profile skeleton</li>
        </ol>
      </main>
    </div>
  );
}
