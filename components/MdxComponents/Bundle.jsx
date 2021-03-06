import Image from "next/image"
import Link from "next/link"

const Bundle = () => {
  return (
    <Link href="/bundle" passHref>
      <a target="_blank" rel="noopener noreferrer" className="img-fluid rounded overflow-hidden d-block lh-0 my-4">
        <Image src="/blog/bundle.png" alt="Hugo Mega Bundle" height="900" width="1200" />
      </a>
    </Link>
  )
}

export default Bundle
