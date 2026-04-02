import { Link } from '@inertiajs/react'
import React from 'react'

const links = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/work" },
  { name: "Contact", href: "/contact" },
]
function Nav() {
  return (
    <div>
      {links.map((link) => (
        <Link key={link.href} href={link.href}>
          {link.name}
        </Link>
      ))}
    </div>
  )
}

export default Nav