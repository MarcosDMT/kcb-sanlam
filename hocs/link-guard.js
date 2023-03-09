import Link from "next/link";

 const LinkGuard = ({ href, children }) => {
    if (href === undefined) {
        return <> {children} </>
    }
    return (
        <Link href={href}>
            { children }
        </Link>
    )
}

export default LinkGuard;